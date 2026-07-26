#!/usr/bin/env node
/**
 * seedBlogPosts.js — publish queued blog posts to the backend, on a drip.
 *
 *   node scripts/seedBlogPosts.js                    # show the queue (safe)
 *   node scripts/seedBlogPosts.js --publish          # dry run: what WOULD go out
 *   node scripts/seedBlogPosts.js --publish --confirm  # actually publish
 *   node scripts/seedBlogPosts.js --publish --confirm --all  # ignore the drip gap
 *
 * NOTHING PUBLISHES WITHOUT --confirm. This site is recovering from a
 * scaled-content demotion; a cron that publishes unreviewed posts is how that
 * happens again. The gate is deliberate, not an oversight.
 *
 * QUALITY GATE (a post that fails is skipped, never published in a weaker form)
 *   • 1,200+ words of body content
 *   • 3+ key takeaways, 3+ FAQs
 *   • a clean lowercase-hyphen slug
 *   • a category and a service to cluster to
 *   • a CTA
 *
 * DRIP
 *   One post per run, and only if DRIP_DAYS have passed since the last
 *   published post (default 3). So a daily cron produces roughly two posts a
 *   week rather than dumping the queue at once.
 *
 * ENV
 *   BACKEND_URL           defaults to https://avani-enterprises.onrender.com
 *   DRIP_DAYS             optional, default 3
 *
 *   Authentication — one of:
 *   AVANI_ADMIN_EMAIL     \ preferred for the cron: the script logs in and gets
 *   AVANI_ADMIN_PASSWORD  / a fresh token on every run
 *   AVANI_ADMIN_TOKEN       a pasted JWT, for one-off manual runs
 *
 *   WHY LOGIN AND NOT A PASTED TOKEN
 *   Backend JWTs expire after 1 day (index.js: expiresIn "1d"). A scheduled job
 *   holding a hardcoded token therefore publishes for at most 24 hours and then
 *   fails with 401 on every subsequent run — silently, because nobody watches
 *   cron logs. Logging in per run is the only version of this that keeps working.
 *
 * Posts live in scripts/blogSeedData.js. See scripts/BLOG-SEEDING.md.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BACKEND_URL = process.env.BACKEND_URL || 'https://avani-enterprises.onrender.com';
const ADMIN_TOKEN = process.env.AVANI_ADMIN_TOKEN || '';
const ADMIN_EMAIL = process.env.AVANI_ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.AVANI_ADMIN_PASSWORD || '';
const DRIP_DAYS = Number(process.env.DRIP_DAYS || 3);

const MIN_WORDS = 1200;
const MIN_TAKEAWAYS = 3;
const MIN_FAQS = 3;

const args = process.argv.slice(2);
const doPublish = args.includes('--publish');
const confirmed = args.includes('--confirm');
const ignoreDrip = args.includes('--all');

// ── Load the posts ───────────────────────────────────────────────────────────
const SEED_PATH = path.join(__dirname, 'blogSeedData.js');
if (!fs.existsSync(SEED_PATH)) {
  console.error(`❌ ${SEED_PATH} not found. See scripts/BLOG-SEEDING.md.`);
  process.exit(1);
}
const POSTS = (await import(pathToFileURL(SEED_PATH).href)).default;

// ── Helpers ──────────────────────────────────────────────────────────────────
function wordCount(post) {
  return [
    post.body || '',
    (post.keyTakeaways || []).join(' '),
    (post.faqs || []).map((f) => `${f.q} ${f.a}`).join(' '),
  ].join(' ').replace(/[#>*`_|-]/g, ' ').split(/\s+/).filter(Boolean).length;
}

function readTime(post) {
  return Math.max(1, Math.round(wordCount(post) / 200));
}

/** Returns [] when publishable. */
function qualityIssues(post, allSlugs) {
  const issues = [];
  const w = wordCount(post);
  if (w < MIN_WORDS) issues.push(`only ${w} words (minimum ${MIN_WORDS})`);
  if ((post.keyTakeaways || []).length < MIN_TAKEAWAYS) issues.push(`needs ${MIN_TAKEAWAYS}+ key takeaways`);
  if ((post.faqs || []).length < MIN_FAQS) issues.push(`needs ${MIN_FAQS}+ FAQs`);
  if (!/^[a-z0-9-]+$/.test(post.slug || '')) issues.push('slug must be lowercase and hyphenated');
  if (!post.category) issues.push('no category (needed by the blog filter)');
  if (!post.serviceCluster) issues.push('no serviceCluster to link up to');
  if (!post.excerpt || post.excerpt.length < 60) issues.push('excerpt should be 60+ characters');
  if (!post.cta || !post.cta.heading) issues.push('no CTA');
  if (allSlugs.filter((s) => s === post.slug).length > 1) issues.push('duplicate slug in the queue');
  return issues;
}

/**
 * Assemble the stored body. Markdown is kept as-is — src/data/blogFormat.js
 * converts markdown, HTML and plain text alike at render time, so the seed
 * script does not need to duplicate that logic.
 */
function buildBody(post) {
  const out = [];

  if ((post.keyTakeaways || []).length) {
    out.push('## Key takeaways', '');
    post.keyTakeaways.forEach((t) => out.push(`- ${t}`));
    out.push('');
  }

  out.push(post.body.trim(), '');

  if ((post.faqs || []).length) {
    out.push('## Frequently asked questions', '');
    post.faqs.forEach((f) => { out.push(`### ${f.q}`, '', f.a, ''); });
  }

  out.push(`## ${post.cta.heading}`, '', post.cta.sub, '');
  out.push(`[${post.serviceLabel || 'Talk to us'}](/${post.serviceCluster}) · [Book a free call](/contact)`, '');

  if ((post.related || []).length) {
    out.push('## Related reading', '');
    post.related.forEach((r) => out.push(`- [${r.replace(/-/g, ' ')}](/blog/${r})`));
  }

  return out.join('\n');
}

/**
 * Get a usable admin JWT.
 *
 * Prefers a pasted AVANI_ADMIN_TOKEN so a manual one-off run still works, but
 * falls back to logging in — which is what the scheduled job should use, since
 * tokens live for a day and the job runs indefinitely.
 */
async function getToken() {
  if (ADMIN_TOKEN) return { token: ADMIN_TOKEN, how: 'AVANI_ADMIN_TOKEN' };

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('\n❌ No credentials. Set either:');
    console.error('   AVANI_ADMIN_EMAIL + AVANI_ADMIN_PASSWORD  (use this for the cron)');
    console.error('   AVANI_ADMIN_TOKEN                         (a pasted JWT, expires in 24h)');
    return null;
  }

  let res;
  try {
    res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });
  } catch (err) {
    console.error(`\n❌ Could not reach ${BACKEND_URL}: ${err.message}`);
    return null;
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.token) {
    console.error(`\n❌ Login failed (HTTP ${res.status}): ${json.message || 'no token returned'}`);
    return null;
  }
  return { token: json.token, how: `login as ${ADMIN_EMAIL}` };
}

async function alreadyPublished() {
  try {
    const res = await fetch(`${BACKEND_URL}/blogs`);
    if (!res.ok) return { slugs: new Set(), lastAt: null };
    const json = await res.json();
    const posts = json.data || [];
    const slugs = new Set(posts.map((p) => p.slug));
    const lastAt = posts
      .map((p) => p.publishedAt || p.createdAt)
      .filter(Boolean)
      .sort()
      .pop() || null;
    return { slugs, lastAt };
  } catch {
    return { slugs: new Set(), lastAt: null };
  }
}

// ── Run ──────────────────────────────────────────────────────────────────────
(async () => {
  const allSlugs = POSTS.map((p) => p.slug);
  const { slugs: live, lastAt } = await alreadyPublished();

  if (!doPublish) {
    console.log(`\nBLOG SEED QUEUE — ${POSTS.length} post(s)\n`);
    POSTS.forEach((p) => {
      const issues = qualityIssues(p, allSlugs);
      const state = live.has(p.slug) ? 'ALREADY PUBLISHED'
        : p.status === 'approved' ? 'APPROVED — ready'
        : 'DRAFT — set status: "approved"';
      console.log(`${live.has(p.slug) ? '✔' : p.status === 'approved' ? '✅' : '⏳'}  ${p.title}`);
      console.log(`    /blog/${p.slug}`);
      console.log(`    ${p.category} · clusters → /${p.serviceCluster} · ${wordCount(p)} words · ${readTime(p)} min`);
      console.log(`    ${state}`);
      if (issues.length) console.log(`    ⚠️  ${issues.join('; ')}`);
      console.log('');
    });
    if (lastAt) console.log(`Last published post: ${String(lastAt).slice(0, 10)}`);
    console.log(`Drip gap: ${DRIP_DAYS} days\n`);
    console.log('  node scripts/seedBlogPosts.js --publish            (dry run)');
    console.log('  node scripts/seedBlogPosts.js --publish --confirm  (publish one)\n');
    return;
  }

  // Drip: only publish if enough time has passed since the last post.
  if (lastAt && !ignoreDrip) {
    const days = (Date.now() - new Date(lastAt).getTime()) / 86400000;
    if (days < DRIP_DAYS) {
      console.log(`⏳ Last post was ${days.toFixed(1)} days ago; drip gap is ${DRIP_DAYS}. Nothing to do.`);
      return;
    }
  }

  const candidates = POSTS.filter((p) => p.status === 'approved' && !live.has(p.slug));
  if (!candidates.length) {
    console.log('No approved, unpublished posts in the queue. Nothing to do.');
    return;
  }

  const next = candidates[0];
  const issues = qualityIssues(next, allSlugs);

  console.log(`\nNext up: "${next.title}"  → /blog/${next.slug}`);
  console.log(`${wordCount(next)} words · ${(next.keyTakeaways || []).length} takeaways · ${(next.faqs || []).length} FAQs`);
  if (candidates.length > 1) console.log(`(${candidates.length - 1} more approved — one per run keeps the cadence.)`);

  if (issues.length) {
    console.error('\n❌ Quality gate failed — not publishing:');
    issues.forEach((i) => console.error('   • ' + i));
    process.exit(1);
  }

  if (!confirmed) {
    console.log('\nDRY RUN. Nothing published. Re-run with --confirm.\n');
    return;
  }

  const auth = await getToken();
  if (!auth) process.exit(1);
  console.log(`Authenticated via ${auth.how}`);

  const payload = {
    title: next.title,
    slug: next.slug,
    excerpt: next.excerpt,
    content: buildBody(next),
    author: next.author || 'Avani Enterprises',
    tags: [next.category, ...(next.tags || [])].filter(Boolean),
    featuredImage: next.coverImage || '',
    category: next.category,
    readTime: readTime(next),
    isPublished: true,
  };

  const res = await fetch(`${BACKEND_URL}/admin/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`\n❌ Publish failed: HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }

  console.log(`\n✅ Published /blog/${next.slug}`);
  console.log('   Crawlable immediately — api/seo.js server-renders slugs that are not');
  console.log('   yet in the build snapshot. Redeploy when convenient to fold it into');
  console.log('   the snapshot, the sitemap and the category index.\n');
})();
