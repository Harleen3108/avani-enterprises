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
      "http://localhost:5001",
      "https://avani-enterprises.onrender.com"
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

    const title = seo?.title || "Build high-performing Solutions & accelerate Growth.";
    const description = seo?.metaDescription || "No.1 Digital Marketing Agency in India, we deliver result-driven SEO, PPC, social media, and branding solutions.";
    const keywords = seo?.metaKeywords || "digital marketing agency, seo services india, avani enterprises";

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
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return;
          if (id.includes("html2canvas")) return "html2canvas";
          if (id.includes("recharts") || id.includes("/d3-")) return "charts";
          if (id.includes("gsap")) return "gsap";
          if (id.includes("framer-motion")) return "framer-motion";
          if (id.includes("lucide-react")) return "lucide-react";
          if (id.includes("@radix-ui")) return "radix-ui";
          if (id.includes("react-dom") || id.includes("react-router") || id.includes("react/")) return "react-core";
          return "vendor";
        },
      },
    },
  },
}));
