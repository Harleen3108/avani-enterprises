import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Custom SEO Plugin for Local Development
const seoPlugin = () => ({
  name: 'seo-plugin',
  transformIndexHtml: async (html: string, ctx: any) => {
    const pagePath = ctx.path || "/";
    const normalizedPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;

    // Target local backend first, fallback to production
    const backendUrls = [
      "http://localhost:5000",
      "https://avani-enterprises-backend-1.onrender.com"
    ];
    
    let seo: any = null;
    for (const url of backendUrls) {
      try {
        console.log(`[SEO-Plugin] Fetching for ${normalizedPath} from ${url}`);
        const response = await fetch(`${url}/seo?page=${encodeURIComponent(normalizedPath)}`);
        if (response.ok) {
          const data = await response.json() as any;
          seo = data.data;
          console.log(`[SEO-Plugin] ✅ SEO data received for ${normalizedPath}`);
          break;
        }
      } catch (e) {
        // Silently try next or fallback
      }
    }

    const title = seo?.title || "Avani Enterprises | Digital Marketing & Web Development Services";
    const description = seo?.metaDescription || "Transform your brand with Avani Enterprises.";
    const keywords = seo?.metaKeywords || "digital marketing, web development, SEO";

    let transformed = html
      .replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/__SEO_TITLE__/g, title)
      .replace(/__SEO_DESCRIPTION__/g, description)
      .replace(/__SEO_KEYWORDS__/g, keywords);

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
      transformed = transformed.replace(regex, `$1"${val}"`);
    });

    return transformed;
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
