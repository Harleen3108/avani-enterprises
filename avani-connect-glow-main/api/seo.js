import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Configuration ─────────────────────────────────────────────────────────────
const SITE_URL    = "https://www.avanienterprises.in";
const BACKEND_URL = "https://avani-enterprises-backend-1.onrender.com";

// Routes that must never be indexed by search engines
// (utility / auth / internal pages that have no search intent)
const NOINDEX_PATHS = new Set([
  "/thank-you",
  "/links",
  "/admin",
  "/business-setup",
  "/businesssetup1",
  "/not-found",
  "/get-consultation",
]);

// Prefix-based noindex (any path starting with these segments)
const NOINDEX_PREFIXES = ["/home2/", "/api/"];

function isNoIndex(pagePath) {
  if (NOINDEX_PATHS.has(pagePath)) return true;
  return NOINDEX_PREFIXES.some((prefix) => pagePath.startsWith(prefix));
}

// Build the canonical URL for a given path
function buildCanonical(pagePath) {
  const cleanPath = pagePath === "/" ? "" : pagePath.replace(/\/$/, "");
  return `${SITE_URL}${cleanPath}`;
}

export default async function handler(req, res) {
  try {
    const pagePath = req.query.path || "/";
    const normalizedPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;

    // ── 1. Fetch SEO from backend ───────────────────────────────────────────
    let seo = null;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const fetchUrl = `${BACKEND_URL}/seo?page=${encodeURIComponent(normalizedPath)}`;
      const response = await fetch(fetchUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        seo = data.data;
      }
    } catch (e) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        console.error(`❌ SEO fetch timed out for ${normalizedPath}`);
      } else {
        console.error(`❌ Failed to fetch SEO for ${normalizedPath}:`, e.message);
      }
    }

    // ── 2. Read template.html ───────────────────────────────────────────────
    let html;
    const pathsToTry = [
      path.join(process.cwd(), 'dist', 'template.html'),
      path.join(process.cwd(), 'template.html'),
      path.resolve(__dirname, '..', 'dist', 'template.html'),
      path.resolve(__dirname, '..', 'template.html'),
      path.join(__dirname, 'template.html'),
      '/var/task/dist/template.html',
      '/var/task/template.html'
    ];

    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        html = fs.readFileSync(p, 'utf8');
        break;
      }
    }

    if (!html) {
      let debugStr = `template.html not found. paths tried: ${pathsToTry.join(', ')}\n`;
      try {
        debugStr += `CWD (${process.cwd()}) files: ${fs.readdirSync(process.cwd()).join(', ')}\n`;
        debugStr += `__dirname (${__dirname}) files: ${fs.readdirSync(__dirname).join(', ')}\n`;
        debugStr += `Root (/var/task) files: ${fs.readdirSync('/var/task').join(', ')}\n`;
      } catch (e) {
        debugStr += `List error: ${e.message}`;
      }
      return res.status(500).send(`Error: ${debugStr}`);
    }

    // ── 3. Compute SEO values ───────────────────────────────────────────────
    const title       = seo?.title            || "Avani Enterprises : No.1 Digital Marketing Agency in India";
    const description = seo?.metaDescription  || "No.1 Digital Marketing Agency in India, we deliver result-driven SEO, PPC, social media, and branding solutions.";
    const keywords    = seo?.metaKeywords     || "digital marketing agency in india, seo services india, social media marketing, performance marketing company, lead generation services";
    const canonical   = seo?.canonicalUrl     || buildCanonical(normalizedPath);
    const robots      = isNoIndex(normalizedPath) ? "noindex,nofollow" : (seo?.robots || "index,follow");
    const ogImage     = seo?.ogImage          || `${SITE_URL}/logo0.jpg`;

    // ── 4. Inject into HTML (server-side, visible to Googlebot on first crawl) ─
    html = html
      // Title
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/__SEO_TITLE__/g,       title)
      // Description + keywords
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g,    keywords)
      // Canonical + robots
      .replace(/__SEO_CANONICAL__/g,   canonical)
      .replace(/__SEO_ROBOTS__/g,      robots)
      // OG image (ensure absolute URL)
      .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/gi, `$1${ogImage}$2`)
      // Twitter image (ensure absolute URL)
      .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/gi, `$1${ogImage}$2`);

    // Attribute-based meta replacements (content=)
    const metas = [
      { id: 'description',         val: description },
      { id: 'og:description',      val: description },
      { id: 'twitter:description', val: description },
      { id: 'keywords',            val: keywords    },
      { id: 'og:title',            val: title       },
      { id: 'twitter:title',       val: title       },
      { id: 'og:url',              val: canonical   },
      { id: 'robots',              val: robots      },
    ];

    metas.forEach(({ id, val }) => {
      const regex = new RegExp(`(<meta\\s+[^>]*?(?:name|property)=["']${id}["'][^>]*?\\s+content=)["'].*?["']`, 'gi');
      html = html.replace(regex, `$1"${val}"`);
    });

    // ── 5. noindex: also set X-Robots-Tag HTTP header for Googlebot ────────
    if (isNoIndex(normalizedPath)) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error("❌ Vercel SEO Error:", err);
    res.status(500).send("Internal Server Error");
  }
}
