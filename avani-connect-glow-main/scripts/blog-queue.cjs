/**
 * blog-queue.cjs — review and publish the drafted blog queue.
 *
 *   node scripts/blog-queue.cjs              → show the queue and quality checks
 *   node scripts/blog-queue.cjs --publish    → dry run: what WOULD publish today
 *   node scripts/blog-queue.cjs --publish --confirm
 *                                            → actually publish due, approved posts
 *
 * NOTHING PUBLISHES WITHOUT --confirm. This is deliberate: the site is
 * recovering from a scaled-content demotion, and a timer that publishes
 * unreviewed posts is how that happens again.
 *
 * Posts must additionally pass a hard quality gate (word count, key takeaways,
 * FAQs, distinct slug, service link). A post that fails is skipped with a reason
 * rather than published in a weaker form.
 *
 * Publishing pushes to the CMS, so the post appears without a redeploy — the
 * runtime fallback in api/seo.js server-renders any slug not yet in the
 * build-time snapshot, so it is crawlable immediately.
 */

const fs = require('fs');
const path = require('path');

const BACKEND_URL = process.env.BACKEND_URL || 'https://avani-enterprises.onrender.com';
const ADMIN_TOKEN = process.env.AVANI_ADMIN_TOKEN || '';
const TODAY = new Date().toISOString().slice(0, 10);

const MIN_WORDS = 1200;
const MIN_TAKEAWAYS = 3;
const MIN_FAQS = 3;

// ── Load the queue (ES module read as text, same approach as the other data slices)
function loadQueue() {
  const p = path.join(__dirname, '..', 'src', 'data', 'blogQueue.js');
  const src = fs.readFileSync(p, 'utf8');
  const start = src.indexOf('const BLOG_QUEUE = [');
  const end = src.indexOf('\n];', start);
  if (start === -1 || end === -1) throw new Error('Could not locate BLOG_QUEUE in blogQueue.js');
  const arr = src.slice(src.indexOf('[', start), end + 2);
  // eslint-disable-next-line no-new-func
  return new Function('return ' + arr)();
}

function wordCount(post) {
  const parts = [
    post.intro || '',
    (post.keyTakeaways || []).join(' '),
    (post.sections || []).map((s) => s.heading + ' ' + s.paragraphs.join(' ')).join(' '),
    (post.faqs || []).map((f) => f.q + ' ' + f.a).join(' '),
  ];
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

/** Hard gate. Returns [] when the post is publishable. */
function qualityIssues(post, allSlugs) {
  const issues = [];
  const words = wordCount(post);
  if (words < MIN_WORDS) issues.push(`only ${words} words (minimum ${MIN_WORDS})`);
  if ((post.keyTakeaways || []).length < MIN_TAKEAWAYS) issues.push(`needs ${MIN_TAKEAWAYS}+ key takeaways`);
  if ((post.faqs || []).length < MIN_FAQS) issues.push(`needs ${MIN_FAQS}+ FAQs`);
  if (!post.service) issues.push('no service page to cluster to');
  if (!post.intro || post.intro.split(/\s+/).length < 30) issues.push('intro must answer the title in 2–3 sentences');
  if (!/^[a-z0-9-]+$/.test(post.slug)) issues.push('slug must be lowercase, hyphenated, no spaces');
  if (allSlugs.filter((s) => s === post.slug).length > 1) issues.push('duplicate slug in the queue');
  if (!post.cta || !post.cta.heading) issues.push('no call to action');
  return issues;
}

/** Render the structured post to the HTML the CMS stores. */
function toHtml(post) {
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (s) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  const out = [];
  out.push(`<p class="lead">${inline(post.intro)}</p>`);

  out.push('<aside class="key-takeaways"><h2>Key takeaways</h2><ul>');
  (post.keyTakeaways || []).forEach((t) => out.push(`<li>${inline(t)}</li>`));
  out.push('</ul></aside>');

  (post.sections || []).forEach((s) => {
    out.push(`<h2>${esc(s.heading)}</h2>`);
    s.paragraphs.forEach((p) => out.push(`<p>${inline(p)}</p>`));
  });

  if ((post.faqs || []).length) {
    out.push('<h2>Frequently asked questions</h2>');
    post.faqs.forEach((f) => {
      out.push(`<h3>${esc(f.q)}</h3><p>${inline(f.a)}</p>`);
    });
  }

  out.push(`<h2>${esc(post.cta.heading)}</h2><p>${inline(post.cta.sub)}</p>`);
  out.push(`<p><a href="/${esc(post.service)}">${esc(post.serviceLabel)}</a> · <a href="/contact">Book a free call</a></p>`);

  if ((post.related || []).length) {
    out.push('<h2>Related reading</h2><ul>');
    post.related.forEach((r) => out.push(`<li><a href="/blog/${esc(r)}">${esc(r.replace(/-/g, ' '))}</a></li>`));
    out.push('</ul>');
  }

  return out.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const doPublish = args.includes('--publish');
const confirmed = args.includes('--confirm');

const queue = loadQueue();
const allSlugs = queue.map((p) => p.slug);

if (!doPublish) {
  console.log(`\nBLOG QUEUE — ${queue.length} post(s). Today is ${TODAY}.\n`);
  queue.forEach((p) => {
    const issues = qualityIssues(p, allSlugs);
    const state = p.approved ? (p.publishOn <= TODAY ? 'DUE' : `scheduled ${p.publishOn}`) : 'AWAITING APPROVAL';
    console.log(`${p.approved ? '✅' : '⏳'}  ${p.title}`);
    console.log(`    slug     /blog/${p.slug}`);
    console.log(`    cluster  → /${p.service}`);
    console.log(`    words    ${wordCount(p)}   takeaways ${(p.keyTakeaways || []).length}   FAQs ${(p.faqs || []).length}`);
    console.log(`    state    ${state}`);
    if (issues.length) console.log(`    ⚠️  ${issues.join('; ')}`);
    console.log('');
  });
  console.log('To approve: set `approved: true` on a post in src/data/blogQueue.js');
  console.log('Then:       node scripts/blog-queue.cjs --publish            (dry run)');
  console.log('            node scripts/blog-queue.cjs --publish --confirm  (publish)\n');
  process.exit(0);
}

// ── Publish path ─────────────────────────────────────────────────────────────
const due = queue.filter((p) => p.approved && p.publishOn <= TODAY);

if (!due.length) {
  console.log(`No approved posts are due (today ${TODAY}). Nothing to publish.`);
  process.exit(0);
}

// One post per run keeps the cadence honest even if several fall due together.
const next = due[0];
const issues = qualityIssues(next, allSlugs);

console.log(`\nNext due: "${next.title}"  (/blog/${next.slug})`);
console.log(`Words ${wordCount(next)} · takeaways ${(next.keyTakeaways || []).length} · FAQs ${(next.faqs || []).length}`);
if (due.length > 1) console.log(`(${due.length - 1} other post(s) also due — publishing one per run to hold the cadence.)`);

if (issues.length) {
  console.error('\n❌ Quality gate failed — not publishing:');
  issues.forEach((i) => console.error('   • ' + i));
  process.exit(1);
}

if (!confirmed) {
  console.log('\nDRY RUN. Nothing was published.');
  console.log('Re-run with --confirm to publish this post.\n');
  process.exit(0);
}

if (!ADMIN_TOKEN) {
  console.error('\n❌ AVANI_ADMIN_TOKEN is not set. Export the admin token and retry.');
  process.exit(1);
}

(async () => {
  const body = {
    title: next.title,
    slug: next.slug,
    excerpt: next.excerpt,
    content: toHtml(next),
    author: next.author || 'Avani Enterprises',
    tags: [next.category].filter(Boolean),
    featuredImage: next.featuredImage || '',
    isPublished: true,
  };

  const res = await fetch(`${BACKEND_URL}/admin/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ADMIN_TOKEN}` },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error(`\n❌ Publish failed: HTTP ${res.status} ${await res.text()}`);
    process.exit(1);
  }

  console.log(`\n✅ Published /blog/${next.slug}`);
  console.log('   It is crawlable immediately — api/seo.js server-renders slugs that are');
  console.log('   not yet in the build-time snapshot. Run a deploy when convenient to');
  console.log('   fold it into the snapshot and the sitemap.');
  console.log(`\n   Now set approved: false (or remove the entry) for ${next.slug} in blogQueue.js`);
  console.log('   so it cannot be published twice.\n');
})();
