/**
 * snapshot-blog.cjs — bake published blog posts into the serverless bundle.
 *
 * WHY
 * ---
 * /blog and /blog/:slug fetch from the backend in the browser, so Googlebot's
 * first pass sees an empty shell. That is the same root cause that kept the
 * service pages out of the index, and individual posts were missing from the
 * sitemap entirely.
 *
 * Three options were considered:
 *
 *   A. Fetch from the backend inside api/seo.js on every request.
 *      Rejected: the backend is on Render and cold-starts. A slow or sleeping
 *      backend would serve Googlebot an empty shell intermittently, which is
 *      harder to diagnose than failing consistently, and it adds TTFB to every
 *      blog request.
 *
 *   B. Give up on /blog and point everything at /guides.
 *      Rejected: throws away existing posts and the CMS workflow.
 *
 *   C. Snapshot at build time, with a short runtime fetch as a fallback for
 *      posts published since the last deploy.  ← chosen
 *      Existing posts render instantly with no backend dependency; new posts
 *      are still crawlable before the next deploy.
 *
 * If the backend is unreachable at build time we KEEP the previous snapshot.
 * A stale snapshot is far better than silently un-rendering the whole blog.
 *
 * Runs before generate-sitemap.cjs, which reads the output to add post URLs to
 * the sitemap.
 */

const fs = require("fs");
const path = require("path");

// Must match src/lib/api.ts. Note that api/seo.js previously pointed at
// avani-enterprises-backend-1.onrender.com, which returns 503 — this is the
// live host the frontend actually uses.
const BACKEND_URL = process.env.BACKEND_URL || "https://avani-enterprises.onrender.com";
const OUT = path.join(__dirname, "..", "api", "blogContent.js");
const TIMEOUT_MS = Number(process.env.BLOG_SNAPSHOT_TIMEOUT_MS || 25000);

/** Strip anything executable; keep the structural markup that carries SEO value. */
function sanitiseHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<\/?(?:link|meta|base|object|embed|form|input)\b[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

/**
 * CMS authors used <h1> for section headings, so nine posts shipped with between
 * 2 and 18 H1 tags. A page should have exactly one H1 — the title, which the
 * template renders — so every H1 inside post body content is demoted to H2.
 */
function demoteHeadings(html) {
  return String(html || "")
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>");
}

/**
 * Remove unverifiable superlatives and invented counts from CMS copy.
 * The site cannot claim "No.1" for a brand nobody has heard of, and the numbers
 * were never substantiated. Applied at snapshot time because this content lives
 * in the CMS, not the repo — re-running the snapshot re-applies it.
 */
const CLAIM_RULES = [
  [/\bNo\.\s?1\s+(Digital Marketing Agency|digital marketing agency)\b/g, "digital marketing agency"],
  [/\bIndia's\s+No\.\s?1\b/gi, "a Gurugram-based"],
  [/\bNo\.\s?1\b/g, ""],
  [/\s#1\s/g, " "],
  [/\bIndia's leading\b/gi, "a Gurugram-based"],
  [/\bbest digital marketing agency\b/gi, "digital marketing agency"],
  [/\b300\+\s*(Projects|projects)\b/g, "projects"],
  [/\b150\+\s*(Happy\s*)?(Clients|clients)\b/g, "clients"],
  [/\b5\.0\s*Client Rating\b/gi, ""],
  [/\b100% OFF\b/gi, "no cost"],
  [/₹999\s*\/?-?/g, "Free"],
];

function cleanClaims(html) {
  let s = String(html || "");
  CLAIM_RULES.forEach(([re, to]) => { s = s.replace(re, to); });
  return s.replace(/\s{2,}/g, " ");
}


/**
 * Category for the filtered blog index. The CMS has no category field, so it is
 * derived from tags and title keywords — deterministic, and it means existing
 * posts get categorised without anyone re-tagging 52 of them by hand.
 */
const CATEGORY_RULES = [
  ['AI', /\b(ai|artificial intelligence|chatbot|agentic|llm|gpt|voice agent|automation)\b/i],
  ['SEO', /\b(seo|search engine|rankings?|indexing|serp|keywords?|backlinks?)\b/i],
  ['Social Media', /\b(social media|instagram|linkedin|reels|scheduler|dm tool)\b/i],
  ['Digital Marketing', /\b(digital marketing|ppc|google ads|meta ads|facebook ads|roas|ad spend|lead generation)\b/i],
  ['Web Development', /\b(web development|websites?|react|mern|flutter|app development|cms|frontend|backend)\b/i],
  ['Business OS', /\b(hrms|payroll|attendance|business os|erp|crm|employee|leave management)\b/i],
  ['Business', /\b(business|consulting|finance|loans?|insurance|growth|strategy)\b/i],
];

function deriveCategory(post) {
  const tagText = (Array.isArray(post.tags) ? post.tags.join(' ') : '');
  const hay = tagText + " " + (post.title || "") + " " + (post.excerpt || "");
  for (const [name, re] of CATEGORY_RULES) if (re.test(hay)) return name;
  return 'Insights';
}

/** Reading time at 200 words per minute, from the rendered text. */
function readTime(html) {
  const words = String(html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function write(obj, note) {
  fs.writeFileSync(
    OUT,
    "// AUTO-GENERATED by scripts/snapshot-blog.cjs — do not edit.\n" +
    `// ${note}\n\n` +
    "export const blogContent = " + JSON.stringify(obj) + ";\n",
    "utf8"
  );
}

function previousSnapshotCount() {
  if (!fs.existsSync(OUT)) return null;
  try {
    const m = fs.readFileSync(OUT, "utf8").match(/export const blogContent = ([\s\S]*);\s*$/);
    return Object.keys(JSON.parse(m[1])).length;
  } catch {
    return null;
  }
}

(async () => {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(`${BACKEND_URL}/blogs`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();

    // The endpoint already excludes future-dated posts, but snapshot the same
    // rule locally as well. A scheduled post must never be baked into the build
    // — that would put it in the sitemap and make it server-rendered before its
    // publish date, which is the one thing the drip must not do.
    const nowMs = Date.now();
    const posts = (json.data || []).filter(
      (p) => p && p.isPublished && p.slug &&
        (!p.publishedAt || new Date(p.publishedAt).getTime() <= nowMs)
    );

    const scheduled = (json.data || []).filter(
      (p) => p && p.publishedAt && new Date(p.publishedAt).getTime() > nowMs
    ).length;
    if (scheduled) console.log(`   (${scheduled} scheduled post(s) held back until their publish date)`);

    const trimmed = {};
    posts.forEach((p) => {
      trimmed[p.slug] = {
        title: cleanClaims(p.title || ""),
        excerpt: cleanClaims(p.excerpt || ""),
        content: cleanClaims(demoteHeadings(sanitiseHtml(p.content))),
        author: p.author || "Avani Enterprises",
        tags: Array.isArray(p.tags) ? p.tags : [],
        featuredImage: p.featuredImage || "",
        publishedAt: p.publishedAt || p.createdAt || "",
        updatedAt: p.updatedAt || p.publishedAt || p.createdAt || "",
        category: p.category || deriveCategory(p),
        readTime: p.readTime || readTime(p.content),
        views: p.views || 0,
        likes: p.likes || 0,
        // Stored by drip-seeded posts. Older posts keep these inside the body,
        // so both are empty arrays there and the SSR falls back to extraction.
        metaTitle: p.metaTitle || "",
        metaDescription: cleanClaims(p.metaDescription || ""),
        keyTakeaways: Array.isArray(p.keyTakeaways) ? p.keyTakeaways.map(cleanClaims) : [],
        faqs: Array.isArray(p.faqs)
          ? p.faqs.map((f) => ({ q: cleanClaims(f.q || ""), a: cleanClaims(f.a || "") }))
          : [],
      };
    });

    write(trimmed, `Snapshot of ${posts.length} published post(s) from ${BACKEND_URL}/blogs`);
    console.log(`✅ api/blogContent.js — ${posts.length} published post(s) snapshotted`);
  } catch (err) {
    const prev = previousSnapshotCount();
    if (prev !== null) {
      console.warn(`⚠️ Blog snapshot fetch failed (${err.message}). Keeping previous snapshot of ${prev} post(s).`);
    } else {
      write({}, `Backend unreachable at build time (${err.message}); api/seo.js falls back to a runtime fetch.`);
      console.warn(`⚠️ Blog snapshot fetch failed (${err.message}) and no previous snapshot exists. Wrote an empty one — api/seo.js will fall back to a runtime fetch per post.`);
    }
  }
})();
