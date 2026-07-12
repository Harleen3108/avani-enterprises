import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useSeo } from "../contexts/SeoContext";

// ── Constants ─────────────────────────────────────────────────────────────────
const SITE_URL       = "https://www.avanienterprises.in";
const DEFAULT_IMAGE  = `${SITE_URL}/logo0.webp`;
const DEFAULT_ALT    = "Avani Enterprises — Digital Marketing & Web Development Agency in India";
const SITE_NAME      = "Avani Enterprises";
const TWITTER_HANDLE = "@AvaniEnterprises";
const DEFAULT_AUTHOR = "Avani Enterprises";

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

// ── Component ─────────────────────────────────────────────────────────────────
export default function SeoHead() {
  const { seo } = useSeo();
  const { pathname } = useLocation();

  const noIndex   = isNoIndex(pathname);
  const canonical = seo?.canonicalUrl || buildCanonical(pathname);
  const robots    = noIndex ? "noindex,nofollow" : (seo?.robots || "index,follow");
  const ogImage   = seo?.ogImage || DEFAULT_IMAGE;
  const ogImageAlt = (seo as any)?.ogImageAlt || DEFAULT_ALT;
  const author    = (seo as any)?.author || DEFAULT_AUTHOR;

  return (
    <Helmet>
      {/* ── Robots ──────────────────────────────────────────────────────── */}
      <meta name="robots" content={robots} />
      {noIndex && <meta name="googlebot" content="noindex,nofollow" />}

      {/* ── Canonical ───────────────────────────────────────────────────── */}
      {/* Rendered here so it updates correctly on every SPA navigation.
          The server (api/seo.js) also injects it for the initial HTML crawl.
          React Helmet Async deduplicates link[rel=canonical] automatically. */}
      <link rel="canonical" href={canonical} />

      {/* ── Primary SEO ─────────────────────────────────────────────────── */}
      {seo?.title           && <title>{seo.title}</title>}
      {seo?.metaDescription && <meta name="description"  content={seo.metaDescription} />}
      {seo?.metaKeywords    && <meta name="keywords"     content={seo.metaKeywords}    />}
      <meta name="author" content={author} />

      {/* ── Open Graph ──────────────────────────────────────────────────── */}
      <meta property="og:type"         content="website"   />
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:locale"       content="en_IN"     />
      <meta property="og:url"          content={canonical} />
      <meta property="og:image"        content={ogImage}   />
      <meta property="og:image:width"  content="1200"      />
      <meta property="og:image:height" content="630"       />
      <meta property="og:image:alt"    content={ogImageAlt} />
      {seo?.title           && <meta property="og:title"       content={seo.title}           />}
      {seo?.metaDescription && <meta property="og:description" content={seo.metaDescription} />}

      {/* ── Twitter Card ────────────────────────────────────────────────── */}
      <meta name="twitter:card"      content="summary_large_image" />
      <meta name="twitter:site"      content={TWITTER_HANDLE}      />
      <meta name="twitter:creator"   content={TWITTER_HANDLE}      />
      <meta name="twitter:image"     content={ogImage}             />
      <meta name="twitter:image:alt" content={ogImageAlt}          />
      {seo?.title           && <meta name="twitter:title"       content={seo.title}           />}
      {seo?.metaDescription && <meta name="twitter:description" content={seo.metaDescription} />}

      {/* ── Page-level structured data from backend (BreadcrumbList, FAQ, Service, Article) ─ */}
      {/* NOTE: Sitewide schema (Organization, WebSite, LocalBusiness, Person) is in       */}
      {/*       index.html as a static <script> — do NOT duplicate it here.               */}
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
