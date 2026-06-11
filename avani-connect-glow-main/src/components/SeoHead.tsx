import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useSeo } from "../contexts/SeoContext";

// ── Constants ─────────────────────────────────────────────────────────────────
const SITE_URL      = "https://www.avanienterprises.in";
const DEFAULT_IMAGE = `${SITE_URL}/logo0.jpg`;
const SITE_NAME     = "Avani Enterprises";
const TWITTER_HANDLE = "@AvaniEnterprises";

/**
 * Routes that must never be indexed.
 * Matches exact paths. Prefix-matching via NOINDEX_PREFIXES below.
 */
const NOINDEX_PATHS = new Set([
  "/thank-you",
  "/links",
  "/admin",
  "/business-setup",
  "/businesssetup1",
  "/not-found",
  "/get-consultation",
]);
const NOINDEX_PREFIXES = ["/home2/", "/api/"];

function isNoIndex(pathname: string): boolean {
  const p = pathname.toLowerCase();
  if (NOINDEX_PATHS.has(p)) return true;
  return NOINDEX_PREFIXES.some((prefix) => p.startsWith(prefix));
}

/** Returns the canonical URL for the current path. */
function buildCanonical(pathname: string): string {
  const clean = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  return `${SITE_URL}${clean}`;
}

/**
 * Generates Organisation + WebSite JSON-LD (sitewide).
 * Page-level schemas (BreadcrumbList, FAQPage, Article) are
 * added per-page in Phase 2.
 */
function buildSitewideLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo.png`,
          "width": 512,
          "height": 512,
        },
        "sameAs": [
          "https://www.linkedin.com/company/avani-enterprises-india",
          "https://www.instagram.com/avani_enterprises_india/",
          "https://twitter.com/AvaniEnterprises",
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "English",
        },
        "description":
          "Avani Enterprises — India's leading digital marketing and web development agency helping businesses scale with AI-driven SEO, paid media, and custom software.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": SITE_NAME,
        "url": SITE_URL,
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function SeoHead() {
  const { seo } = useSeo();
  const { pathname } = useLocation();

  const noIndex   = isNoIndex(pathname);
  const canonical = seo?.canonicalUrl || buildCanonical(pathname);
  const robots    = noIndex ? "noindex,nofollow" : (seo?.robots || "index,follow");
  const ogImage   = seo?.ogImage || DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* ── Robots ──────────────────────────────────────────────────────── */}
      <meta name="robots" content={robots} />
      {noIndex && <meta name="googlebot" content="noindex,nofollow" />}

      {/* ── Canonical ───────────────────────────────────────────────────── */}
      <link rel="canonical" href={canonical} />

      {/* ── Primary SEO ─────────────────────────────────────────────────── */}
      {seo?.title           && <title>{seo.title}</title>}
      {seo?.metaDescription && <meta name="description"  content={seo.metaDescription} />}
      {seo?.metaKeywords    && <meta name="keywords"     content={seo.metaKeywords}    />}
      {seo?.seoHeading      && <meta name="seo-heading"  content={seo.seoHeading}      />}

      {/* ── Open Graph ──────────────────────────────────────────────────── */}
      <meta property="og:type"        content="website"   />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_IN"     />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={ogImage}   />
      <meta property="og:image:width" content="1200"      />
      <meta property="og:image:height"content="630"       />
      {seo?.title           && <meta property="og:title"       content={seo.title}           />}
      {seo?.metaDescription && <meta property="og:description" content={seo.metaDescription} />}

      {/* ── Twitter Card ────────────────────────────────────────────────── */}
      <meta name="twitter:card"  content="summary_large_image" />
      <meta name="twitter:site"  content={TWITTER_HANDLE}      />
      <meta name="twitter:image" content={ogImage}             />
      {seo?.title           && <meta name="twitter:title"       content={seo.title}           />}
      {seo?.metaDescription && <meta name="twitter:description" content={seo.metaDescription} />}

      {/* ── Structured Data: Organisation + WebSite (sitewide) ──────────── */}
      {!noIndex && (
        <script type="application/ld+json">{buildSitewideLd()}</script>
      )}

      {/* ── Page-level structured data from backend (BreadcrumbList, FAQ) ─ */}
      {seo?.structuredData && (
        <script type="application/ld+json">
          {typeof seo.structuredData === "string"
            ? seo.structuredData
            : JSON.stringify(seo.structuredData)}
        </script>
      )}
    </Helmet>
  );
}
