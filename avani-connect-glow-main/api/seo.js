import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    const pagePath = req.query.path || "/";
    const backendUrl = process.env.VITE_API_URL || "https://avani-enterprises.onrender.com";

    console.log(`🔍 Vercel SEO request for: ${pagePath}`);

    // 1. Fetch SEO from Render Backend
    let seo = null;
    try {
      console.log(`📡 Fetching SEO from: ${backendUrl}/seo?page=${pagePath}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for cold starts
      
      const response = await fetch(`${backendUrl}/seo?page=${encodeURIComponent(pagePath)}`, { 
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        seo = data.data;
        console.log(`✅ SEO data received for ${pagePath}`);
      } else {
        console.warn(`⚠️ Backend returned ${response.status} for ${pagePath}`);
      }
    } catch (e) {
      console.warn(`⚠️ Failed to fetch SEO for ${pagePath}:`, e.name === 'AbortError' ? 'Timeout' : e.message);
    }

    let html;

    // 2. Read the built template.html
    const pathsToTry = [
      path.join(process.cwd(), 'dist', 'template.html'),
      path.join(process.cwd(), 'template.html'),
      path.resolve(__dirname, '../dist/template.html'),
      path.resolve(__dirname, 'template.html')
    ];

    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        console.log(`✅ template.html found at: ${p}`);
        html = fs.readFileSync(p, 'utf8');
        break;
      }
    }

    if (!html) {
      return res.status(500).send(`SEO Error: template.html not found. Check build status.`);
    }

    // 3. Inject SEO data
    // DANGER: Only use simple global replacements to avoid mangling HTML
    const title = seo?.title || "Avani Enterprises | Digital Marketing & Web Development Services";
    const description = seo?.metaDescription || "Transform your brand with Avani Enterprises.";
    const keywords = seo?.metaKeywords || "digital marketing, web development, SEO";

    html = html
      .replace(/__SEO_TITLE__/g, title)
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g, keywords);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error("❌ Vercel SEO Error:", err);
    res.status(500).send("Internal Server Error");
  }
}
