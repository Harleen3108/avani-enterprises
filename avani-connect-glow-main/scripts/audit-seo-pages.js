// scripts/audit-seo-pages.js
const fs = require("fs");
const path = require("path");

const FRONTEND_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(FRONTEND_DIR, "src", "data");
const PAGES_DIR = path.join(FRONTEND_DIR, "src", "pages");

console.log("🔍 Running SEO Page Audit Script...\n");

// 1. Gather all registered paths from generate-sitemap.cjs
function getSitemapPaths() {
  const sitemapScriptPath = path.join(FRONTEND_DIR, "generate-sitemap.cjs");
  if (!fs.existsSync(sitemapScriptPath)) {
    console.error("❌ generate-sitemap.cjs not found!");
    return [];
  }
  const fileContent = fs.readFileSync(sitemapScriptPath, "utf8");
  
  // Extract static URLs from the urls array
  const locRegex = /loc:\s*`\${BASE_URL}([^`]*)`/g;
  const paths = [];
  let match;
  while ((match = locRegex.exec(fileContent)) !== null) {
    paths.push(match[1]);
  }
  
  // Also parse dynamic SEO data if any
  const newSeoDataPath = path.join(DATA_DIR, "newSeoPagesData.json");
  if (fs.existsSync(newSeoDataPath)) {
    try {
      const rawData = fs.readFileSync(newSeoDataPath, "utf8");
      const parsedData = JSON.parse(rawData);
      Object.keys(parsedData).forEach(slug => {
        paths.push("/" + slug);
      });
    } catch (e) {
      console.error("Error reading newSeoPagesData.json:", e);
    }
  }
  
  return paths;
}

// 2. Load and categorize all pages
function auditPages() {
  const newSeoPagesDataPath = path.join(DATA_DIR, "newSeoPagesData.json");
  const seoLandingPagesDataPath = path.join(DATA_DIR, "seoLandingPagesData.ts");
  const cityPagesDataPath = path.join(DATA_DIR, "cityPagesData.ts");
  
  let newSeoPages = {};
  if (fs.existsSync(newSeoPagesDataPath)) {
    newSeoPages = JSON.parse(fs.readFileSync(newSeoPagesDataPath, "utf8"));
  }

  // Parse ts files to get key values using simple string parsing or JSON fallback if parsed
  // We'll write a simple regex parser or evaluator
  console.log(`ℹ️ newSeoPagesData.json has ${Object.keys(newSeoPages).length} entries.`);

  // Let's inspect the files in pages folder recursively
  const allPageFiles = [];
  function recReaddir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        recReaddir(full);
      } else if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
        allPageFiles.push(full);
      }
    });
  }
  recReaddir(PAGES_DIR);
  console.log(`ℹ️ Found ${allPageFiles.length} page component files.`);

  // Load sitemap paths
  const sitemapPaths = getSitemapPaths();
  console.log(`ℹ️ Found ${sitemapPaths.length} sitemap paths.`);

  // We want to find the exact pages, their metadata, structural elements, etc.
  // For dynamic pages from newSeoPagesData.json:
  // Each entry is a page.
  // For static pages: we can read their .tsx code or their data objects.
  
  // Let's parse all pages data into a unified array of audits
  const allAuditedPages = [];

  // Add all dynamic pages from newSeoPagesData.json
  for (const [slug, data] of Object.entries(newSeoPages)) {
    allAuditedPages.push({
      slug: "/" + slug,
      source: "newSeoPagesData.json",
      type: data.type || "unknown", // product, service, location
      title: data.seo?.title || "",
      description: data.seo?.description || "",
      canonical: data.seo?.canonical || "",
      h1: data.hero?.h1 || "",
      hasFaq: Array.isArray(data.faqs) && data.faqs.length > 0,
      hasInternalLinks: Array.isArray(data.internalLinks) && data.internalLinks.length > 0,
      internalLinksList: data.internalLinks || [],
      hasForm: true, // rendered via SeoLandingTemplate which uses RegistrationForm
      rawContent: JSON.stringify(data),
      originalData: data
    });
  }

  // Next, let's load seoLandingPagesData.ts and cityPagesData.ts to see what they contain
  const seoLandingPagesContent = fs.readFileSync(seoLandingPagesDataPath, "utf8");
  const cityPagesContent = fs.readFileSync(cityPagesDataPath, "utf8");

  // Wait, let's read the static page files themselves.
  // Many are simple wrappers like:
  // export default function HrPortal() { return <ProductPageTemplate data={seoLandingPagesData['hr-portal']} />; }
  // Let's audit static page components
  allPageFiles.forEach(filePath => {
    const relPath = path.relative(PAGES_DIR, filePath);
    const content = fs.readFileSync(filePath, "utf8");
    
    // Ignore layout wrappers, home pages, auth pages, utility pages
    const ignoreList = [
      "About.tsx", "Blog.tsx", "BlogDetail.tsx", "Careers.tsx", "CareerDetail.tsx", 
      "CaseStudies.tsx", "Contact.tsx", "Courses.tsx", "CourseDetail.tsx", "DummyHome.tsx",
      "GetConsultation.tsx", "GlobalPresence.tsx", "Home.tsx", "Home2.tsx", "Home2_Test.tsx",
      "Index.tsx", "Links.tsx", "MainLayout.tsx", "NewsletterDetail.tsx", "Newsletters.tsx",
      "NotFound.tsx", "NotFound.jsx", "OurProducts.tsx", "Privacy.tsx", "PrivacyPolicy.tsx",
      "ProjectDetail.tsx", "Projects.tsx", "Services.tsx", "TermsConditions.tsx", "ThankYou.tsx",
      "home2/", "compare/"
    ];
    
    if (ignoreList.some(ig => relPath.startsWith(ig))) {
      return; // Skip core / layout / home / non-SEO files
    }

    // Now, determine the slug and template used
    let slug = "";
    let template = "unknown";
    let dataKey = "";
    let pageType = "unknown";

    // Extract slug from route/file or component content
    // Usually slug is derived from file name or data object
    // If it uses ProductPageTemplate:
    if (content.includes("ProductPageTemplate")) {
      template = "ProductPageTemplate";
      const match = content.match(/seoLandingPagesData\['([^']+)'\]/);
      if (match) dataKey = match[1];
      slug = "/" + dataKey;
      pageType = "product";
    } else if (content.includes("LocalServicePage")) {
      template = "LocalServicePage";
      // Check cityPagesData or local config
      const match = content.match(/cityPagesData\['([^']+)'\]/);
      if (match) {
        dataKey = match[1];
        slug = "/" + dataKey;
      } else {
        // Look for PAGE object in the file
        const canonicalMatch = content.match(/canonical:\s*'([^']+)'/);
        if (canonicalMatch) {
          slug = new URL(canonicalMatch[1]).pathname;
        } else {
          slug = "/" + relPath.replace(/\.tsx$/, "").toLowerCase().replace(/\\/g, "/");
        }
      }
      pageType = "location";
    } else if (content.includes("ComparisonPageTemplate")) {
      template = "ComparisonPageTemplate";
      const match = content.match(/seoLandingPagesData\['([^']+)'\]/);
      if (match) dataKey = match[1];
      slug = "/" + dataKey;
      pageType = "compare";
    } else {
      // Just check if it has a canonical tag or title in metadata
      const canonicalMatch = content.match(/canonical:\s*'([^']+)'/);
      if (canonicalMatch) {
        slug = new URL(canonicalMatch[1]).pathname;
      } else {
        slug = "/" + relPath.replace(/\.tsx$/, "").toLowerCase().replace(/\\/g, "/");
      }
    }

    // Parse metadata from static PAGE object in file or key in data files
    let title = "";
    let description = "";
    let canonical = "";
    let h1 = "";
    let hasFaq = false;
    let hasInternalLinks = false;
    let hasForm = content.includes("RegistrationForm");
    let internalLinksList = [];

    // Attempt to extract metadata based on template/dataKey
    if (dataKey) {
      if (template === "ProductPageTemplate" || template === "ComparisonPageTemplate") {
        // Look up dataKey in seoLandingPagesData content (rough regex extraction)
        // Since parsing TS is hard, let's look for matching blocks or read the file
        // We'll read the PAGE object from the file itself if defined there
      }
    }

    // If PAGE is defined in the file
    if (content.includes("const PAGE")) {
      const titleMatch = content.match(/title:\s*'([^']+)'/);
      const descMatch = content.match(/description:\s*'([^']+)'/);
      const canonicalMatch = content.match(/canonical:\s*'([^']+)'/);
      const h1Match = content.match(/h1:\s*'([^']+)'/);
      
      if (titleMatch) title = titleMatch[1];
      if (descMatch) description = descMatch[1];
      if (canonicalMatch) canonical = canonicalMatch[1];
      if (h1Match) h1 = h1Match[1];

      hasFaq = content.includes("faqs:");
      hasInternalLinks = content.includes("relatedLinks:") || content.includes("internalLinks:");
      // For LocalServicePage:
      // Does it render a form?
      // No, LocalServicePage template itself does NOT import or render RegistrationForm (we checked!)
      hasForm = false;
    }

    allAuditedPages.push({
      slug,
      source: `src/pages/${relPath}`,
      template,
      type: pageType,
      title,
      description,
      canonical,
      h1,
      hasFaq,
      hasInternalLinks,
      internalLinksList,
      hasForm,
      rawContent: content
    });
  });

  // Let's parse competitor alternatives in `src/pages/compare` folder
  const compareDir = path.join(PAGES_DIR, "compare");
  if (fs.existsSync(compareDir)) {
    fs.readdirSync(compareDir).forEach(file => {
      if (file.endsWith(".tsx")) {
        const filePath = path.join(compareDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const match = content.match(/seoLandingPagesData\['([^']+)'\]/);
        const dataKey = match ? match[1] : "";
        const slug = "/" + dataKey;
        allAuditedPages.push({
          slug,
          source: `src/pages/compare/${file}`,
          template: "ComparisonPageTemplate",
          type: "compare",
          title: "",
          description: "",
          canonical: "",
          h1: "",
          hasFaq: true,
          hasInternalLinks: true,
          hasForm: false, // ComparisonPageTemplate does not have RegistrationForm
          rawContent: content
        });
      }
    });
  }

  // Let's parse city pages in `src/pages/city` folder
  const cityDir = path.join(PAGES_DIR, "city");
  if (fs.existsSync(cityDir)) {
    fs.readdirSync(cityDir).forEach(file => {
      if (file.endsWith(".tsx")) {
        const filePath = path.join(cityDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const match = content.match(/cityPagesData\['([^']+)'\]/);
        const dataKey = match ? match[1] : "";
        const slug = "/" + dataKey;
        allAuditedPages.push({
          slug,
          source: `src/pages/city/${file}`,
          template: "LocalServicePage",
          type: "location",
          title: "",
          description: "",
          canonical: "",
          h1: "",
          hasFaq: true,
          hasInternalLinks: true,
          hasForm: false, // LocalServicePage does not have RegistrationForm
          rawContent: content
        });
      }
    });
  }

  // Clean up duplicate audits (e.g. if the same slug was registered dynamically and statically)
  const uniqueAuditsMap = new Map();
  allAuditedPages.forEach(p => {
    if (!uniqueAuditsMap.has(p.slug)) {
      uniqueAuditsMap.set(p.slug, p);
    } else {
      // Merge or keep the more detailed one (usually the one from newSeoPagesData.json)
      const existing = uniqueAuditsMap.get(p.slug);
      if (p.source === "newSeoPagesData.json" || existing.title === "") {
        uniqueAuditsMap.set(p.slug, p);
      }
    }
  });

  const audits = Array.from(uniqueAuditsMap.values());
  return { audits, sitemapPaths };
}

// Run audit
const { audits, sitemapPaths } = auditPages();

// ─────────────────────────────────────────────────────────────────────────────
// AUDIT REPORT CALCULATIONS
// ─────────────────────────────────────────────────────────────────────────────

// 1. Total Indexable Pages
// Indexable pages are those listed in generate-sitemap.cjs (or static + dynamic SEO pages)
// Let's filter unique indexable routes
const indexableRoutes = Array.from(new Set(sitemapPaths));
const totalIndexable = indexableRoutes.length;

// 2. Categorization
let totalBusinessOS = 0;
let totalSocialSync = 0;
let totalLocation = 0;
const servicesCount = {}; // by service type

audits.forEach(p => {
  const slug = p.slug.toLowerCase();
  
  // Business OS: slug starts with /business-os or matches product names (hr-portal, hrms, payroll, attendance, leave, employee-management, employee-portal, crm, workforce, project-management)
  const isBOS = slug.includes("business-os") || [
    "/hr-portal", "/hrms-software-india", "/payroll-software-india", 
    "/attendance-management-system", "/leave-management-software", 
    "/employee-management-software", "/employee-portal", 
    "/workforce-management-software", "/project-management-software", 
    "/business-operating-system"
  ].includes(slug);

  // Social Sync: slug starts with /social-sync or contains social-media/instagram/linkedin/youtube/facebook/twitter/bulk-dm/auto-dm
  const isSS = slug.includes("social-sync") || slug.includes("social-media-management-tool") || slug.includes("social-media-scheduler") || slug.includes("social-media-tool-for-agencies") || slug.includes("social-media-tool-for-creators") || slug.includes("instagram-post-scheduler") || slug.includes("instagram-reels-scheduler") || slug.includes("facebook-post-scheduler") || slug.includes("linkedin-post-scheduler") || slug.includes("youtube-video-scheduler") || slug.includes("twitter-post-scheduler") || slug.includes("multi-brand-social-media-management") || slug.includes("social-media-client-management") || slug.includes("bulk-dm-tool") || slug.includes("auto-dm-tool") || slug.includes("social-media-content-planner") || slug.includes("social-media-approval-workflow");

  if (isBOS) {
    totalBusinessOS++;
  } else if (isSS) {
    totalSocialSync++;
  }

  // Location Pages: has city, local, or region patterns, or is in cityPagesData
  const isLoc = p.type === "location" || slug.includes("-in-") || slug.includes("-haryana") || slug.includes("-delhi") || slug.includes("-bangalore") || slug.includes("-mumbai") || slug.includes("-dubai") || slug.includes("-pune") || slug.includes("-hyderabad") || slug.includes("-noida") || slug.includes("-chandigarh") || slug.includes("-rohtak") || slug.includes("-faridabad") || slug.includes("-punjab") || slug.includes("-india") || slug.includes("-amritsar") || slug.includes("-ludhiana") || slug.includes("-jalandhar") || slug.includes("-panipat") || slug.includes("-sonipat") || slug.includes("-hisar") || slug.includes("-ambala") || slug.includes("-karnal") || slug.includes("-ghaziabad") || slug.includes("-greater-noida") || slug.includes("-london") || slug.includes("-usa") || slug.includes("-qatar") || slug.includes("-abu-dhabi");
  
  if (isLoc) {
    totalLocation++;
  }

  // Service Pages by Service Type
  // Services can be: web-development, app-development, digital-marketing, social-media, ads (Google/Meta), ai-automation, agentic-ai, seo
  if (p.type === "service" || (!isBOS && !isSS && !isLoc)) {
    let serviceType = "other";
    if (slug.includes("web-dev") || slug.includes("website-dev") || slug.includes("web-design") || slug.includes("shopify") || slug.includes("woocommerce") || slug.includes("ecommerce")) {
      serviceType = "Web Development";
    } else if (slug.includes("app-dev") || slug.includes("android") || slug.includes("ios") || slug.includes("flutter") || slug.includes("react-native")) {
      serviceType = "App Development";
    } else if (slug.includes("digital-marketing")) {
      serviceType = "Digital Marketing";
    } else if (slug.includes("social-media") || slug.includes("instagram-marketing") || slug.includes("smm")) {
      serviceType = "Social Media Marketing";
    } else if (slug.includes("google-ads") || slug.includes("ppc")) {
      serviceType = "Google Ads";
    } else if (slug.includes("meta-ads") || slug.includes("facebook-ads")) {
      serviceType = "Meta Ads";
    } else if (slug.includes("ai-video")) {
      serviceType = "AI Videos";
    } else if (slug.includes("agentic-ai") || slug.includes("ai-chatbot") || slug.includes("openai") || slug.includes("claude") || slug.includes("gemini") || slug.includes("mcp") || slug.includes("llm") || slug.includes("ai-solutions") || slug.includes("ai-automation") || slug.includes("ai-consulting")) {
      serviceType = "Agentic AI / AI Solutions";
    } else if (slug.includes("seo")) {
      serviceType = "SEO Services";
    } else if (slug.includes("crm") || slug.includes("erp") || slug.includes("workflow") || slug.includes("process-automation") || slug.includes("payroll-software-development") || slug.includes("hr-portal-development") || slug.includes("hr-software-development") || slug.includes("attendance-management-software-development")) {
      serviceType = "Custom Software / Enterprise Systems";
    } else if (p.type === "compare") {
      serviceType = "Competitor Alternatives";
    }
    servicesCount[serviceType] = (servicesCount[serviceType] || 0) + 1;
  }
});

// 3. Pages missing consultation form
// Form must be present. As analyzed:
// - Pages rendered via ProductPageTemplate, LocalServicePage, and ComparisonPageTemplate lack the real consultation form (it's either a redirect link or HTML form that doesn't post to backend).
// Let's filter audits that lack a real form.
const pagesMissingForm = audits.filter(p => !p.hasForm).map(p => p.slug);

// 4. Missing metadata elements
const pagesMissingMetadata = [];
const pagesMissingCanonical = [];
const pagesMissingH1 = [];
const pagesMissingFaq = [];
const pagesMissingInternalLinks = [];

audits.forEach(p => {
  if (p.source === "newSeoPagesData.json") {
    const d = p.originalData;
    if (!d.seo || !d.seo.title || !d.seo.description) pagesMissingMetadata.push(p.slug);
    if (!d.seo || !d.seo.canonical) pagesMissingCanonical.push(p.slug);
    if (!d.hero || !d.hero.h1) pagesMissingH1.push(p.slug);
    if (!d.faqs || d.faqs.length === 0) pagesMissingFaq.push(p.slug);
    if (!d.internalLinks || d.internalLinks.length === 0) pagesMissingInternalLinks.push(p.slug);
  } else {
    // For static pages, check the PAGE object parses
    if (!p.title || !p.description) pagesMissingMetadata.push(p.slug);
    if (!p.canonical) pagesMissingCanonical.push(p.slug);
    if (!p.h1) pagesMissingH1.push(p.slug);
    if (!p.hasFaq) pagesMissingFaq.push(p.slug);
    if (!p.hasInternalLinks) pagesMissingInternalLinks.push(p.slug);
  }
});

// 5. Duplicate or near-duplicate pages (check matching titles or meta descriptions)
const titleMap = new Map();
const descMap = new Map();
const duplicates = [];

audits.forEach(p => {
  if (p.title) {
    if (titleMap.has(p.title)) {
      duplicates.push({ slug1: p.slug, slug2: titleMap.get(p.title), type: "Duplicate Title", value: p.title });
    } else {
      titleMap.set(p.title, p.slug);
    }
  }
  if (p.description) {
    if (descMap.has(p.description)) {
      duplicates.push({ slug1: p.slug, slug2: descMap.get(p.description), type: "Duplicate Meta Description", value: p.description });
    } else {
      descMap.set(p.description, p.slug);
    }
  }
});

// 6. Broken internal links
// Check if the internal links in the data point to registered routes in sitemap or static pages
const allRoutes = new Set(sitemapPaths);
// Also add static routes that are indexable
const brokenLinks = [];
audits.forEach(p => {
  if (p.source === "newSeoPagesData.json") {
    const links = p.originalData.internalLinks || [];
    links.forEach(l => {
      const cleanHref = l.href.split("#")[0]; // remove hash anchor
      if (!allRoutes.has(cleanHref) && cleanHref !== "/" && !cleanHref.startsWith("http")) {
        brokenLinks.push({ page: p.slug, href: l.href, label: l.label });
      }
    });
  }
});

// 7. Social Sync pages that do not link to https://socialsync.avanienterprises.in
const socialSyncNotLinking = [];
audits.forEach(p => {
  const isSS = p.slug.includes("social-sync") || p.slug.includes("social-media-management-tool") || p.slug.includes("social-media-scheduler") || p.slug.includes("social-media-tool-for-agencies") || p.slug.includes("social-media-tool-for-creators") || p.slug.includes("instagram-post-scheduler") || p.slug.includes("instagram-reels-scheduler") || p.slug.includes("facebook-post-scheduler") || p.slug.includes("linkedin-post-scheduler") || p.slug.includes("youtube-video-scheduler") || p.slug.includes("twitter-post-scheduler") || p.slug.includes("multi-brand-social-media-management") || p.slug.includes("social-media-client-management") || p.slug.includes("bulk-dm-tool") || p.slug.includes("auto-dm-tool");
  
  if (isSS) {
    // Check if the raw data or page code links to https://socialsync.avanienterprises.in
    const hasSyncLink = p.rawContent.includes("https://socialsync.avanienterprises.in");
    if (!hasSyncLink) {
      socialSyncNotLinking.push(p.slug);
    }
  }
});

// 8. Pages missing from sitemap
const pagesMissingFromSitemap = [];
audits.forEach(p => {
  if (!allRoutes.has(p.slug)) {
    pagesMissingFromSitemap.push(p.slug);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// OUTPUT REPORT
// ─────────────────────────────────────────────────────────────────────────────

console.log("=== SEO AUDIT REPORT ===");
console.log(`- Total Indexable Pages in Sitemap: ${totalIndexable}`);
console.log(`- Total Audited Pages: ${audits.length}`);
console.log(`- Total Business OS Pages: ${totalBusinessOS}`);
console.log(`- Total Social Sync Pages: ${totalSocialSync}`);
console.log(`- Total Location Pages: ${totalLocation}\n`);

console.log("Services Count by Type:");
for (const [type, count] of Object.entries(servicesCount)) {
  console.log(`  • ${type}: ${count}`);
}
console.log("");

console.log(`- Pages missing consultation form: ${pagesMissingForm.length}`);
if (pagesMissingForm.length > 0) {
  console.log("  ⚠️  Notice: Static templates (ProductPageTemplate, LocalServicePage, ComparisonPageTemplate) lack the RegistrationForm component. This affects most static/city/compare/product pages.");
}
console.log("");

console.log(`- Pages missing metadata: ${pagesMissingMetadata.length}`);
console.log(`- Pages missing canonical: ${pagesMissingCanonical.length}`);
console.log(`- Pages missing H1: ${pagesMissingH1.length}`);
console.log(`- Pages missing FAQ: ${pagesMissingFaq.length}`);
console.log(`- Pages missing internal links: ${pagesMissingInternalLinks.length}`);
console.log("");

console.log(`- Duplicate or near-duplicate pages found: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log("  Examples:");
  duplicates.slice(0, 5).forEach(d => {
    console.log(`  • [${d.type}] between ${d.slug1} and ${d.slug2} (${d.value.substring(0, 60)}...)`);
  });
}
console.log("");

console.log(`- Broken internal links found: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  brokenLinks.slice(0, 10).forEach(l => {
    console.log(`  • Page ${l.page} links to non-existent route: "${l.href}" (label: "${l.label}")`);
  });
}
console.log("");

console.log(`- Social Sync pages not linking to socialsync subdomain: ${socialSyncNotLinking.length}`);
if (socialSyncNotLinking.length > 0) {
  socialSyncNotLinking.slice(0, 5).forEach(s => {
    console.log(`  • ${s}`);
  });
}
console.log("");

console.log(`- Pages missing from sitemap.xml: ${pagesMissingFromSitemap.length}`);
if (pagesMissingFromSitemap.length > 0) {
  pagesMissingFromSitemap.slice(0, 10).forEach(s => {
    console.log(`  • ${s}`);
  });
}
console.log("\n========================");
