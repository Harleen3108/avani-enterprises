// This function will be deployed on Vercel as a Serverless Function
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const pagePath = req.query.path || "/";
    const backendUrl = process.env.VITE_API_URL || "https://avani-enterprises.onrender.com";

    console.log(`🔍 Vercel SEO request for: ${pagePath}`);

    // 1. Fetch SEO from Render Backend
    let seo = null;
    try {
      console.log(`📡 Fetching SEO from: ${backendUrl}/seo?page=${pagePath}`);
      const response = await axios.get(`${backendUrl}/seo`, { 
        params: { page: pagePath },
        timeout: 5000 // 5 second timeout to prevent Vercel function kill
      });
      seo = response.data.data;
      console.log(`✅ SEO data received for ${pagePath}`);
    } catch (e) {
      console.warn(`⚠️ Failed to fetch SEO for ${pagePath}:`, e.message);
    }

    let html;

    // 2. Read the built template.html from Vite's output
    // Try multiple possible locations on Vercel
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
      console.error("❌ template.html NOT found in any known locations:", pathsToTry);
      return res.status(500).send(`SEO Error: template.html not found. Locations tried: ${pathsToTry.join(', ')}`);
    }

    // 3. Inject SEO data
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
};
