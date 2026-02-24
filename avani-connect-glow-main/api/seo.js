import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    const pagePath = req.query.path || "/";
    const normalizedPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
    
    // FORCE the production URL to ensure consistency
    const backendUrl = "https://avani-enterprises-backend-1.onrender.com";

    // 1. Fetch SEO from Render Backend
    let seo = null;
    try {
      const fetchUrl = `${backendUrl}/seo?page=${encodeURIComponent(normalizedPath)}`;
      const response = await fetch(fetchUrl);
      if (response.ok) {
        const data = await response.json();
        seo = data.data;
      }
    } catch (e) {
      console.error(`❌ Failed to fetch SEO for ${normalizedPath}:`, e.message);
    }

    let html;
    // 2. Read template.html using very robust paths
    const pathsToTry = [
      path.join(process.cwd(), 'dist', 'template.html'),
      path.join(process.cwd(), 'template.html'),
      path.join(__dirname, '../dist/template.html'),
      path.join(__dirname, 'template.html'),
      path.join(__dirname, 'dist/template.html')
    ];

    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        html = fs.readFileSync(p, 'utf8');
        break;
      }
    }

    if (!html) {
      // Fallback: try to find ANYTHING that looks like index.html or template.html
      console.error("Critical: template.html not found in searched paths.");
      return res.status(500).send("Error: template.html not found. Please redeploy.");
    }

    // 3. Inject SEO data
    const title = seo?.title || "Avani Enterprises | Digital Marketing & Web Development Services";
    const description = seo?.metaDescription || "Transform your brand with Avani Enterprises.";
    const keywords = seo?.metaKeywords || "digital marketing, web development, SEO";

    // Robust replacement strategy - handle newlines in tags
    html = html
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/__SEO_TITLE__/g, title)
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g, keywords);

    // Replace other meta tags if they exist
    const metas = [
      { id: 'description', val: description },
      { id: 'og:description', val: description },
      { id: 'twitter:description', val: description },
      { id: 'keywords', val: keywords },
      { id: 'og:title', val: title },
      { id: 'twitter:title', val: title }
    ];

    metas.forEach(({ id, val }) => {
      const regex = new RegExp(`(<meta\\s+[^>]*?(?:name|property)=["']${id}["'][^>]*?\\s+content=)["'].*?["']`, 'gi');
      html = html.replace(regex, `$1"${val}"`);
    });

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error("❌ Vercel SEO Error:", err);
    res.status(500).send("Internal Server Error");
  }
}
