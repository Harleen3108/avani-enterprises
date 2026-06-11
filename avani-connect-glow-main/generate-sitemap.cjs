// generate-sitemap.cjs
// ─────────────────────────────────────────────────────────────────────────────
// Runs automatically before every build via:  "prebuild": "node generate-sitemap.cjs"
// Writes public/sitemap.xml with accurate lastmod dates.
//
// Rules:
//  • TODAY is used for pages that change on every deploy (homepage, blog index)
//  • Static dates are used for pages whose content is stable
//  • Auth / utility routes (login, register, forgot-password, thank-you,
//    admin, links) are NEVER included — they waste crawl budget.
//  • Cross-domain URLs are NEVER included.
// ─────────────────────────────────────────────────────────────────────────────

const fs   = require("fs");
const path = require("path");

const BASE_URL = "https://www.avanienterprises.in";
const TODAY    = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// ── URL definitions ──────────────────────────────────────────────────────────
// lastmod:     TODAY  = changes on every deploy (homepage, blog index, etc.)
//              fixed  = page content rarely changes — update manually when you edit
// changefreq:  reflects how often Google should re-crawl
// priority:    relative importance (Google treats this as a hint, not directive)
// ─────────────────────────────────────────────────────────────────────────────
const urls = [
  // ── Homepage ──────────────────────────────────────────────────────────────
  {
    loc:        `${BASE_URL}/`,
    lastmod:    TODAY,
    changefreq: "weekly",
    priority:   "1.0",
  },

  // ── Core Pages ────────────────────────────────────────────────────────────
  {
    loc:        `${BASE_URL}/about`,
    lastmod:    "2026-05-15",
    changefreq: "monthly",
    priority:   "0.8",
  },
  {
    loc:        `${BASE_URL}/services`,
    lastmod:    "2026-05-15",
    changefreq: "monthly",
    priority:   "0.9",
  },
  {
    loc:        `${BASE_URL}/contact`,
    lastmod:    "2026-04-01",
    changefreq: "yearly",
    priority:   "0.7",
  },
  {
    loc:        `${BASE_URL}/case-studies`,
    lastmod:    "2026-05-20",
    changefreq: "monthly",
    priority:   "0.8",
  },
  {
    loc:        `${BASE_URL}/projects`,
    lastmod:    "2026-05-20",
    changefreq: "monthly",
    priority:   "0.8",
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  {
    loc:        `${BASE_URL}/blog`,
    lastmod:    TODAY,           // Blog index updates whenever a post is published
    changefreq: "weekly",
    priority:   "0.8",
  },

  // ── Other Public Sections ─────────────────────────────────────────────────
  {
    loc:        `${BASE_URL}/global-presence`,
    lastmod:    "2026-04-01",
    changefreq: "monthly",
    priority:   "0.6",
  },
  {
    loc:        `${BASE_URL}/careers`,
    lastmod:    TODAY,           // Job listings change frequently
    changefreq: "weekly",
    priority:   "0.7",
  },
  {
    loc:        `${BASE_URL}/newsletters`,
    lastmod:    TODAY,
    changefreq: "weekly",
    priority:   "0.6",
  },
  {
    loc:        `${BASE_URL}/courses`,
    lastmod:    "2026-05-01",
    changefreq: "monthly",
    priority:   "0.7",
  },

  // ── Legal / Utility (low priority — still indexable) ─────────────────────
  {
    loc:        `${BASE_URL}/privacy-policy`,
    lastmod:    "2026-01-01",
    changefreq: "yearly",
    priority:   "0.3",
  },
  {
    loc:        `${BASE_URL}/terms-and-conditions`,
    lastmod:    "2026-01-01",
    changefreq: "yearly",
    priority:   "0.3",
  },

  // ────────────────────────────────────────────────────────────────────────────
  // INTENTIONALLY EXCLUDED (do NOT add back without SEO review):
  //   /get-consultation  — form-only page, low crawl value vs landing pages
  //   /thank-you         — noindex page, no search intent
  //   /links             — utility / link-in-bio page, not meant for indexing
  //   /admin             — protected
  //   /web-dev           — legacy, covered by /services
  //   /7-day-launch      — campaign landing page (add when live & tested)
  //   /business-setup    — campaign landing page (add when live & tested)
  //   /home2/*           — internal design prototype, not production
  //   /policicue         — project showcase, covered under /projects
  //   cross-domain URLs  — NEVER include URLs from other domains
  // ────────────────────────────────────────────────────────────────────────────
];

// ── Build XML ────────────────────────────────────────────────────────────────
const urlEntries = urls
  .map(({ loc, lastmod, changefreq, priority }) =>
    [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n")
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urlEntries}

</urlset>
`;

// ── Write to public/ ──────────────────────────────────────────────────────────
const outputPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(outputPath, xml, "utf8");

console.log(`✅ sitemap.xml generated → ${outputPath}`);
console.log(`   ${urls.length} URLs | lastmod build date: ${TODAY}`);
