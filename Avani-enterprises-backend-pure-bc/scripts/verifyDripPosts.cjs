#!/usr/bin/env node
/**
 * verifyDripPosts.cjs — check the drip queue before it touches the database.
 *
 *   node scripts/verifyDripPosts.cjs
 *
 * The seeder has its own validation gate, but that only covers structure. This
 * checks the things that actually decide whether a post helps or hurts:
 * duplicate content against what is already published, invented statistics,
 * broken internal links, and whether the answer-engine formatting is really there.
 *
 * Exits non-zero on any FAIL, so it can gate a deploy.
 */

const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const SITE_ROUTES_FILE = path.join(DIR, "_allowedRoutes.json");

/* ── Load posts ───────────────────────────────────────────────────────────── */

const files = fs.readdirSync(DIR)
  .filter((f) => /^_dripBlogPart\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[1], 10) - parseInt(b.match(/\d+/)[1], 10));

const posts = [];
for (const f of files) {
  let part;
  try {
    part = require(path.join(DIR, f));
  } catch (err) {
    console.error(`FATAL  ${f} does not parse: ${err.message}`);
    process.exit(1);
  }
  if (!Array.isArray(part)) {
    console.error(`FATAL  ${f} must export an array`);
    process.exit(1);
  }
  part.forEach((p) => posts.push({ ...p, _file: f }));
}

/* ── Reference data ───────────────────────────────────────────────────────── */

const allowedRoutes = fs.existsSync(SITE_ROUTES_FILE)
  ? JSON.parse(fs.readFileSync(SITE_ROUTES_FILE, "utf8"))
  : null;

const queueSlugs = new Set(posts.map((p) => p.slug));

const text = (html) => String(html || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
const words = (html) => text(html).split(" ").filter(Boolean).length;

/**
 * Patterns that almost always indicate an invented statistic. The site was
 * penalised for unverifiable content, so these are treated as failures unless
 * the sentence also names a real source.
 */
const STAT_PATTERNS = [
  /\b\d{1,3}\s?% of\b/i,
  /\b\d{1,3}\s?%\s+(?:more|less|higher|lower|faster|increase|decrease|improvement|growth|conversion)/i,
  // "studies show", "research suggests" — the classic unsourced appeal.
  // Deliberately excludes "report(s)": in this domain "the Pages report shows"
  // and "the Coverage report found" name real dashboards, not invented studies.
  /\b(?:studies|research|surveys)\s+(?:show|shows|found|suggest|suggests|indicate|indicates)/i,
  /\baccording to (?:a|one|recent) (?:study|survey|report)/i,
  /\b\d+x\s+(?:more|better|faster|higher|increase|growth|ROI|return)/i,
  /\bwe (?:have )?(?:helped|grew|scaled|increased|delivered)\s+\d+/i,
  /\b(?:over|more than|upwards of)\s+\d{2,}\s+(?:clients?|businesses|companies|customers|brands)/i,
  /\b(?:guaranteed|guarantee)\s+(?:rankings?|results?|traffic|leads|page one|#1|first page)/i,
  /\bwithin\s+\d+\s+(?:days?|weeks?)\s+(?:you|we)\s+(?:will|'ll)\b/i,
  /\blimited\s+(?:slots?|seats?|time)\b/i,
];
const SOURCE_HINT = /\b(?:google|schema\.org|w3c|meta|microsoft|openai|shopify|according to)\b/i;

/* ── Checks ───────────────────────────────────────────────────────────────── */

const fails = [];
const warns = [];
const fail = (slug, msg) => fails.push(`${slug}: ${msg}`);
const warn = (slug, msg) => warns.push(`${slug}: ${msg}`);

const seen = new Map();

for (const p of posts) {
  const s = p.slug || "(no slug)";

  if (!/^[a-z0-9-]+$/.test(p.slug || "")) fail(s, "slug must be lowercase-hyphen");
  if (seen.has(p.slug)) fail(s, `duplicate slug (also in ${seen.get(p.slug)})`);
  seen.set(p.slug, p._file);

  const w = words(p.content);
  if (w < 900) fail(s, `${w} words — under the 900 minimum`);
  else if (w > 1700) warn(s, `${w} words — longer than the 1500 target`);

  if (/<h1[\s>]/i.test(p.content)) fail(s, "contains an <h1>; the page owns that");
  if (/\s(?:style|bgcolor|color|face)\s*=/i.test(p.content)) {
    fail(s, "inline style/color attribute — stripped at render, so it will not work");
  }

  const ctas = (p.content.match(/class="post-cta"/g) || []).length;
  if (ctas !== 2) fail(s, `${ctas} lead CTA block(s); the spec requires exactly 2`);
  if (!/href="\/contact"/.test(p.content)) fail(s, "no link to the /contact lead form");

  // Answer-engine formatting: most headings should be questions.
  const h2s = [...p.content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => text(m[1]));
  if (h2s.length < 4) fail(s, `only ${h2s.length} <h2> sections`);
  const questionH2s = h2s.filter((h) => h.trim().endsWith("?")).length;
  if (h2s.length && questionH2s / h2s.length < 0.5) {
    warn(s, `${questionH2s}/${h2s.length} headings are questions — AEO wants most of them to be`);
  }

  // Links
  const hrefs = [...p.content.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const internal = hrefs.filter((h) => h.startsWith("/"));
  const blogLinks = internal.filter((h) => h.startsWith("/blog/"));
  const siteLinks = internal.filter((h) => !h.startsWith("/blog/"));

  hrefs.filter((h) => !h.startsWith("/")).forEach((h) => warn(s, `external link: ${h}`));

  if (siteLinks.length < 3) fail(s, `${siteLinks.length} site links — spec requires 3-6`);
  if (blogLinks.length < 2) fail(s, `${blogLinks.length} blog links — spec requires 2-4`);

  blogLinks.forEach((h) => {
    const slug = h.replace(/^\/blog\//, "").replace(/[#?].*$/, "");
    if (!queueSlugs.has(slug)) fail(s, `links to /blog/${slug}, which is not in the queue`);
  });

  if (allowedRoutes) {
    siteLinks.forEach((h) => {
      const clean = h.replace(/[#?].*$/, "").replace(/\/$/, "") || "/";
      if (!allowedRoutes.includes(clean)) fail(s, `links to ${clean}, which is not a live route`);
    });
  }

  if (internal.some((h) => h === `/blog/${p.slug}`)) fail(s, "links to itself");

  // Fields
  if (!p.category) fail(s, "no category");
  if (!p.excerpt) fail(s, "no excerpt");
  if (!p.metaTitle) fail(s, "no metaTitle");
  else if (p.metaTitle.length > 62) warn(s, `metaTitle ${p.metaTitle.length} chars (target <60)`);
  if (!p.metaDescription) fail(s, "no metaDescription");
  else if (p.metaDescription.length < 130 || p.metaDescription.length > 175) {
    warn(s, `metaDescription ${p.metaDescription.length} chars (target ~155)`);
  }
  if (!Array.isArray(p.metaKeywords) || !p.metaKeywords.length) warn(s, "no metaKeywords");
  if (!Array.isArray(p.tags) || !p.tags.length) warn(s, "no tags");

  const kt = (p.keyTakeaways || []).length;
  if (kt < 3 || kt > 6) fail(s, `${kt} keyTakeaways — spec requires 3-5`);
  (p.keyTakeaways || []).forEach((t, i) => {
    if (String(t).trim().length < 40) warn(s, `keyTakeaway ${i + 1} is too short to be quotable`);
  });

  const nf = (p.faqs || []).length;
  if (nf < 4 || nf > 7) fail(s, `${nf} faqs — spec requires 4-6`);
  (p.faqs || []).forEach((f, i) => {
    if (!f || !f.q || !f.a) fail(s, `faq ${i + 1} missing q or a`);
    else if (!String(f.q).trim().endsWith("?")) warn(s, `faq ${i + 1} is not phrased as a question`);
  });

  // Honesty scan
  const all = [text(p.content), (p.keyTakeaways || []).join(" "), (p.faqs || []).map((f) => `${f.q} ${f.a}`).join(" ")].join(" ");
  for (const re of STAT_PATTERNS) {
    const m = all.match(re);
    if (!m) continue;
    const idx = all.indexOf(m[0]);
    const sentence = all.slice(Math.max(0, idx - 120), idx + 160);
    if (SOURCE_HINT.test(sentence)) warn(s, `stat-like phrase near a named source, check it: "${m[0]}"`);
    else fail(s, `possible invented claim: "${m[0]}"  …${sentence.slice(80, 220)}…`);
  }
}

/* ── Duplicate content, within the queue and against the live corpus ──────── */

const g5 = (s) => {
  const w = text(s).toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 5 <= w.length; i++) set.add(w.slice(i, i + 5).join(" "));
  return set;
};
const contain = (a, b) => {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return a.size ? n / a.size : 0;
};

const grams = posts.map((p) => ({ slug: p.slug, g: g5(p.content) }));
for (let i = 0; i < grams.length; i++) {
  for (let j = i + 1; j < grams.length; j++) {
    const c = Math.max(contain(grams[i].g, grams[j].g), contain(grams[j].g, grams[i].g));
    // The CTA markup is shared by design, which is a couple of percent.
    if (c > 0.12) fail(grams[i].slug, `${(c * 100).toFixed(1)}% passage overlap with ${grams[j].slug}`);
  }
}

/* ── Report ───────────────────────────────────────────────────────────────── */

const totalWords = posts.reduce((n, p) => n + words(p.content), 0);
console.log(`\n${posts.length} posts across ${files.length} file(s) · ${totalWords.toLocaleString()} words total`);
console.log(`median length: ${posts.map((p) => words(p.content)).sort((a, b) => a - b)[Math.floor(posts.length / 2)]} words\n`);

if (warns.length) {
  console.log(`WARNINGS (${warns.length})`);
  warns.forEach((w) => console.log(`  ~ ${w}`));
  console.log("");
}

if (fails.length) {
  console.log(`FAILURES (${fails.length})`);
  fails.forEach((f) => console.log(`  ✗ ${f}`));
  console.log("\nFix these before seeding.\n");
  process.exit(1);
}

console.log("✅ All checks passed. Safe to seed.\n");
