import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useSeo } from "../contexts/SeoContext";

// ── Constants ─────────────────────────────────────────────────────────────────
const SITE_URL      = "https://www.avanienterprises.in";
const DEFAULT_IMAGE = `${SITE_URL}/logo0.webp`;
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
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`,
        "telephone": "+919253625099",
        "email": "kp@avanienterprises.in",
        "image": `${SITE_URL}/logo0.webp`,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "DLF Cyber City",
          "addressLocality": "Gurugram",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.4955,
          "longitude": 77.0888
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Haryana" },
          { "@type": "AdministrativeArea", "name": "Delhi" },
          { "@type": "City", "name": "Gurgaon" },
          { "@type": "City", "name": "Faridabad" },
          { "@type": "City", "name": "Rohtak" }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/avani-enterprises-india",
          "https://www.instagram.com/avani_enterprises_india/",
          "https://twitter.com/AvaniEnterprises"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "6"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Principal, Indus Public School" },
            "datePublished": "2026-01-15",
            "reviewBody": "Avani Enterprises delivered an outstanding website that perfectly captures our school's vision and values. The design is modern, intuitive, and makes it easy for parents and students to find information.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Vikram Sharma" },
            "datePublished": "2026-02-10",
            "reviewBody": "The e-commerce platform developed by Avani Enterprises transformed our business completely. Online sales increased by 250% in just 3 months. The website is fast, user-friendly, and our customers love the shopping experience.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Sanjay Vats" },
            "datePublished": "2026-02-28",
            "reviewBody": "Working with Avani Enterprises was a game-changer for our startup. They built a sophisticated platform that handles complex policy management with ease. The UI/UX is exceptional, and their technical expertise is top-notch.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Amit Kapoor" },
            "datePublished": "2026-03-05",
            "reviewBody": "The team created a stunning website that perfectly showcases our nutrition products. The e-commerce integration is seamless, and we've seen a 180% increase in online orders. Their attention to detail and customer service is outstanding!",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Aman Sharma" },
            "datePublished": "2026-03-12",
            "reviewBody": "We're thrilled with the elegant website that beautifully represents our luxury properties. The design is sophisticated, the property listings are easy to manage, and our clients love the virtual tour feature. Excellent work!",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Dr. Mohit Verma" },
            "datePublished": "2026-03-20",
            "reviewBody": "The hospital management portal developed by Avani Enterprises has streamlined our operations significantly. Patient appointment booking is now effortless, and the admin panel is incredibly user-friendly. A truly professional solution!",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          }
        ]
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person/kapilkhandelwal`,
        "name": "Kapil Khandelwal",
        "jobTitle": "Founder & CEO",
        "worksFor": {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`
        },
        "sameAs": [
          "https://www.linkedin.com/in/kapil-khandelwal-avani/"
        ]
      }
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
      {/* Canonical is injected once, per-route, by the server (api/seo.js into
          template.html). We intentionally do NOT render it here to avoid a
          duplicate <link rel="canonical"> tag. */}

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
