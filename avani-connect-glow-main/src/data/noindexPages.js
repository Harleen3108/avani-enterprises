/**
 * noindexPages.js — the de-index list for avanienterprises.in
 *
 * WHY
 * ---
 * The site published the same ~8 services cloned across ~40 cities, states and
 * countries. Google treats that pattern as doorway pages and demotes the whole
 * site, which is why pages here sit in "Crawled – currently not indexed".
 *
 * The slugs below are the clones for places Avani has no office and no genuine
 * delivery presence. They stay live and reachable — ads and direct traffic still
 * work — but they carry robots "noindex,follow" and are dropped from the sitemap,
 * so Google stops counting them against site quality. "follow" is deliberate:
 * link equity still flows through to the pages we keep.
 *
 * KEPT ON PURPOSE (do not add to this list)
 * -----------------------------------------
 *   Office:   Gurugram (the only confirmed premises — see offices.js)
 *   Sell-only: Noida, Rohtak, Mumbai, Dubai (kept as organic markets, no
 *             address, no map and no LocalBusiness schema)
 *   NCR belt: Delhi, Greater Noida, Faridabad, Ghaziabad, Haryana
 *   Metros:   Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur
 *   Intl:     UAE, Singapore, USA
 *   National: /...-india
 * These get real, differentiated content from serviceContent.js instead.
 *
 * TO REVERSE any entry: delete its line and redeploy. To disable the whole
 * mechanism, set NOINDEX_ENABLED to false.
 *
 * Consumed by api/seo.js (robots meta + X-Robots-Tag header) and
 * generate-sitemap.cjs (sitemap filtering) so the two can never drift.
 */

/* DATA-START */

const NOINDEX_ENABLED = true;

// Doorway clones for places with no Avani presence. 142 slugs.
const NOINDEX_SLUGS = [
  // amritsar (8)
  "agentic-ai-development-company-amritsar",
  "ai-video-services-amritsar",
  "digital-marketing-agency-amritsar",
  "google-ads-agency-amritsar",
  "meta-ads-agency-amritsar",
  "mobile-app-development-company-amritsar",
  "social-media-marketing-agency-amritsar",
  "web-development-company-amritsar",

  // australia (8)
  "agentic-ai-development-company-australia",
  "ai-video-services-australia",
  "digital-marketing-agency-australia",
  "google-ads-agency-australia",
  "meta-ads-agency-australia",
  "mobile-app-development-company-australia",
  "social-media-marketing-agency-australia",
  "web-development-company-australia",

  // canada (8)
  "agentic-ai-development-company-canada",
  "ai-video-services-canada",
  "digital-marketing-agency-canada",
  "google-ads-agency-canada",
  "meta-ads-agency-canada",
  "mobile-app-development-company-canada",
  "social-media-marketing-agency-canada",
  "web-development-company-canada",

  // jalandhar (8)
  "agentic-ai-development-company-jalandhar",
  "ai-video-services-jalandhar",
  "digital-marketing-agency-jalandhar",
  "google-ads-agency-jalandhar",
  "meta-ads-agency-jalandhar",
  "mobile-app-development-company-jalandhar",
  "social-media-marketing-agency-jalandhar",
  "web-development-company-jalandhar",

  // kanpur (8)
  "agentic-ai-development-company-kanpur",
  "ai-video-services-kanpur",
  "digital-marketing-agency-kanpur",
  "google-ads-agency-kanpur",
  "meta-ads-agency-kanpur",
  "mobile-app-development-company-kanpur",
  "social-media-marketing-agency-kanpur",
  "web-development-company-kanpur",

  // lucknow (8)
  "agentic-ai-development-company-lucknow",
  "ai-video-services-lucknow",
  "digital-marketing-agency-lucknow",
  "google-ads-agency-lucknow",
  "meta-ads-agency-lucknow",
  "mobile-app-development-company-lucknow",
  "social-media-marketing-agency-lucknow",
  "web-development-company-lucknow",

  // ludhiana (8)
  "agentic-ai-development-company-ludhiana",
  "ai-video-services-ludhiana",
  "digital-marketing-agency-ludhiana",
  "google-ads-agency-ludhiana",
  "meta-ads-agency-ludhiana",
  "mobile-app-development-company-ludhiana",
  "social-media-marketing-agency-ludhiana",
  "web-development-company-ludhiana",

  // north-india (8)
  "agentic-ai-development-company-north-india",
  "ai-video-services-north-india",
  "digital-marketing-agency-north-india",
  "google-ads-agency-north-india",
  "meta-ads-agency-north-india",
  "mobile-app-development-company-north-india",
  "social-media-marketing-agency-north-india",
  "web-development-company-north-india",

  // punjab (8)
  "agentic-ai-development-company-punjab",
  "ai-video-services-punjab",
  "digital-marketing-agency-punjab",
  "google-ads-agency-punjab",
  "meta-ads-agency-punjab",
  "mobile-app-development-company-punjab",
  "social-media-marketing-agency-punjab",
  "web-development-company-punjab",

  // rajasthan (8)
  "agentic-ai-development-company-rajasthan",
  "ai-video-services-rajasthan",
  "digital-marketing-agency-rajasthan",
  "google-ads-agency-rajasthan",
  "meta-ads-agency-rajasthan",
  "mobile-app-development-company-rajasthan",
  "social-media-marketing-agency-rajasthan",
  "web-development-company-rajasthan",

  // singapore (8)
  "agentic-ai-development-company-singapore",
  "ai-video-services-singapore",
  "digital-marketing-agency-singapore",
  "google-ads-agency-singapore",
  "meta-ads-agency-singapore",
  "mobile-app-development-company-singapore",
  "social-media-marketing-agency-singapore",
  "web-development-company-singapore",

  // uae (8)
  "agentic-ai-development-company-uae",
  "ai-video-services-uae",
  "digital-marketing-agency-uae",
  "google-ads-agency-uae",
  "meta-ads-agency-uae",
  "mobile-app-development-company-uae",
  "social-media-marketing-agency-uae",
  "web-development-company-uae",

  // udaipur (8)
  "agentic-ai-development-company-udaipur",
  "ai-video-services-udaipur",
  "digital-marketing-agency-udaipur",
  "google-ads-agency-udaipur",
  "meta-ads-agency-udaipur",
  "mobile-app-development-company-udaipur",
  "social-media-marketing-agency-udaipur",
  "web-development-company-udaipur",

  // uk (8)
  "agentic-ai-development-company-uk",
  "ai-video-services-uk",
  "digital-marketing-agency-uk",
  "google-ads-agency-uk",
  "meta-ads-agency-uk",
  "mobile-app-development-company-uk",
  "social-media-marketing-agency-uk",
  "web-development-company-uk",

  // usa (8)
  "agentic-ai-development-company-usa",
  "ai-video-services-usa",
  "digital-marketing-agency-usa",
  "google-ads-agency-usa",
  "meta-ads-agency-usa",
  "mobile-app-development-company-usa",
  "social-media-marketing-agency-usa",
  "web-development-company-usa",

  // uttar-pradesh (8)
  "agentic-ai-development-company-uttar-pradesh",
  "ai-video-services-uttar-pradesh",
  "digital-marketing-agency-uttar-pradesh",
  "google-ads-agency-uttar-pradesh",
  "meta-ads-agency-uttar-pradesh",
  "mobile-app-development-company-uttar-pradesh",
  "social-media-marketing-agency-uttar-pradesh",
  "web-development-company-uttar-pradesh",

  // varanasi (8)
  "agentic-ai-development-company-varanasi",
  "ai-video-services-varanasi",
  "digital-marketing-agency-varanasi",
  "google-ads-agency-varanasi",
  "meta-ads-agency-varanasi",
  "mobile-app-development-company-varanasi",
  "social-media-marketing-agency-varanasi",
  "web-development-company-varanasi",

  // dubai (3)
  "digital-marketing-company-dubai",
  "seo-company-dubai",
  "web-development-company-dubai",

  // abu-dhabi (1)
  "web-development-company-abu-dhabi",

  // london (1)
  "web-development-company-london",

  // qatar (1)
  "web-development-company-qatar",
];

// Utility and campaign routes with no search intent. These were previously
// hard-coded inside api/seo.js; centralised here so there is one source of truth.
// Blog posts under ~900 words. They cannot reach the 1,200-word bar for
// editorial content without padding, and a thin post is a liability on a site
// recovering from a content-quality demotion. They stay live for direct and
// social traffic; deepen one and remove its line to bring it back.
const NOINDEX_THIN_BLOG = [
  "blog/building-scalable-cms-with-appsmith",
  "blog/meta-ads-checklist-converting-social-campaigns",
  "blog/ai-videos-business-social-engagement",
  "blog/custom-web-development-vs-templates-guide",
  "blog/agentic-ai-business-process-workflow-automation",
  "blog/b2b-digital-marketing-high-value-lead-gen",
  "blog/instagram-scheduling-reels-auto-dm-guide",
  "blog/app-development-flutter-vs-react-native",
  "blog/boost-ecommerce-instagram-bulk-auto-dm",
  "blog/linkedin-scheduling-founders-brand-authority",
  "blog/employee-management-software-remote-teams",
  "blog/agentic-ai-customer-support-autonomous-reps",
  "blog/social-media-management-for-agencies-guide",
  "blog/google-ads-local-business-roi-guide",
  "blog/geofenced-attendance-management-system",
  "blog/operations-architecture-resilient-business-os",
  "blog/reducing-cac-programmatic-seo-traffic-scale",
  "blog/how-social-media-scheduling-saves-hours",
  "blog/implement-kpis-okrs-performance-guide",
  "blog/leave-management-guide-policy-design",
  "blog/salary-slip-components-deductions-guide",
  "blog/employee-hr-portal-benefits",
  "blog/complete-guide-automated-payroll-sme",
  "blog/best-hrms-software-for-startups",
  "blog/digital-transformation-guide-modern-businesses",
  "blog/power-of-business-consulting-expert-guidance",
  "blog/viral-memes-vs-brand-marketing",
  "blog/digital-transformation-indian-businesses-avani",
  "blog/how-to-generate-salary-slips-in-bulk",
  "blog/how-to-create-employee-kpi-report",
  "blog/business-loans-comprehensive-guide-financing-growth",
  "blog/scaling-businesses-with-seo-and-ai",
  "blog/digital-marketing-growth-story",
  "blog/android-god-mode-malware-india-business-safety",
];

const NOINDEX_UTILITY = [
  'thank-you',
  'links',
  'admin',
  'not-found',
  'get-consultation',
  'business-setup',
  'businesssetup1',
  'businesssetup2',
  'businesssetup3',
  'salary-hike-calculator',
  'social-media-content-planner',
  'auto-dm-tool',
  'bulk-dm-tool',
  'instagram-reels-scheduler',
];

// Any path starting with one of these is never indexed.
const NOINDEX_PREFIXES = ['/home2/', '/api/', '/newsletters/', '/courses/'];

/**
 * Newsletters that earn their place in the index despite the blanket
 * /newsletters/ rule above.
 *
 * The prefix rule exists because most editions are short — of nineteen
 * published, two are under 40 words and eight are under 300. Blanket-indexing
 * them is the kind of thin-page volume that caused the original demotion.
 *
 * These four clear 400 words of real content, so noindexing them wastes
 * material that can rank. Measured, not guessed:
 *   1102w  top-ai-trends-every-business-should-watch-in-2026
 *    514w  not-all-business-is-good-business
 *    498w  google-ai-overview
 *    422w  3x-more-client-same-budget-smarter-strategy
 *
 * Several sit at 373-394 words, one short section away from qualifying. Extend
 * those and add them here — re-measure with:
 *   node scripts/fixNewsletterSlugs.js
 *
 * Slugs are the post-slugify canonical ones; the old title-as-slug URLs 301 to
 * these, so only one form is ever indexable.
 */
const NEWSLETTER_INDEXABLE = [
  'top-ai-trends-every-business-should-watch-in-2026',
  'not-all-business-is-good-business',
  'google-ai-overview',
  '3x-more-client-same-budget-smarter-strategy',
];

const NEWSLETTER_INDEXABLE_SET = new Set(
  NEWSLETTER_INDEXABLE.map((s) => '/newsletters/' + String(s).replace(/^\/+/, '').toLowerCase())
);

const NOINDEX_SET = new Set(
  NOINDEX_SLUGS.concat(NOINDEX_THIN_BLOG, NOINDEX_UTILITY).map((s) => '/' + String(s).replace(/^\/+/, '').replace(/\/+$/, ''))
);

/** True when the path must carry robots "noindex" and stay out of the sitemap. */
function isNoindexed(pathname) {
  if (!NOINDEX_ENABLED) return false;
  const p = String(pathname || '/').toLowerCase().split('?')[0].split('#')[0];
  const clean = p.replace(/\/+$/, '') || '/';
  // Checked before the prefix rule, so an allowlisted newsletter escapes it.
  if (NEWSLETTER_INDEXABLE_SET.has(clean)) return false;
  if (NOINDEX_SET.has(clean)) return true;
  return NOINDEX_PREFIXES.some((prefix) => clean.startsWith(prefix));
}

/* DATA-END */

export { NOINDEX_ENABLED, NOINDEX_SLUGS, NOINDEX_THIN_BLOG, NOINDEX_UTILITY, NOINDEX_PREFIXES, NEWSLETTER_INDEXABLE, isNoindexed };
