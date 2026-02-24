import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Custom SEO Plugin for Local Development
const seoPlugin = () => ({
  name: 'seo-plugin',
  transformIndexHtml: async (html, ctx) => {
    const pagePath = ctx.path || "/";
    // Target local backend first, fallback to production
    const backendUrls = [
      "http://localhost:5000",
      "https://avani-enterprises-backend-1.onrender.com"
    ];
    
    let seo = null;
    for (const url of backendUrls) {
      try {
        console.log(`[SEO-Plugin] Fetching for ${pagePath} from ${url}`);
        const response = await fetch(`${url}/seo?page=${encodeURIComponent(pagePath)}`);
        if (response.ok) {
          const data = await response.json();
          seo = data.data;
          console.log(`[SEO-Plugin] ✅ SEO data received for ${pagePath}`);
          break;
        }
      } catch (e) {
        // Silently try next or fallback
      }
    }

    const title = seo?.title || "Avani Enterprises | Digital Marketing & Web Development Services";
    const description = seo?.metaDescription || "Transform your brand with Avani Enterprises.";
    const keywords = seo?.metaKeywords || "digital marketing, web development, SEO";

    return html
      .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/__SEO_TITLE__/g, title)
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g, keywords);
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    seoPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
