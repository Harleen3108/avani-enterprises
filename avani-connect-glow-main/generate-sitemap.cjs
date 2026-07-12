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
  { loc: `${BASE_URL}/web-development-company`,         lastmod: TODAY, changefreq: "monthly", priority: "0.95" },
  { loc: `${BASE_URL}/seo-company`,                     lastmod: TODAY, changefreq: "monthly", priority: "0.95" },
  { loc: `${BASE_URL}/digital-marketing-company`,       lastmod: TODAY, changefreq: "monthly", priority: "0.95" },
  { loc: `${BASE_URL}/google-ads-agency`,               lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-automation-company`,           lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/crm-development-company`,          lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  // Batch 2 service pages
  { loc: `${BASE_URL}/web-design-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ecommerce-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/custom-software-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/mobile-app-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/hr-portal-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/meta-ads-agency`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/social-media-marketing-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-solutions-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/local-seo-services`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/business-process-automation`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  // Batch A (35 service-cluster pages)
  { loc: `${BASE_URL}/website-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/full-stack-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/shopify-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/woocommerce-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/custom-ecommerce-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/custom-crm-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/crm-software-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/crm-consulting-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/erp-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/custom-erp-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/erp-software-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/hrms-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/hr-software-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/attendance-management-software-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/payroll-software-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/business-operating-system-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/workflow-automation-software-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-chatbot-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/openai-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/claude-ai-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/gemini-ai-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/mcp-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/llm-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ai-consulting-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/android-app-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ios-app-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/flutter-app-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/react-native-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/seo-services`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/enterprise-seo-services`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ecommerce-seo-services`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/performance-marketing-agency`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/facebook-ads-agency`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/instagram-marketing-agency`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  // Batch A services + comparison
  { loc: `${BASE_URL}/custom-web-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/frontend-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/backend-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/ecommerce-website-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/business-management-software-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/agentic-ai-development-company`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/custom-ai-development`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" },
  { loc: `${BASE_URL}/webmok-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-aspiration-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/leo-digitals-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/the-growth-box-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/techmagnate-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/pagetraffic-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/ez-rankings-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/indeedseo-alternative`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },

  // ── City Pages (Batch 3) ──────────────────────────────────────────────────
  { loc: `${BASE_URL}/web-development-company-rohtak`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  // Batch B (12 city pages)
  { loc: `${BASE_URL}/seo-company-mumbai`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-bangalore`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-mumbai`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-bangalore`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-chandigarh`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-dubai`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-abu-dhabi`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-qatar`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-dubai`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-dubai`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-london`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-usa`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-panipat`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-karnal`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-sonipat`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-hisar`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-ambala`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-faridabad`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-ghaziabad`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/web-development-company-greater-noida`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-gurgaon`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-noida`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-rohtak`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/seo-company-panipat`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-gurgaon`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-noida`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-rohtak`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/digital-marketing-company-delhi`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/ai-automation-company-gurgaon`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/ai-solutions-company-noida`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },
  { loc: `${BASE_URL}/ai-solutions-company-delhi`, lastmod: TODAY, changefreq: "monthly", priority: "0.85" },

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

  // ── HTML Sitemap ──────────────────────────────────────────────────────────
  {
    loc:        `${BASE_URL}/sitemap`,
    lastmod:    "2026-07-12",
    changefreq: "monthly",
    priority:   "0.5",
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

// ── Dynamic SEO Pages ────────────────────────────────────────────────────────
const newSeoDataPath = path.join(__dirname, "src", "data", "newSeoPagesData.json");
if (fs.existsSync(newSeoDataPath)) {
  try {
    const rawData = fs.readFileSync(newSeoDataPath, "utf8");
    const parsedData = JSON.parse(rawData);
    Object.keys(parsedData).forEach(slug => {
      let priority = "0.9";
      const page = parsedData[slug];
      if (page.type === "product") {
        priority = "0.9";
      } else if (page.type === "location") {
        priority = "0.85";
      }
      urls.push({
        loc: `${BASE_URL}/${slug}`,
        lastmod: "2026-06-26",
        changefreq: "monthly",
        priority: priority
      });
    });
    console.log(`ℹ️ Dynamically loaded ${Object.keys(parsedData).length} paths from newSeoPagesData.json into sitemap.`);
  } catch (err) {
    console.error("❌ Error reading or parsing newSeoPagesData.json for sitemap:", err);
  }
} else {
  console.warn("⚠️ newSeoPagesData.json not found, skipping dynamic SEO paths in sitemap.");
}

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

// ── Write sitemap.xml to public/ ─────────────────────────────────────────────
const outputPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(outputPath, xml, "utf8");

console.log(`✅ sitemap.xml generated → ${outputPath}`);
console.log(`   ${urls.length} URLs | lastmod build date: ${TODAY}`);

// ── Image Sitemap ─────────────────────────────────────────────────────────────
// Maps page URLs to their primary images for Google Images discoverability.
// Only include meaningful, content-relevant images (no icons/favicons).

// XML requires these 5 characters escaped in text content
function xmlEscape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
const imageEntries = [
  {
    loc: `${BASE_URL}/`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "Avani Enterprises — Digital Marketing Agency India", caption: "India's leading digital marketing and web development agency based in Gurugram" }
    ]
  },
  {
    loc: `${BASE_URL}/about`,
    images: [
      { loc: `${BASE_URL}/logo.png`, title: "Avani Enterprises Team — Web & Digital Marketing Agency Gurugram", caption: "Avani Enterprises founding team, Gurugram, Haryana" }
    ]
  },
  {
    loc: `${BASE_URL}/projects`,
    images: [
      { loc: `${BASE_URL}/frd-nutrition.webp`, title: "FRD Nutrition — E-commerce Website by Avani Enterprises", caption: "Custom e-commerce website development for FRD Nutrition" },
      { loc: `${BASE_URL}/hitech-homes.webp`,  title: "HiTech Homes — Real Estate Website by Avani Enterprises", caption: "Luxury real estate website for HiTech Homes" },
      { loc: `${BASE_URL}/policicue.webp`,     title: "Policicue — Insurance Platform by Avani Enterprises",   caption: "Custom insurance management platform for Policicue" }
    ]
  },
  {
    loc: `${BASE_URL}/web-development-company`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "Web Development Company in India — Avani Enterprises", caption: "Custom web development services for businesses across India" }
    ]
  },
  {
    loc: `${BASE_URL}/seo-company`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "SEO Company in India — Avani Enterprises", caption: "Full-stack SEO services, Google ranking, and organic traffic growth" }
    ]
  },
  {
    loc: `${BASE_URL}/digital-marketing-company`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "Digital Marketing Company in India — Avani Enterprises", caption: "Performance digital marketing including SEO, Google Ads, Meta Ads" }
    ]
  },
  {
    loc: `${BASE_URL}/hr-portal`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "HR Portal Software India — Avani Enterprises", caption: "Custom HR portal and employee self-service software for Indian businesses" }
    ]
  },
  {
    loc: `${BASE_URL}/hrms-software-india`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "HRMS Software India — Avani Enterprises", caption: "Cloud-based HRMS for attendance, payroll, and employee management" }
    ]
  },
  {
    loc: `${BASE_URL}/crm-software-india`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "CRM Software India — Avani Enterprises", caption: "Custom CRM software with sales pipeline and automation for Indian businesses" }
    ]
  },
  {
    loc: `${BASE_URL}/ai-automation-company`,
    images: [
      { loc: `${BASE_URL}/logo0.webp`, title: "AI Automation Company India — Avani Enterprises", caption: "AI automation, chatbots, WhatsApp automation, and agentic AI for businesses" }
    ]
  }
];

const imageSitemapEntries = imageEntries
  .map(({ loc, images }) => {
    const imgTags = images
      .map(({ loc: imgLoc, title, caption }) =>
        [
          `    <image:image>`,
          `      <image:loc>${imgLoc}</image:loc>`,
          `      <image:title>${xmlEscape(title)}</image:title>`,
          `      <image:caption>${xmlEscape(caption)}</image:caption>`,
          `    </image:image>`,
        ].join("\n")
      )
      .join("\n");
    return `  <url>\n    <loc>${loc}</loc>\n${imgTags}\n  </url>`;
  })
  .join("\n");

const imageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${imageSitemapEntries}

</urlset>
`;

const imageSitemapPath = path.join(__dirname, "public", "sitemap-images.xml");
fs.writeFileSync(imageSitemapPath, imageSitemapXml, "utf8");
console.log(`✅ sitemap-images.xml generated → ${imageSitemapPath}`);
console.log(`   ${imageEntries.length} page image entries`);

// ── Sitemap Index ─────────────────────────────────────────────────────────────
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>
`;

const sitemapIndexPath = path.join(__dirname, "public", "sitemap-index.xml");
fs.writeFileSync(sitemapIndexPath, sitemapIndexXml, "utf8");
console.log(`✅ sitemap-index.xml generated → ${sitemapIndexPath}`);
