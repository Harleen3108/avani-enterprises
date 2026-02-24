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

    let html;
    // 2. Read template.html
    const p = path.join(process.cwd(), 'dist', 'template.html');
    if (fs.existsSync(p)) {
      html = fs.readFileSync(p, 'utf8');
    } else {
      const p2 = path.join(process.cwd(), 'template.html');
      if (fs.existsSync(p2)) html = fs.readFileSync(p2, 'utf8');
    }

    if (!html) return res.status(500).send("Error: template.html not found");

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
