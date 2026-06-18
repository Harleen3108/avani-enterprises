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

  // ── SEO Product Landing Pages ─────────────────────────────────────────────
  { loc: `${BASE_URL}/hr-portal`,                      lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/hrms-software-india`,            lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/payroll-software-india`,         lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/attendance-management-system`,   lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/leave-management-software`,      lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/employee-management-software`,   lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/employee-portal`,                lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/crm-software-india`,             lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/workforce-management-software`,  lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/project-management-software`,    lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/business-operating-system`,      lastmod: "2026-06-10", changefreq: "monthly", priority: "0.9" },

  // ── Flagship Service Pages ────────────────────────────────────────────────
  { loc: `${BASE_URL}/web-development-company`,         lastmod: TODAY, changefreq: "weekly", priority: "0.95" },
  { loc: `${BASE_URL}/seo-company`,                     lastmod: TODAY, changefreq: "weekly", priority: "0.95" },
  { loc: `${BASE_URL}/digital-marketing-company`,       lastmod: TODAY, changefreq: "weekly", priority: "0.95" },
  { loc: `${BASE_URL}/google-ads-agency`,               lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-automation-company`,           lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/crm-development-company`,          lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  // Batch 2 service pages
  { loc: `${BASE_URL}/web-design-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/ecommerce-development-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/custom-software-development-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/mobile-app-development-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/hr-portal-development-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/meta-ads-agency`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/social-media-marketing-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-solutions-company`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/local-seo-services`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
  { loc: `${BASE_URL}/business-process-automation`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },

  // ── City Pages (Batch 3) ──────────────────────────────────────────────────
  { loc: `${BASE_URL}/web-development-company-rohtak`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-panipat`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-karnal`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-sonipat`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-hisar`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-ambala`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-faridabad`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-ghaziabad`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-greater-noida`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-gurgaon`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-noida`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-rohtak`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-panipat`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-gurgaon`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-noida`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-rohtak`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-delhi`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/ai-automation-company-gurgaon`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/ai-solutions-company-noida`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },
  { loc: `${BASE_URL}/ai-solutions-company-delhi`, lastmod: TODAY, changefreq: "weekly", priority: "0.85" },

  // ── Competitor Alternative Pages ──────────────────────────────────────────
  { loc: `${BASE_URL}/keka-alternative`,               lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/greythr-alternative`,            lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/darwinbox-alternative`,          lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/zoho-people-alternative`,        lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },

  // ── Local SEO & City Pages ────────────────────────────────────────────────
  { loc: `${BASE_URL}/rohtak`,                         lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/gurgaon`,                        lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/faridabad`,                      lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/delhi`,                          lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-haryana`, lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-delhi`,   lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-gurgaon`,     lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-noida`,       lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-chandigarh`,  lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-india`,       lastmod: "2026-06-15", changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/web-development-company-mumbai`,      lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-bangalore`,   lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-pune`,        lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-hyderabad`,   lastmod: "2026-06-15", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/social-media-marketing-agency-haryana`, lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/social-media-marketing-agency-delhi`,   lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-agency-haryana`, lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-agency-delhi`,   lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-haryana`,            lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-delhi`,              lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/google-ads-agency-haryana`,      lastmod: "2026-06-10", changefreq: "monthly", priority: "0.85" },

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
