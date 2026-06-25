// scripts/audit-seo-pages.cjs
const fs = require("fs");
const path = require("path");

const FRONTEND_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(FRONTEND_DIR, "src", "data");
const PAGES_DIR = path.join(FRONTEND_DIR, "src", "pages");

const newSeoPagesDataPath = path.join(DATA_DIR, "newSeoPagesData.json");
const seoLandingPagesDataPath = path.join(DATA_DIR, "seoLandingPagesData.ts");
const cityPagesDataPath = path.join(DATA_DIR, "cityPagesData.ts");

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
  if (fs.existsSync(newSeoPagesDataPath)) {
    try {
      const rawData = fs.readFileSync(newSeoPagesDataPath, "utf8");
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
  let newSeoPages = {};
  if (fs.existsSync(newSeoPagesDataPath)) {
    newSeoPages = JSON.parse(fs.readFileSync(newSeoPagesDataPath, "utf8"));
  }

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

  // Next, parse static page components
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
      "home2/"
    ];
    
    if (ignoreList.some(ig => relPath.startsWith(ig))) {
      return; // Skip core / layout / home / non-SEO files
    }

    // Now, determine the slug and template used
    let slug = "";
    let template = "unknown";
    let dataKey = "";
    let pageType = "unknown";

    if (content.includes("ProductPageTemplate")) {
      template = "ProductPageTemplate";
      const match = content.match(/seoLandingPagesData\['([^']+)'\]/);
      if (match) dataKey = match[1];
      slug = "/" + dataKey;
      pageType = "product";
    } else if (content.includes("LocalServicePage")) {
      template = "LocalServicePage";
      const match = content.match(/cityPagesData\['([^']+)'\]/);
      if (match) {
        dataKey = match[1];
        slug = "/" + dataKey;
      } else {
        const canonicalMatch = content.match(/canonical:\s*'([^']+)'/) || content.match(/canonical:\s*"([^"]+)"/);
        if (canonicalMatch) {
          try {
            slug = new URL(canonicalMatch[1]).pathname;
          } catch(e) {
            slug = canonicalMatch[1].replace("https://www.avanienterprises.in", "");
          }
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
      const canonicalMatch = content.match(/canonical:\s*'([^']+)'/) || content.match(/canonical:\s*"([^"]+)"/);
      if (canonicalMatch) {
        try {
          slug = new URL(canonicalMatch[1]).pathname;
        } catch(e) {
          slug = canonicalMatch[1].replace("https://www.avanienterprises.in", "");
        }
      } else {
        slug = "/" + relPath.replace(/\.tsx$/, "").toLowerCase().replace(/\\/g, "/");
      }
    }

    // Parse metadata
    let title = "";
    let description = "";
    let canonical = "";
    let h1 = "";
    let hasFaq = false;
    let hasInternalLinks = false;
    let hasForm = content.includes("RegistrationForm");
    let internalLinksList = [];

    // Attempt to extract title/desc if inline PAGE definition exists
    const titleMatch = content.match(/title:\s*'([^']+)'/) || content.match(/title:\s*"([^"]+)"/);
    const descMatch = content.match(/description:\s*'([^']+)'/) || content.match(/description:\s*"([^"]+)"/);
    const canonicalMatch = content.match(/canonical:\s*'([^']+)'/) || content.match(/canonical:\s*"([^"]+)"/);
    const h1Match = content.match(/h1:\s*'([^']+)'/) || content.match(/h1:\s*"([^"]+)"/);
    
    if (titleMatch) title = titleMatch[1];
    if (descMatch) description = descMatch[1];
    if (canonicalMatch) canonical = canonicalMatch[1];
    if (h1Match) h1 = h1Match[1];

    hasFaq = content.includes("faqs") || content.includes("faqLd");
    hasInternalLinks = content.includes("relatedLinks") || content.includes("internalLinks") || content.includes("RelatedLinksSection");

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

  // Clean up duplicate audits
  const uniqueAuditsMap = new Map();
  allAuditedPages.forEach(p => {
    if (!uniqueAuditsMap.has(p.slug)) {
      uniqueAuditsMap.set(p.slug, p);
    } else {
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

// Calculations
const indexableRoutes = Array.from(new Set(sitemapPaths));
const totalIndexable = indexableRoutes.length;

let totalBusinessOS = 0;
let totalSocialSync = 0;
let totalLocation = 0;
const servicesCount = {};

audits.forEach(p => {
  const slug = p.slug.toLowerCase();
  
  const isBOS = slug.includes("business-os") || [
    "/hr-portal", "/hrms-software-india", "/payroll-software-india", 
    "/attendance-management-system", "/leave-management-software", 
    "/employee-management-software", "/employee-portal", 
    "/workforce-management-software", "/project-management-software", 
    "/business-operating-system"
  ].includes(slug);

  const isSS = slug.includes("social-sync") || slug.includes("social-media-management-tool") || slug.includes("social-media-scheduler") || slug.includes("social-media-tool-for-agencies") || slug.includes("social-media-tool-for-creators") || slug.includes("instagram-post-scheduler") || slug.includes("instagram-reels-scheduler") || slug.includes("facebook-post-scheduler") || slug.includes("linkedin-post-scheduler") || slug.includes("youtube-video-scheduler") || slug.includes("twitter-post-scheduler") || slug.includes("multi-brand-social-media-management") || slug.includes("social-media-client-management") || slug.includes("bulk-dm-tool") || slug.includes("auto-dm-tool") || slug.includes("social-media-content-planner") || slug.includes("social-media-approval-workflow");

  if (isBOS) {
    totalBusinessOS++;
  } else if (isSS) {
    totalSocialSync++;
  }

  const isLoc = p.type === "location" || slug.includes("-in-") || slug.includes("-haryana") || slug.includes("-delhi") || slug.includes("-bangalore") || slug.includes("-mumbai") || slug.includes("-dubai") || slug.includes("-pune") || slug.includes("-hyderabad") || slug.includes("-noida") || slug.includes("-chandigarh") || slug.includes("-rohtak") || slug.includes("-faridabad") || slug.includes("-punjab") || slug.includes("-india") || slug.includes("-amritsar") || slug.includes("-ludhiana") || slug.includes("-jalandhar") || slug.includes("-panipat") || slug.includes("-sonipat") || slug.includes("-hisar") || slug.includes("-ambala") || slug.includes("-karnal") || slug.includes("-ghaziabad") || slug.includes("-greater-noida") || slug.includes("-london") || slug.includes("-usa") || slug.includes("-qatar") || slug.includes("-abu-dhabi") || [
    "/rohtak", "/gurgaon", "/faridabad", "/delhi"
  ].includes(slug);
  
  if (isLoc) {
    totalLocation++;
  }

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

// Missing form
const pagesMissingForm = audits.filter(p => !p.hasForm).map(p => p.slug);

// Missing SEO structure
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
  }
});

// Simple check for duplicate pages by title or description
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

// Broken internal links
const allRoutes = new Set(sitemapPaths);
const brokenLinks = [];
audits.forEach(p => {
  if (p.source === "newSeoPagesData.json") {
    const links = p.originalData.internalLinks || [];
    links.forEach(l => {
      const cleanHref = l.href.split("#")[0];
      if (!allRoutes.has(cleanHref) && cleanHref !== "/" && !cleanHref.startsWith("http") && !cleanHref.includes("mailto:") && !cleanHref.includes("tel:")) {
        brokenLinks.push({ page: p.slug, href: l.href, label: l.label });
      }
    });
  }
});

// Social Sync not linking
const socialSyncNotLinking = [];
audits.forEach(p => {
  const slug = p.slug.toLowerCase();
  const isSS = slug.includes("social-sync") || slug.includes("social-media-management-tool") || slug.includes("social-media-scheduler") || slug.includes("social-media-tool-for-agencies") || slug.includes("social-media-tool-for-creators") || slug.includes("instagram-post-scheduler") || slug.includes("instagram-reels-scheduler") || slug.includes("facebook-post-scheduler") || slug.includes("linkedin-post-scheduler") || slug.includes("youtube-video-scheduler") || slug.includes("twitter-post-scheduler") || slug.includes("multi-brand-social-media-management") || slug.includes("social-media-client-management") || slug.includes("bulk-dm-tool") || slug.includes("auto-dm-tool");
  
  if (isSS) {
    const hasSyncLink = p.rawContent.includes("https://socialsync.avanienterprises.in");
    if (!hasSyncLink) {
      socialSyncNotLinking.push(p.slug);
    }
  }
});

// Missing from sitemap
const pagesMissingFromSitemap = [];
audits.forEach(p => {
  if (!allRoutes.has(p.slug)) {
    pagesMissingFromSitemap.push(p.slug);
  }
});

// Print JSON report for easy parsing by parent agent
const report = {
  totalIndexable,
  totalAudited: audits.length,
  totalBusinessOS,
  totalSocialSync,
  totalLocation,
  servicesCount,
  pagesMissingForm,
  pagesMissingMetadataCount: pagesMissingMetadata.length,
  pagesMissingMetadataList: pagesMissingMetadata,
  pagesMissingCanonicalCount: pagesMissingCanonical.length,
  pagesMissingH1Count: pagesMissingH1.length,
  pagesMissingFaqCount: pagesMissingFaq.length,
  pagesMissingInternalLinksCount: pagesMissingInternalLinks.length,
  duplicates,
  brokenLinks,
  socialSyncNotLinking,
  pagesMissingFromSitemap
};

console.log("JSON_REPORT_START");
console.log(JSON.stringify(report, null, 2));
console.log("JSON_REPORT_END");
