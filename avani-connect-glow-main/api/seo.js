// Data modules live in ../seo-lib/, NOT in api/. Vercel turns every file in
// api/ into its own Serverless Function, and the Hobby plan allows 12. These
// twelve are plain data — only seo.js is an endpoint — so keeping them here
// spent the entire quota and the 13th file failed the deploy outright.
// Vercel traces these imports and bundles them into this function.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { newSeoData } from '../seo-lib/newSeoData.js';
// Generated at prebuild from src/data/ — see generate-sitemap.cjs.
// Copies live in api/ so the Vercel function bundle is guaranteed to contain them.
import { resolvePage, uniqueBlock, pageDescription, pageTitle, aiSummary, fitDescription, STATIC_PAGES, canonicalSlugFor } from '../seo-lib/serviceContent.js';
import { redirectTarget } from '../seo-lib/pageRedirects.js';
import { isNoindexed } from '../seo-lib/noindexPages.js';
import { isValidRoute } from '../seo-lib/validRoutes.js';
import { ssrContent } from '../seo-lib/ssrContent.js';
import { NAP, officeFor, formatAddress, mapLinkUrl, localBusinessSchema } from '../seo-lib/offices.js';
import { comparisonFor } from '../seo-lib/comparisons.js';
import { GUIDES } from '../seo-lib/guides.js';
import { blogContent } from '../seo-lib/blogContent.js';
import { formatBlogBody, PROSE_CSS } from '../seo-lib/blogFormat.js';
import { cleanBlogSlug, storedBlogSlug, needsRedirect } from '../seo-lib/blogSlugRedirects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL    = "https://www.avanienterprises.in";

// This pointed at avani-enterprises-backend-1.onrender.com, which returns 503 —
// the frontend (src/lib/api.ts) uses avani-enterprises.onrender.com, which is
// live. Every server-rendered request was therefore making a doomed round trip
// and silently falling back, so CMS-managed SEO overrides never applied.
const BACKEND_URL = process.env.BACKEND_URL || "https://avani-enterprises.onrender.com";

// Short by design. The page already has complete local meta and content, so the
// backend is an override, not a dependency. An 8s timeout meant one slow
// backend response could add 8 seconds to TTFB for Googlebot; failing fast and
// using local data is strictly better.
const SEO_FETCH_TIMEOUT_MS = Number(process.env.SEO_FETCH_TIMEOUT_MS || 1500);

// Noindex rules (doorway clones + utility routes) live in src/data/noindexPages.js
// so the sitemap generator and this function can never disagree about what is
// indexable. `isNoindexed` already covers the utility paths this file used to
// hard-code.
function isNoIndex(pagePath) {
  return isNoindexed(pagePath);
}

// Build the canonical URL for a given path.
//
// Self-referential by default. For the handful of URLs that are genuine synonyms
// of another page (CANONICAL_MAP in serviceContent.js), this points at the
// primary instead — that is the fix for the duplicate service variants that were
// competing with each other for the same query and splitting link equity.
function buildCanonical(pagePath) {
  if (pagePath === "/") return SITE_URL;

  // The blog filter has a crawlable URL (/blog/category/<slug>); the ?category=
  // query form canonicalises to it so the two never compete.
  if (pagePath.toLowerCase().startsWith("/blog/category/")) {
    return `${SITE_URL}${pagePath.replace(/\/+$/, "")}`;
  }

  // Blog posts canonicalise to their clean slug, so the messy original never
  // becomes the indexed URL even if something links to it.
  if (pagePath.toLowerCase().startsWith('/blog/')) {
    const seg = pagePath.slice(6);
    let decoded = seg;
    try { decoded = decodeURIComponent(seg); } catch { /* malformed escape */ }
    return `${SITE_URL}/blog/${encodeURIComponent(cleanBlogSlug(decoded))}`;
  }

  const target = canonicalSlugFor(pagePath);
  return `${SITE_URL}/${target}`;
}

const STATIC_SEO_LOOKUP = {
  // Batch B (12 city pages)
  "/seo-company-mumbai": {
    title: "SEO Company in Mumbai | Avani Enterprises",
    description: "Avani Enterprises is an SEO company in Mumbai driving compounding organic traffic for BKC, Lower Parel & Andheri businesses. A disciplined technical-SEO process, 8+ years. Get a free SEO audit.",
    keywords: "seo company mumbai, seo services mumbai, seo agency mumbai, local seo mumbai, search engine optimization mumbai, google ranking company mumbai, ecommerce seo mumbai"
  },
  "/seo-company-bangalore": {
    title: "SEO Company in Bangalore | Avani Enterprises",
    description: "Avani Enterprises is an SEO company in Bangalore (Bengaluru) driving compounding organic traffic for startups, SaaS & D2C brands. A disciplined technical-SEO process. Get a free SEO audit.",
    keywords: "seo company bangalore, seo services bengaluru, seo agency bangalore, local seo bangalore, technical seo bangalore, saas seo bengaluru, organic growth bangalore"
  },
  "/digital-marketing-company-mumbai": {
    title: "Digital Marketing Company in Mumbai | Avani Enterprises",
    description: "Avani Enterprises is a performance-driven digital marketing company in Mumbai delivering SEO, Google & Meta ads, and social media that grow leads. Get a free audit.",
    keywords: "digital marketing company mumbai, digital marketing agency mumbai, performance marketing mumbai, social media marketing mumbai, seo company mumbai, google ads agency mumbai, ppc mumbai, digital marketing services mumbai"
  },
  "/digital-marketing-company-bangalore": {
    title: "Digital Marketing Company in Bangalore | Avani Enterprises",
    description: "Avani Enterprises is a performance-driven digital marketing company in Bangalore delivering SEO, Google Ads & PPC that grow qualified leads. Get a free audit today.",
    keywords: "digital marketing company bangalore, digital marketing agency bengaluru, performance marketing bangalore, ppc bangalore, seo company bangalore, google ads agency bangalore, social media marketing bengaluru"
  },
  "/digital-marketing-company-chandigarh": {
    title: "Digital Marketing Company in Chandigarh \u2014 Avani Enterprises",
    description: "Avani Enterprises is a results-driven digital marketing company in Chandigarh delivering SEO, Google Ads, Meta Ads & social media for tricity brands. Book a free strategy call in 24 hrs.",
    keywords: "digital marketing company chandigarh, digital marketing agency chandigarh, social media marketing chandigarh, ppc chandigarh, seo company chandigarh, google ads chandigarh, digital marketing services chandigarh"
  },
  "/web-development-company-dubai": {
    title: "Web Development Company in Dubai | Avani Enterprises",
    description: "Web development company serving Dubai \u2014 fast, bilingual, SEO-ready websites & ecommerce stores for free-zone, real estate, retail & hospitality brands. Free quote in 24 hrs.",
    keywords: "web development company dubai, website development dubai, web design dubai, ecommerce development dubai, web developers dubai, custom website dubai, website company dubai, ecommerce website dubai"
  },
  "/web-development-company-abu-dhabi": {
    title: "Web Development Company in Abu Dhabi | Avani Enterprises",
    description: "Avani Enterprises builds fast, bilingual websites & ecommerce stores for Abu Dhabi businesses across real estate, trading, hospitality & services. Get a free quote today.",
    keywords: "web development company abu dhabi, website development abu dhabi, web design abu dhabi, ecommerce abu dhabi, website designer abu dhabi, web development agency abu dhabi, business website abu dhabi"
  },
  "/web-development-company-qatar": {
    title: "Web Development Company in Qatar | Avani Enterprises",
    description: "Avani Enterprises builds fast, bilingual Arabic-English websites and ecommerce stores for Qatar and Doha businesses. 300+ projects, 8+ years. Get a free quote.",
    keywords: "web development company qatar, website development doha, web design qatar, ecommerce development qatar, web developers doha, arabic website qatar, business website qatar, qatar web agency"
  },
  "/seo-company-dubai": {
    title: "SEO Company in Dubai | Rank Higher \u2014 Avani Enterprises",
    description: "Avani Enterprises is a results-driven SEO company in Dubai. We grow organic traffic 3x for Business Bay, DIFC & Dubai Marina brands. Get a free SEO audit today.",
    keywords: "seo company dubai, seo services dubai, seo agency dubai, local seo dubai, best seo company dubai, search engine optimization dubai, google ranking dubai, seo experts uae"
  },
  "/digital-marketing-company-dubai": {
    title: "Digital Marketing Company in Dubai \u2014 Avani Enterprises",
    description: "Avani Enterprises is a performance-driven digital marketing company serving Dubai \u2014 SEO, Google Ads, Meta & social media for real estate, retail & DIFC brands. Free audit in 24 hrs.",
    keywords: "digital marketing company dubai, digital marketing agency dubai, performance marketing dubai, social media marketing dubai, seo company dubai, ppc agency dubai, google ads dubai"
  },
  "/web-development-company-london": {
    title: "Web Development Company in London | Avani Enterprises",
    description: "Avani Enterprises builds fast, custom websites and ecommerce stores for London businesses. 300+ projects, 8+ years. Get a free quote today.",
    keywords: "web development company london, website development london, web design london, ecommerce development london, custom website london, web developer london, react development london"
  },
  "/web-development-company-usa": {
    title: "Web Development Company in USA | Avani Enterprises",
    description: "Avani Enterprises builds fast, SEO-ready websites & ecommerce stores for USA businesses \u2014 offshore web development from India at startup-friendly rates. Free quote in 24 hrs.",
    keywords: "web development company usa, website development usa, offshore web development usa, ecommerce development usa, web developers usa, custom website development usa, react development company usa"
  },
  // Batch A (35 service-cluster pages)
  "/website-development-company": {
    title: "Website Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is a website development company in India building fast, responsive, lead-focused business websites on flexible CMS platforms. Get a free quote today.",
    keywords: "website development company, website developer, professional website development, business website development india, corporate website development, cms website development, responsive website company"
  },
  "/full-stack-development-company": {
    title: "Full Stack Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is a full stack development company in India. One team owns frontend + backend on MERN/MEAN \u2014 300+ projects, 8+ years. Get a free quote.",
    keywords: "full stack development company, full stack developers, mern stack development, end to end web development india, mean stack development, full stack web development company"
  },
  "/shopify-development-company": {
    title: "Shopify Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is a Shopify development company in India building custom Liquid themes, private apps & zero-downtime migrations for scaling D2C brands. 300+ projects, 8+ years. Get a free quote.",
    keywords: "shopify development company, shopify developer, shopify store setup, shopify theme development india, shopify plus development, shopify app development, shopify migration"
  },
  "/woocommerce-development-company": {
    title: "WooCommerce Development Company in India | Avani",
    description: "Avani Enterprises is a WooCommerce development company in India building fast WordPress stores, custom plugins & smooth payments. 300+ projects. Get a free quote.",
    keywords: "woocommerce development company, woocommerce developer, wordpress ecommerce development india, custom woocommerce plugins, woocommerce store development, woocommerce speed optimisation"
  },
  "/custom-ecommerce-development": {
    title: "Custom Ecommerce Development India | Avani Enterprises",
    description: "Custom and headless ecommerce development in India for brands outgrowing templates. Bespoke platforms built to scale. 300+ projects, 8+ years. Get a free quote.",
    keywords: "custom ecommerce development, headless ecommerce development, bespoke ecommerce platform india, custom ecommerce india, composable commerce, headless commerce development"
  },
  "/custom-crm-development": {
    title: "Custom CRM Development in India | Avani Enterprises",
    description: "Custom CRM development built to your exact sales process. Own your data and roadmap, no per-seat fees or feature bloat. 8+ years, 300+ projects. Book a free demo.",
    keywords: "custom crm development, bespoke crm software, tailored crm system india, custom crm software development, sales process crm, crm development company india"
  },
  "/crm-software-development": {
    title: "CRM Software Development in India | Avani Enterprises",
    description: "Avani Enterprises builds custom CRM software with sales pipelines, automation, dashboards & integrations. 300+ projects, 8+ years. Book a free CRM scoping call.",
    keywords: "crm software development, crm software development company, sales crm software india, custom crm build, crm automation, pipeline management software, crm dashboards, crm integrations"
  },
  "/crm-consulting-company": {
    title: "CRM Consulting Company in India | Avani Enterprises",
    description: "Vendor-neutral CRM consulting company in India: CRM strategy, selection, implementation, migration, and adoption. 8+ years, 150+ clients. Book a free consult.",
    keywords: "crm consulting company, crm consultant, crm implementation services, crm strategy india, crm migration services, crm adoption consulting, crm selection consultant"
  },
  "/erp-development-company": {
    title: "ERP Development Company in India | Avani Enterprises",
    description: "Custom ERP development company unifying finance, inventory, operations & reporting on one platform. 8+ years, 300+ projects, 5.0 rated. Book a free ERP demo.",
    keywords: "erp development company, custom erp development company, erp solutions india, erp software development, custom erp india, enterprise resource planning company"
  },
  "/custom-erp-development": {
    title: "Custom ERP Development in India | Avani Enterprises",
    description: "Custom ERP development in India by Avani Enterprises. Bespoke ERP modules mapped to your real operations, not rigid suites. 300+ projects, 8+ years. Get a free ERP scoping call.",
    keywords: "custom erp development, bespoke erp software, tailored erp modules india, erp development company, custom erp software, erp module development, enterprise resource planning software, erp implementation india"
  },
  "/erp-software-development-company": {
    title: "ERP Software Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an ERP software development company in India building modular, integrated ERP with role-based access. 300+ projects, 8+ years. Get a free demo.",
    keywords: "erp software development company, erp software development, enterprise resource planning software india, custom erp development, erp modules, erp system integration"
  },
  "/hrms-development-company": {
    title: "HRMS Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an HRMS development company in India building custom HR management systems: onboarding, attendance, payroll, and performance in one platform. Book a demo.",
    keywords: "hrms development company, hrms software development, hr management system development india, custom hrms software, payroll software development, attendance management system"
  },
  "/hr-software-development-company": {
    title: "HR Software Development Company India | Avani Enterprises",
    description: "Avani Enterprises is an HR software development company building custom HR software in India around your policies, payroll, and workflows. Fully owned, integrated. Get a quote.",
    keywords: "hr software development company, hr software development, custom hr software india, hrms development, payroll software development, bespoke hr software, hr management system development"
  },
  "/attendance-management-software-development": {
    title: "Attendance Management Software Development in India | Avani Enterprises",
    description: "Avani Enterprises builds custom attendance management software in India with biometric, geo-fenced, and shift-based tracking. Leave, payroll-ready, owned by you. Get a quote.",
    keywords: "attendance management software development, attendance system development, biometric attendance software india, geo attendance tracking, shift management software, leave management system, employee attendance app"
  },
  "/payroll-software-development": {
    title: "Payroll Software Development in India | Avani Enterprises",
    description: "Avani Enterprises builds custom payroll software for India with automated PF, ESI, TDS compliance and instant payslips. 8+ years. Get a quote today.",
    keywords: "payroll software development, payroll software development company, custom payroll system india, pf esi tds payroll software, automated payslip software, statutory compliance payroll, payroll automation india"
  },
  "/business-operating-system-development": {
    title: "Business Operating System Development India | Avani Enterprises",
    description: "Replace scattered CRM, HR, ops & project tools with one connected business operating system. Built in India by Avani Enterprises. Book a free consultation.",
    keywords: "business operating system development, business os development, unified business software india, custom business operating system, connected crm hr ops platform, internal business software development"
  },
  "/workflow-automation-software-development": {
    title: "Workflow Automation Software Development in India | Avani",
    description: "Avani Enterprises is a workflow automation company building custom software to automate approvals, data entry, routing and reporting across your tools. Book a free workflow audit.",
    keywords: "workflow automation software development, workflow automation company, process automation software india, custom workflow automation, approval automation software, business workflow automation"
  },
  "/ai-development-company": {
    title: "AI Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is a custom AI development company in India building ML models, AI products, and integrations from strategy to deployment. Book a free AI scoping call.",
    keywords: "ai development company, artificial intelligence development company, custom ai development india, machine learning development company, ai product development, ml model development, ai engineering services, ai software development india"
  },
  "/ai-chatbot-development": {
    title: "AI Chatbot Development in India | Avani Enterprises",
    description: "Avani Enterprises builds AI chatbots and WhatsApp automation that handle support and qualify leads 24/7. 8+ years, 150+ clients. Book a free chatbot demo.",
    keywords: "ai chatbot development, chatbot development company, whatsapp chatbot development india, ai chatbot company, customer support chatbot, lead qualification chatbot"
  },
  "/openai-development-company": {
    title: "OpenAI Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an OpenAI development company building GPT apps, OpenAI API integrations & ChatGPT assistants for Indian business. Book a free scoping call.",
    keywords: "openai development company, gpt development, openai api integration, chatgpt app development india, gpt powered apps, ai assistant development, openai integration company"
  },
  "/claude-ai-development": {
    title: "Claude AI Development in India | Avani Enterprises",
    description: "Avani Enterprises builds Claude AI apps and assistants on Anthropic Claude for reliable, safe AI, with full Claude API integration across India. Book a free AI consult.",
    keywords: "claude ai development, anthropic claude development, claude api integration india, claude ai app development, claude assistant development, claude ai agency india, anthropic api development"
  },
  "/gemini-ai-development": {
    title: "Gemini AI Development in India | Avani Enterprises",
    description: "Avani Enterprises builds Google Gemini-powered multimodal apps and Gemini API integrations for text, image, audio, and video in India. Book a free Gemini scoping call.",
    keywords: "gemini ai development, google gemini development, gemini api integration india, gemini multimodal app development, gemini pro development, gemini flash integration, gemini ai company india"
  },
  "/mcp-development-company": {
    title: "MCP Development Company in India | Avani Enterprises",
    description: "Avani Enterprises builds Model Context Protocol (MCP) servers that connect AI to your tools and data securely. 8+ years, 300+ projects. Book a free MCP scoping call.",
    keywords: "mcp development company, model context protocol development, mcp server development india, mcp integration services, ai tool integration, custom mcp server, llm data connectors"
  },
  "/llm-development-company": {
    title: "LLM Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an LLM development company building RAG apps, fine-tuned models, and production LLM systems with real evaluation. Book a free LLM scoping call.",
    keywords: "llm development company, llm app development, rag development, llm fine tuning india, llm integration services, production llm deployment, custom llm solutions, ai chatbot llm"
  },
  "/ai-consulting-company": {
    title: "AI Consulting Company in India | Avani Enterprises",
    description: "Avani Enterprises is an AI consulting company building AI strategy, roadmaps, and use-case discovery that turn AI into ROI. Book a free AI strategy call today.",
    keywords: "ai consulting company, ai consultant, ai strategy consulting, ai advisory india, ai roadmap consulting, ai use case discovery, enterprise ai consulting"
  },
  "/android-app-development-company": {
    title: "Android App Development Company in India | Avani",
    description: "Avani Enterprises builds native Android apps in Kotlin \u2014 fast, secure, Play Store-ready. 8+ years, 300+ projects. Get a free Android app quote.",
    keywords: "android app development company, android app developer, android application development india, kotlin app development, native android development, play store app launch, android development company gurgaon"
  },
  "/ios-app-development-company": {
    title: "iOS App Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an iOS app development company in India building native Swift iPhone apps with polished UX and smooth App Store launches. Get a free quote today.",
    keywords: "ios app development company, iphone app development, ios app developer india, native swift app development, app store launch, swift app development company, ipad app development"
  },
  "/flutter-app-development-company": {
    title: "Flutter App Development Company in India | Avani",
    description: "Avani Enterprises is a Flutter app development company in India building one codebase for iOS + Android. Faster launches, lower cost. Get a free quote today.",
    keywords: "flutter app development company, flutter developer, cross platform app development india, flutter app development india, hire flutter developer, flutter ios android app, flutter mobile app company"
  },
  "/react-native-development-company": {
    title: "React Native Development Company India | Avani Enterprises",
    description: "Avani Enterprises is a React Native development company in India building cross-platform apps with near-native performance from one codebase. 300+ projects, 8+ years. Get a quote.",
    keywords: "react native development company, react native app development, cross platform app india, react native developers, react native app development company, hire react native developers"
  },
  "/seo-services": {
    title: "SEO Services in India | Full-Stack SEO | Avani Enterprises",
    description: "Avani Enterprises offers complete SEO services in India: audit, technical, on-page, content & link building. 8+ years, 150+ clients. Get your free SEO audit today.",
    keywords: "seo services, seo services company, search engine optimization services india, technical seo services, on-page seo, link building services, seo audit india, content seo"
  },
  "/enterprise-seo-services": {
    title: "Enterprise SEO Services in India | Avani Enterprises",
    description: "Enterprise SEO services for large-scale sites: site architecture, template optimisation, programmatic SEO, and governance. Scale rankings across thousands of URLs. Get a free audit.",
    keywords: "enterprise seo services, enterprise seo company, large scale seo india, programmatic seo, technical seo at scale, enterprise seo agency, site architecture seo, seo governance"
  },
  "/ecommerce-seo-services": {
    title: "Ecommerce SEO Services in India | Avani Enterprises",
    description: "Avani Enterprises is an ecommerce SEO company growing organic store sales through category and product page SEO that lowers CAC. Get your free ecommerce SEO audit.",
    keywords: "ecommerce seo services, ecommerce seo company, product page seo, online store seo india, category page seo, ecommerce seo agency, shopify seo, woocommerce seo"
  },
  "/performance-marketing-agency": {
    title: "Performance Marketing Agency in India | Avani Enterprises",
    description: "Avani Enterprises is a ROI-driven performance marketing agency running paid search and social built around conversions and CAC, not clicks. Get a free growth audit.",
    keywords: "performance marketing agency, performance marketing company, roi driven marketing india, paid acquisition agency, paid media agency, ppc and social agency, growth marketing agency india"
  },
  "/facebook-ads-agency": {
    title: "Facebook Ads Agency in India | Avani Enterprises",
    description: "Avani Enterprises is a Facebook ads agency in India running lead-gen and ecommerce campaigns engineered for strong, profitable ROAS. Book a free strategy call today.",
    keywords: "facebook ads agency, facebook advertising agency, facebook ads management india, facebook lead generation, ecommerce facebook ads, facebook ads roas, facebook ppc agency, facebook ads company india"
  },
  "/instagram-marketing-agency": {
    title: "Instagram Marketing Agency in India | Avani Enterprises",
    description: "Avani Enterprises is an Instagram marketing agency in India growing reach with Reels, creative, and Instagram ads that convert followers into customers. Book a free call.",
    keywords: "instagram marketing agency, instagram marketing company, instagram ads agency india, instagram reels marketing, instagram growth agency, instagram advertising company, instagram management services, instagram for business india"
  },
  // Batch A services + comparison
  "/custom-web-development-company": {
    title: "Custom Web Development Company India | Avani Enterprises",
    description: "Avani Enterprises is a custom web development company in India building bespoke, no-template web applications engineered to your exact requirements. 300+ projects delivered. Get a free scope call.",
    keywords: "custom web development company, bespoke web development, tailored web applications, custom website development india, custom web application development, no-template web development"
  },
  "/frontend-development-company": {
    title: "Frontend Development Company in India | React UI | Avani Enterprises",
    description: "Avani Enterprises is a frontend development company in India building fast, pixel-perfect React and Next.js interfaces with strong Core Web Vitals. 300+ projects. Get a free quote.",
    keywords: "frontend development company, react development company, ui development, frontend developers india, next.js development, core web vitals optimization"
  },
  "/backend-development-company": {
    title: "Backend Development Company in India | Avani Enterprises",
    description: "Avani Enterprises builds scalable backend systems, secure APIs, and cloud architecture with Node.js. 300+ projects, 8+ years. Book a free architecture call.",
    keywords: "backend development company, api development company, node.js development, backend developers india, scalable backend architecture, secure database design, cloud backend development, rest api development"
  },
  "/ecommerce-website-development-company": {
    title: "Ecommerce Website Development Company | Avani Enterprises",
    description: "Avani Enterprises is an ecommerce website development company in India building conversion-focused online stores with payments, inventory & mobile checkout. Get a quote.",
    keywords: "ecommerce website development company, online store development, ecommerce web development india, mobile checkout development, payment gateway integration, conversion ecommerce store"
  },
  "/business-management-software-development": {
    title: "Business Management Software Development | Avani Enterprises",
    description: "Avani Enterprises builds custom business management software to run tasks, approvals, inventory & reporting in one system. 300+ projects, 8+ years. Book a free demo.",
    keywords: "business management software development, business software development company india, custom business management system, operations management software, inventory management software development, approval workflow software, business reporting dashboard software"
  },
  "/agentic-ai-development-company": {
    title: "Agentic AI Development Company India | Avani Enterprises",
    description: "Avani Enterprises is an agentic AI development company building autonomous AI agents that plan and execute multi-step tasks with tools. Book a free agent scoping call.",
    keywords: "agentic ai development company, ai agent development, autonomous ai agents, agentic ai india, ai agent development company, multi-agent systems, llm agent development"
  },
  "/custom-ai-development": {
    title: "Custom AI Development in India | Avani Enterprises",
    description: "Avani Enterprises builds custom AI solutions around your data, tools, and processes, bespoke AI development engineered for production in India. Book a free AI scoping call.",
    keywords: "custom ai development, custom ai solutions, bespoke ai development india, custom ai software, ai development company india, ai application development, custom llm development, ai integration services"
  },
  "/webmok-alternative": {
    title: "WebMok Alternative \u2014 Avani Enterprises",
    description: "Looking for a WebMok alternative? Avani Enterprises delivers full-stack web, software, AI and marketing under one roof with transparent fixed quotes. Talk to us today.",
    keywords: "webmok alternative, webmok competitor, web design agency alternative, full-stack development agency, custom web development company, seo and marketing agency, transparent fixed quote agency, gurugram web agency"
  },
  "/web-aspiration-alternative": {
    title: "Web Aspiration Alternative \u2014 Avani Enterprises",
    description: "Looking for a Web Aspiration alternative? Avani Enterprises delivers full-stack web, software, AI and marketing under one roof with transparent fixed quotes. Talk to us today.",
    keywords: "web aspiration alternative, web design agency alternative, digital agency alternative, web development company, seo agency, full-stack development agency, avani enterprises"
  },
  "/leo-digitals-alternative": {
    title: "Leo Digitals Alternative \u2014 Avani Enterprises",
    description: "Looking for a Leo Digitals alternative? Avani Enterprises pairs web, software, AI, SEO and digital marketing under one roof with transparent fixed quotes. Talk to us today.",
    keywords: "leo digitals alternative, leo digitals competitor, digital marketing agency alternative, web development agency, seo company india, full-stack marketing agency, gurugram digital agency"
  },
  "/the-growth-box-alternative": {
    title: "The Growth Box Alternative \u2014 Avani Enterprises",
    description: "Looking for a The Growth Box alternative? Avani Enterprises blends web, software, AI, SEO and marketing under one roof with transparent fixed quotes. Talk to us today.",
    keywords: "the growth box alternative, growth marketing agency alternative, digital marketing agency, seo agency india, full-stack development agency, the growth box competitor, growth agency gurugram"
  },
  "/techmagnate-alternative": {
    title: "Techmagnate Alternative \u2014 Avani Enterprises",
    description: "Looking for a Techmagnate alternative? Avani Enterprises pairs SEO and digital marketing with full-stack web, software, and AI under one roof. Talk to us.",
    keywords: "techmagnate alternative, techmagnate competitor, seo agency alternative, digital marketing agency india, full-stack marketing agency, gurugram seo company, transparent seo pricing"
  },
  "/pagetraffic-alternative": {
    title: "PageTraffic Alternative \u2014 Avani Enterprises",
    description: "Looking for a PageTraffic alternative? Avani Enterprises delivers SEO plus full-stack web, software, AI and marketing under one roof with transparent fixed quotes. Talk to us today.",
    keywords: "pagetraffic alternative, seo agency alternative, pagetraffic competitor, full-stack seo agency india, transparent seo pricing, gurugram seo company, digital marketing alternative"
  },
  "/ez-rankings-alternative": {
    title: "EZ Rankings Alternative \u2014 Avani Enterprises",
    description: "Looking for an EZ Rankings alternative? Avani Enterprises pairs SEO and digital marketing with full-stack web, software, and AI delivery under one roof. Talk to us.",
    keywords: "ez rankings alternative, ez rankings competitor, seo agency alternative, digital marketing agency india, full-stack seo company, transparent seo pricing, alternative to ez rankings"
  },
  "/indeedseo-alternative": {
    title: "IndeedSEO Alternative \u2014 Avani Enterprises",
    description: "Looking for an IndeedSEO alternative? Avani Enterprises delivers SEO, web, software, AI and marketing under one roof with transparent fixed quotes. Talk to us today.",
    keywords: "indeedseo alternative, indeedseo competitor, seo agency india, digital marketing alternative, full-stack seo company, transparent seo pricing, gurugram seo agency"
  },
  // Batch 3 city pages
  "/web-development-company-rohtak": {
    title: "Web Development Company in Rohtak | Avani Enterprises",
    description: "Avani Enterprises builds fast, custom websites and ecommerce stores for Rohtak businesses. 300+ projects, 8+ years. Get a free quote today.",
    keywords: "web development company rohtak, website development rohtak, web designer rohtak, ecommerce development rohtak, custom website rohtak, web design agency rohtak, business website rohtak"
  },
  "/web-development-company-panipat": {
    title: "Web Development Company in Panipat | Avani Enterprises",
    description: "Avani Enterprises builds fast, SEO-ready websites & e-commerce stores for Panipat's textile exporters, manufacturers & retailers. Free quote in 24 hours \u2014 call today.",
    keywords: "web development company panipat, website development panipat, web design panipat, ecommerce website panipat, website designer panipat, textile export website panipat, web developers panipat, business website panipat"
  },
  "/web-development-company-karnal": {
    title: "Web Development Company in Karnal | Avani Enterprises",
    description: "Avani Enterprises builds fast, SEO-ready websites & web apps for Karnal businesses \u2014 basmati exporters, agri-firms, clinics & retailers. Get a free quote in 24 hrs.",
    keywords: "web development company karnal, website development karnal, web design karnal, website designer karnal, ecommerce website karnal, web app development karnal, web designers karnal"
  },
  "/web-development-company-sonipat": {
    title: "Web Development Company in Sonipat | Avani Enterprises",
    description: "Avani Enterprises builds fast, custom websites and ecommerce stores for Sonipat businesses across Kundli, Rai, Murthal and Barhi. Get a free site audit today.",
    keywords: "web development company sonipat, website development sonipat, web design sonipat, ecommerce sonipat, web developers sonipat, custom website sonipat, business website sonipat"
  },
  "/web-development-company-hisar": {
    title: "Web Development Company in Hisar | Avani Enterprises",
    description: "Avani Enterprises builds fast, SEO-ready websites & web apps for Hisar businesses \u2014 steel, agriculture, education & retail. Free quote in 24 hours. Call now.",
    keywords: "web development company hisar, website development hisar, web design hisar, website designer hisar, ecommerce website hisar, web app development hisar, business website hisar, custom website hisar"
  },
  "/web-development-company-ambala": {
    title: "Web Development Company in Ambala | Avani Enterprises",
    description: "Avani Enterprises builds fast, SEO-ready websites & e-commerce stores for Ambala businesses \u2014 scientific instrument exporters, mixie makers & retailers. Free quote in 24 hrs.",
    keywords: "web development company ambala, website development ambala, web design ambala, ecommerce website ambala, web developers ambala cantt, website company ambala city, scientific instrument website ambala, web app development ambala"
  },
  "/web-development-company-faridabad": {
    title: "Web Development Company in Faridabad | Avani Enterprises",
    description: "Avani Enterprises builds fast, SEO-ready websites & ecommerce stores for Faridabad businesses \u2014 from NIT manufacturers to Greater Faridabad retail. Free quote in 24 hrs.",
    keywords: "web development company faridabad, website development faridabad, web design faridabad, ecommerce faridabad, web developers faridabad, custom website faridabad, web design company faridabad"
  },
  "/web-development-company-ghaziabad": {
    title: "Web Development Company in Ghaziabad | Avani Enterprises",
    description: "Web development company in Ghaziabad building fast, SEO-ready websites & ecommerce stores for MSMEs, manufacturers & traders. Free consultation + quote in 24 hrs.",
    keywords: "web development company ghaziabad, website development ghaziabad, web design ghaziabad, ecommerce ghaziabad, web designers ghaziabad, ecommerce website development ghaziabad, website company sahibabad"
  },
  "/web-development-company-greater-noida": {
    title: "Web Development Company in Greater Noida \u2014 Avani Enterprises",
    description: "Avani Enterprises is a web development company in Greater Noida building fast, SEO-ready websites, e-commerce stores & web apps for businesses near the Yamuna Expressway, Knowledge Park & Greater Noida West. Free quote in 24 hrs.",
    keywords: "web development company greater noida, website development greater noida, web design greater noida, ecommerce website development greater noida, web app development greater noida west, website designers yamuna expressway, custom website greater noida"
  },
  "/seo-company-gurgaon": {
    title: "SEO Company in Gurgaon | First-Page Rankings \u2014 Avani Enterprises",
    description: "Avani Enterprises is a results-driven SEO company in Gurgaon. We grow organic traffic 3x for Cyber City startups, D2C brands & MNCs. Get a free SEO audit today.",
    keywords: "seo company gurgaon, seo services gurgaon, seo agency gurgaon, local seo gurgaon, best seo company gurugram, search engine optimization gurgaon, google ranking gurgaon"
  },
  "/seo-company-noida": {
    title: "SEO Company in Noida | First-Page Rankings \u2014 Avani Enterprises",
    description: "Avani Enterprises is an SEO company in Noida driving compounding organic traffic and first-page Google rankings for IT, D2C, real estate & education brands. Free SEO audit.",
    keywords: "seo company noida, seo services noida, seo agency noida, local seo noida, search engine optimization noida, best seo company greater noida, google ranking services noida"
  },
  "/seo-company-rohtak": {
    title: "SEO Company in Rohtak | Avani Enterprises",
    description: "Top SEO company in Rohtak driving compounding organic traffic and first-page rankings for local businesses, institutes, and manufacturers. Get a free SEO audit today.",
    keywords: "seo company rohtak, seo services rohtak, seo agency rohtak, local seo rohtak, google ranking rohtak, search engine optimization rohtak"
  },
  "/seo-company-panipat": {
    title: "SEO Company in Panipat | Avani Enterprises",
    description: "Avani Enterprises is a results-driven SEO company in Panipat helping textile, handloom and home-furnishing export businesses rank on Google. Get a free local SEO audit today.",
    keywords: "seo company panipat, seo services panipat, seo agency panipat, local seo panipat, search engine optimization panipat, seo for textile exporters panipat, google ranking panipat"
  },
  "/digital-marketing-company-gurgaon": {
    title: "Digital Marketing Company in Gurgaon \u2014 Avani Enterprises",
    description: "Avani Enterprises is a results-driven digital marketing company in Gurgaon delivering SEO, Google Ads, social media & lead-gen for Cyber City & Sohna Road brands. Free audit in 24 hrs.",
    keywords: "digital marketing company gurgaon, digital marketing agency gurgaon, digital marketing services gurgaon, seo company gurgaon, social media marketing gurgaon, ppc agency gurugram, performance marketing gurgaon, lead generation gurgaon"
  },
  "/digital-marketing-company-noida": {
    title: "Digital Marketing Company in Noida \u2014 Avani Enterprises",
    description: "Avani Enterprises is a results-driven digital marketing company in Noida delivering SEO, Google Ads & Meta Ads for IT, manufacturing & D2C brands. Get a free strategy call in 24 hrs.",
    keywords: "digital marketing company noida, digital marketing agency noida, digital marketing services noida, seo company noida, ppc agency noida, social media marketing noida, google ads noida"
  },
  "/digital-marketing-company-rohtak": {
    title: "Digital Marketing Company in Rohtak | Avani Enterprises",
    description: "Avani Enterprises is a results-driven digital marketing company in Rohtak. SEO, Meta and Google Ads, and social media for local brands. Get a free strategy audit today.",
    keywords: "digital marketing company rohtak, digital marketing agency rohtak, digital marketing services rohtak, seo rohtak, social media marketing rohtak, google ads rohtak"
  },
  "/digital-marketing-company-delhi": {
    title: "Digital Marketing Company in Delhi | Avani Enterprises",
    description: "Avani Enterprises is a results-driven digital marketing company in Delhi delivering SEO, Google Ads, and social media that grow leads. Get a free audit today.",
    keywords: "digital marketing company delhi, digital marketing agency delhi, digital marketing services delhi, performance marketing delhi, seo company delhi, google ads agency delhi, social media marketing delhi"
  },
  "/ai-automation-company-gurgaon": {
    title: "AI Automation Company in Gurgaon \u2014 Avani Enterprises",
    description: "Avani Enterprises is a top AI automation company in Gurgaon. We build AI chatbots, workflow automation & business automation for Cyber City, Udyog Vihar & Sohna Road firms. Free audit in 24 hrs.",
    keywords: "ai automation company gurgaon, business automation gurgaon, ai chatbot gurgaon, workflow automation gurgaon, ai agency gurugram, intelligent automation gurgaon, process automation cyber city"
  },
  "/ai-solutions-company-noida": {
    title: "AI Solutions Company in Noida \u2014 Avani Enterprises",
    description: "Avani Enterprises is an AI solutions company in Noida building custom AI, automation & ML models for IT firms, manufacturers & D2C brands. Free AI audit in 24 hrs.",
    keywords: "ai solutions company noida, ai development company noida, artificial intelligence company noida, custom ai noida, machine learning company noida, ai automation noida, generative ai development noida"
  },
  "/ai-solutions-company-delhi": {
    title: "AI Solutions Company in Delhi | Avani Enterprises",
    description: "Avani Enterprises is a custom AI solutions company in Delhi building AI chatbots, automation, and ML systems for Delhi NCR businesses. 8+ years, 150+ clients. Free AI consult.",
    keywords: "ai solutions company delhi, ai development company delhi, artificial intelligence company delhi, custom ai delhi, ai chatbot development delhi, machine learning company delhi, generative ai delhi, ai automation delhi"
  },
  // Batch 2 service pages
  "/web-design-company": {
    title: "Web Design Company in India | Avani Enterprises",
    description: "Avani Enterprises is a design-led web design company in India building conversion-focused, mobile-first UI/UX and brand-aligned websites. Get a free design consult.",
    keywords: "web design company, website design company, web design agency, ui ux design company, professional web design services india, custom web design, conversion focused web design, mobile first website design"
  },
  "/ecommerce-development-company": {
    title: "Ecommerce Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an ecommerce development company in India building Shopify, WooCommerce & custom online stores that convert. 300+ projects. Get a free quote today.",
    keywords: "ecommerce development company, ecommerce website development, online store development, shopify development, woocommerce development, custom ecommerce india"
  },
  "/custom-software-development-company": {
    title: "Custom Software Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is a custom software development company in India building bespoke business software, SaaS, internal tools, and integrations. 300+ projects, 8+ years. Get a free scoping call.",
    keywords: "custom software development company, bespoke software development, software development company, enterprise software development, saas development india, custom application development, internal tools development, software integration services"
  },
  "/mobile-app-development-company": {
    title: "Mobile App Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is a mobile app development company in India building iOS, Android & cross-platform apps with React Native and Flutter. 300+ projects delivered. Get a free quote.",
    keywords: "mobile app development company, android app development, ios app development, app development company, cross platform app development, react native app development india, flutter app development"
  },
  "/hr-portal-development-company": {
    title: "HR Portal Development Company in India | Avani Enterprises",
    description: "Avani Enterprises is an HR portal development company building custom HR software and employee self-service portals around your workflow. Integrated, white-label. Get a quote.",
    keywords: "hr portal development company, employee portal development, custom hr software development, hr management system development, employee self service portal india, bespoke hr software, white-label hr portal"
  },
  "/meta-ads-agency": {
    title: "Meta Ads Agency in India | Avani Enterprises",
    description: "Avani Enterprises is a results-driven Meta ads agency in India running profitable Facebook and Instagram ad campaigns for lead gen and ecommerce. Book a free strategy call.",
    keywords: "meta ads agency, facebook ads agency, instagram ads agency, facebook advertising company, meta advertising agency, social media ads management india, facebook lead generation, ecommerce facebook ads"
  },
  "/social-media-marketing-company": {
    title: "Social Media Marketing Company in India | Avani Enterprises",
    description: "Avani Enterprises is a social media marketing company in India building organic growth on Instagram, Facebook & LinkedIn through reels, content & community. Book a free audit.",
    keywords: "social media marketing company, social media marketing agency, smm company, instagram marketing, social media management services india, social media agency, organic social media marketing"
  },
  "/ai-solutions-company": {
    title: "AI Solutions Company in India | Avani Enterprises",
    description: "Avani Enterprises is an AI solutions company in India building custom LLM apps, generative AI, AI chatbots, and ML integrations. Strategy to deployment. Book a free AI consultation.",
    keywords: "ai solutions company, ai development company, artificial intelligence company, custom ai solutions, generative ai development, ai consulting india, llm app development, machine learning integration"
  },
  "/local-seo-services": {
    title: "Local SEO Services in India | Map Pack & GMB | Avani Enterprises",
    description: "Avani Enterprises delivers local SEO services that win the Google map pack, optimise your Google Business Profile, and turn near me searches into walk-ins and calls. Free local audit.",
    keywords: "local seo services, local seo company, google business profile optimization, map pack seo, local search optimization, gmb optimization india, near me seo, local citations"
  },
  "/business-process-automation": {
    title: "Business Process Automation in India | Avani Enterprises",
    description: "Avani Enterprises is a business process automation company streamlining approvals, data entry, reporting and integrations to cut manual work. Book a free process audit.",
    keywords: "business process automation, workflow automation company, bpa services, process automation company, automation services, robotic process automation india"
  },
  // Flagship service pages
  "/web-development-company": {
    title: "Web Development Company in India | Custom Websites & Apps | Avani Enterprises",
    description: "Avani Enterprises is a leading web development company in India building fast, secure, SEO-ready websites, web apps, and ecommerce stores. 300+ projects delivered. Get a free quote.",
    keywords: "web development company, website development company, web developer, custom website development, web application development, react web development company india"
  },
  "/seo-company": {
    title: "SEO Company in India | SEO Services & Agency | Avani Enterprises",
    description: "Avani Enterprises is a results-driven SEO company in India. We grow organic traffic, rankings, and qualified leads with technical SEO, content, and link building. Free SEO audit.",
    keywords: "seo company, seo agency, seo services, local seo company, search engine optimization company india, best seo agency"
  },
  "/digital-marketing-company": {
    title: "Digital Marketing Company in India | Agency & Services | Avani Enterprises",
    description: "Avani Enterprises is a full-service digital marketing company in India delivering SEO, Google Ads, social media, and performance marketing that generates qualified leads and ROI. Free strategy call.",
    keywords: "digital marketing company, digital marketing agency, digital marketing services, performance marketing agency, online marketing company india, best digital marketing agency"
  },
  "/google-ads-agency": {
    title: "Google Ads Agency in India | PPC Management | Avani Enterprises",
    description: "Avani Enterprises is a certified Google Ads agency managing high-ROI PPC, search, shopping, and display campaigns. Lower your cost per lead. Request a free Google Ads audit.",
    keywords: "google ads agency, google ads management, ppc agency, ppc management company, google adwords agency india, paid search agency"
  },
  "/ai-automation-company": {
    title: "AI Automation Company in India | Business Process Automation | Avani Enterprises",
    description: "Avani Enterprises is an AI automation company building AI chatbots, workflow automation, and custom AI solutions that cut costs and scale operations. Book a free automation audit.",
    keywords: "ai automation company, business automation company, ai solutions company, ai development company, ai chatbot development, workflow automation company india"
  },
  "/crm-development-company": {
    title: "CRM Development Company in India | Custom CRM Software | Avani Enterprises",
    description: "Avani Enterprises is a CRM development company building custom CRM software to manage leads, sales, and customers. Tailored to your workflow, fully integrated. Request a demo.",
    keywords: "crm development company, crm software company, custom crm development, crm software development, sales crm software india, lead management crm"
  },
  // Products
  "/hr-portal": {
    title: "Advanced HR Portal Software for Employee Self-Service | Avani Enterprises",
    description: "Streamline employee communication, document storage, and requests with our secure HR Portal Software. Empower your team with self-service tools. Request a demo.",
    keywords: "hr portal software, employee self service portal, company intranet portal, employee hub software, hr document management system, employee communication app"
  },
  "/hrms-software-india": {
    title: "Top HRMS Software in India | Best HR Management Systems | Avani Enterprises",
    description: "Transform your HR operations with India's leading HRMS software. Manage onboarding, attendance, payroll, and performance on a single secure platform. Free trial.",
    keywords: "hrms software india, best hrms software, hr management system, automated onboarding system, employee record software india, human resource information system"
  },
  "/payroll-software-india": {
    title: "Automated Payroll Software India | Statutory Compliance | Avani Enterprises",
    description: "Automate salary calculation, tax declarations, PF, and payslip generation with India's finest Payroll Software. Guarantee 100% compliance. Request a quote.",
    keywords: "payroll software india, automated payroll system, salary calculator software, pf esi tds calculations, employee tax declaration portal, form 16 generator"
  },
  "/attendance-management-system": {
    title: "Real-Time Attendance Management System | GPS & Biometrics | Avani Enterprises",
    description: "Track employee clock-ins with real-time accuracy using our Attendance Management System. Integrates GPS geofencing and biometric systems. Request a demo.",
    keywords: "attendance management system, biometric attendance software, employee clock in app, gps geofenced attendance, shift scheduling tool, real time tracking software"
  },
  "/leave-management-software": {
    title: "Online Leave Management Software | Tracking & Approvals | Avani Enterprises",
    description: "Simplify leave tracking, configure custom accrual policies, and handle manager approvals with our secure Leave Management Software. Request a free trial.",
    keywords: "leave management software, online leave tracker, leave approval system, employee vacation tracker, custom leave policies, leave encashment system"
  },
  "/employee-management-software": {
    title: "Enterprise Employee Management Software | Staff Records | Avani Enterprises",
    description: "Centralize employee records, track contracts, and manage assets with our secure Employee Management Software. Keep your HR database clean. Request a demo.",
    keywords: "employee management software, staff record database, digital employee directory, contract tracking system, employee lifecycle manager, secure hr database"
  },
  "/employee-portal": {
    title: "Dedicated Employee Portal Software | Staff Communication | Avani Enterprises",
    description: "Secure, modern Employee Portal software. Allow your team to view payslips, submit leaves, and track benefits on any device. Learn more and request a demo.",
    keywords: "employee portal software, staff communications hub, secure employee login, digital payslip portal, company updates dashboard, employee desk portal"
  },
  "/crm-software-india": {
    title: "Best CRM Software India | Lead Tracking & Sales Automation | Avani Enterprises",
    description: "Boost your sales pipelines, track prospective leads, and automate follow-ups with India's finest CRM Software. Request a free trial and scale your revenue.",
    keywords: "crm software india, lead tracking software, sales automation system, customer relationship management, sales pipeline manager, automated sales follow ups"
  },
  "/workforce-management-software": {
    title: "Workforce Management Software India | Team Scheduling | Avani Enterprises",
    description: "Optimize employee scheduling, track attendance logs, and process salary records with our integrated Workforce Management Software. Request a custom demo.",
    keywords: "workforce management software india, workforce planning software, employee scheduling software india, staff compliance tracker"
  },
  "/project-management-software": {
    title: "Project Management Software | Team Task Tracking | Avani Enterprises",
    description: "Track projects, assign tasks, monitor deadlines, and share documents with our unified Project Management Software. Increase team collaboration. Free trial.",
    keywords: "project management software india, task management software, project tracking tool india, team workflow tools"
  },
  "/business-operating-system": {
    title: "All-in-One Business Operating System | Business OS | Avani Enterprises",
    description: "Unify HR, payroll, attendance tracking, sales CRM, projects, and team chat on a single Business Operating System. Empower your growing enterprise.",
    keywords: "business operating system india, all in one business software, smb software india, enterprise operating suite"
  },

  // Competitor alternatives
  "/keka-alternative": {
    title: "Best Keka Alternative in India | Affordable HRMS Suite | Avani Enterprises",
    description: "Searching for the best Keka alternative? Compare pricing, custom features, and support. Discover why Avani Enterprises is the top choice for Indian SMBs.",
    keywords: "keka alternative india, keka alternative, keka hr alternative, affordable hrms india"
  },
  "/greythr-alternative": {
    title: "GreytHR Alternative | Automated HRMS & Payroll System | Avani Enterprises",
    description: "Switch from GreytHR to Avani Enterprises. Get faster payroll computations, dynamic leave trackers, and modern self-service portals at an affordable price.",
    keywords: "greythr alternative india, greythr alternative, greythr vs avani, payroll replacement software"
  },
  "/darwinbox-alternative": {
    title: "Darwinbox Alternative for Indian Enterprises | Scalable HRMS | Avani Enterprises",
    description: "Looking for a flexible Darwinbox alternative? Discover our fast-deploying HRMS built for Indian enterprise scale, custom approvals, and ESI/PF compliance.",
    keywords: "darwinbox alternative india, darwinbox alternative, hrms alternative to darwinbox, enterprise hr platform"
  },
  "/zoho-people-alternative": {
    title: "Best Zoho People Alternative | Custom HR Portal & CRM | Avani Enterprises",
    description: "Replace Zoho People with a unified platform. Compare features, pricing, and integrations. Discover why Indian companies choose Avani Enterprises.",
    keywords: "zoho people alternative india, zoho alternative, hrms alternative zoho, unified sales hr tools"
  },

  // Local city pages
  "/rohtak": {
    title: "Web Development & SEO Company in Rohtak | Avani Enterprises",
    description: "Grow your local Rohtak business with custom web development, Google map rankings, B2C social media marketing, and high-ROI ads. Get a free audit today.",
    keywords: "web development company rohtak, seo services rohtak, digital marketing agency rohtak, social media marketing rohtak, website development in rohtak"
  },
  "/gurgaon": {
    title: "Top Web Development & Digital Marketing Agency in Gurgaon | Avani Enterprises",
    description: "Avani Enterprises is Gurgaon's leading digital agency. We deliver high-performing custom software, enterprise SEO, and targeted lead campaigns. Request a consultation.",
    keywords: "web development company gurgaon, digital marketing agency gurgaon, seo services gurgaon, social media agency gurgaon, website development in gurugram"
  },
  "/faridabad": {
    title: "Top Web Development & Digital Marketing Agency in Faridabad | Avani Enterprises",
    description: "Avani Enterprises is Faridabad's premier digital agency. We deliver high-performing websites, B2B SEO services, and targeted lead campaigns for local businesses. Contact us.",
    keywords: "web development company faridabad, digital marketing agency faridabad, seo services faridabad, social media agency faridabad, website development in faridabad"
  },
  "/delhi": {
    title: "Top Web Development & Digital Marketing Agency in Delhi | Avani Enterprises",
    description: "Avani Enterprises is Delhi's leading digital agency. We deliver high-performing custom software, enterprise SEO, and targeted lead campaigns. Request a consultation.",
    keywords: "web development company delhi, digital marketing agency delhi, seo services delhi, social media agency delhi, website development in delhi"
  },

  // Local SEO pages
  "/web-development-company-hparams": {
    title: "Best Web Development Company in Haryana | Custom Websites & Apps — Avani Enterprises",
    description: "Looking for the best web development company in Haryana? Avani Enterprises builds fast, SEO-ready custom websites and mobile apps for businesses in Gurgaon, Rohtak, Faridabad & across Haryana. Free consultation.",
    keywords: "web development company haryana, website development company haryana, best web development company haryana, web design company haryana"
  },
  "/web-development-company-hquery": {
    title: "Best Web Development Company in Haryana | Custom Websites & Apps — Avani Enterprises",
    description: "Looking for the best web development company in Haryana? Avani Enterprises builds fast, SEO-ready custom websites and mobile apps for businesses in Gurgaon, Rohtak, Faridabad & across Haryana. Free consultation.",
    keywords: "web development company haryana, website development company haryana, best web development company haryana, web design company haryana"
  },
  "/web-development-company-haryana": {
    title: "Best Web Development Company in Haryana | Custom Websites & Apps — Avani Enterprises",
    description: "Looking for the best web development company in Haryana? Avani Enterprises builds fast, SEO-ready custom websites and mobile apps for businesses in Gurgaon, Rohtak, Faridabad & across Haryana. Free consultation.",
    keywords: "web development company haryana, website development company haryana, best web development company haryana, web design company haryana"
  },
  "/web-development-company-delhi": {
    title: "Best Web Development Company in Delhi | Custom Websites & Apps — Avani Enterprises",
    description: "Top web development company in Delhi. We build lightning-fast corporate websites, e-commerce stores, and custom web applications for Delhi brands. Free quote.",
    keywords: "web development company delhi, website development company delhi, best web development company delhi, web design company delhi"
  },
  "/social-media-marketing-agency-haryana": {
    title: "Social Media Marketing Agency in Haryana | Instagram, Facebook & LinkedIn — Avani Enterprises",
    description: "Best social media marketing agency in Haryana. We manage Instagram, Facebook & LinkedIn for Haryana brands with reel production, targeted Meta ads, and daily posting.",
    keywords: "social media marketing agency haryana, instagram marketing haryana, facebook ads haryana, social media management haryana"
  },
  "/social-media-marketing-agency-delhi": {
    title: "Social Media Marketing Agency in Delhi | Instagram, Facebook & LinkedIn Ads — Avani Enterprises",
    description: "Best social media marketing agency in Delhi. We manage Instagram, Facebook & LinkedIn for Delhi businesses with reel production, targeted Meta Ads, and community management. Get a free audit today.",
    keywords: "social media marketing agency delhi, instagram marketing delhi, facebook ads delhi, social media management delhi, linkedin marketing delhi"
  },
  "/digital-marketing-agency-haryana": {
    title: "Best Digital Marketing Agency in Haryana | Growth Retainers — Avani Enterprises",
    description: "Looking for the best digital marketing agency in Haryana? We help local brands in Rohtak, Panipat, Gurgaon, and Faridabad scale with SEO, custom web dev, PPC, and social media.",
    keywords: "digital marketing agency haryana, digital marketing company haryana, online marketing services haryana, digital agency haryana"
  },
  "/digital-marketing-agency-delhi": {
    title: "Best Digital Marketing Agency in Delhi | SEO, SMM & Paid Ads — Avani Enterprises",
    description: "Delhi's leading digital marketing agency. We help businesses scale with custom SEO, performance marketing (Google & Meta Ads), and high-impact social media management.",
    keywords: "digital marketing agency delhi, digital marketing company delhi, online marketing services delhi, digital agency delhi"
  },
  "/seo-company-haryana": {
    title: "SEO Company in Haryana | Enterprise SEO & Map Rankings — Avani Enterprises",
    description: "Boost your organic traffic with the best SEO company in Haryana. We rank websites on the first page of Google and optimize local maps for Gurgaon, Rohtak, and Faridabad.",
    keywords: "seo company haryana, search engine optimization haryana, local map seo gurgaon, local map optimization rohtak"
  },
  "/seo-company-delhi": {
    title: "SEO Company in Delhi | Technical SEO & Google Ranking — Avani Enterprises",
    description: "compete for the top positions on Google with Delhi's premier SEO company. We provide advanced technical audits, backlink building, local SEO, and keyword optimization. Free SEO audit.",
    keywords: "seo company delhi, search engine optimization delhi, local map seo delhi, technical seo audit delhi"
  },
  "/google-ads-agency-haryana": {
    title: "Google Ads Agency in Haryana | High ROI PPC Campaigns — Avani Enterprises",
    description: "Maximize your ROI with the leading Google Ads agency in Haryana. We design high-converting PPC search, shopping, and display campaigns. Request a free PPC audit.",
    keywords: "google ads agency haryana, ppc company haryana, search engine marketing haryana, google adwords agency panipat"
  },
  "/sitemap": {
    title: "Site Map | Avani Enterprises",
    description: "Browse the complete site map of Avani Enterprises — all web development, SEO, digital marketing, AI automation, and HR software pages in one place.",
    keywords: "avani enterprises site map, avani enterprises pages, avani enterprises services list"
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Per-route body HTML
//
// The SPA shell ships one hardcoded "Avani Enterprises — Digital Marketing
// Agency in India" block inside #root. Serving that on all 455 URLs meant every
// page was byte-identical below </head> on the first crawl, which is the direct
// cause of the "Crawled – currently not indexed" bucket in Search Console.
//
// We replace that block per route with the page's real H1, intro, scope, local
// facts and FAQs. React clears #root on mount, so this costs nothing visually —
// it exists so the crawler's first pass sees the same unique content a user
// eventually sees.
// ─────────────────────────────────────────────────────────────────────────────

const SSR_START = '<!--SSR-CONTENT-START-->';
const SSR_END   = '<!--SSR-CONTENT-END-->';

const BRAND = 'Avani Enterprises';

/**
 * Keep <title> inside what Google actually displays (~60 characters).
 *
 * 101 served titles were over the limit and got truncated mid-phrase in search
 * results, which loses the value proposition exactly where it matters. A few
 * also carried the brand twice ("… | Avani Enterprises | Avani Enterprises")
 * because registry titles already ended with it before we appended.
 *
 * Applied at serve time rather than by editing three registries, so it covers
 * every source and anything added later. The rules are ordered so the
 * keyword-bearing head of the title always survives:
 *
 *   1. Collapse a repeated brand suffix.
 *   2. If still long, drop the brand entirely — Google shows the site name
 *      separately, so it is the cheapest thing to lose.
 *   3. If still long, keep whole leading segments up to a separator.
 *   4. Last resort, trim on a word boundary. Never mid-word.
 */
function shortenTitle(raw, limit = 60) {
  let t = String(raw || '').replace(/\s+/g, ' ').trim();
  if (!t) return t;

  // 1. Collapse repeats of the brand suffix.
  const brandSuffix = new RegExp(`(?:\\s*[|\\u2014\\u2013-]\\s*${BRAND})+\\s*$`, 'i');
  const hadBrand = brandSuffix.test(t);
  if (hadBrand) t = t.replace(brandSuffix, '').trim();

  // Re-attach a single brand only if there is room for it.
  // If the brand already appears inside the title, do not append it again.
  const alreadyBranded = t.toLowerCase().includes(BRAND.toLowerCase());
  const withBrand = alreadyBranded ? t : `${t} | ${BRAND}`;
  if (withBrand.length <= limit) return withBrand;

  // 2. Brand dropped. Does the bare title fit?
  if (t.length <= limit) return t;

  // 3. Keep whole leading segments. Split only on pipes and dashes — a colon is
  //    usually part of the phrase ("10x Your Traffic: The Playbook"), so cutting
  //    there throws away the half that carries the meaning.
  const parts = t.split(/\s*[|—–]\s*/).filter(Boolean);
  if (parts.length > 1) {
    let acc = '';
    for (const part of parts) {
      const next = acc ? `${acc} | ${part}` : part;
      if (next.length > limit) break;
      acc = next;
    }
    if (acc && acc.length >= 30) return tidyTail(acc);
    if (parts[0].length <= limit) return tidyTail(parts[0]);
  }

  // 4. Word-boundary trim.
  const words = t.split(' ');
  let out = '';
  for (const w of words) {
    const next = out ? `${out} ${w}` : w;
    if (next.length > limit) break;
    out = next;
  }
  out = tidyTail(out || t.slice(0, limit));

  // A stub left after a colon reads worse than no subtitle at all. Threshold is
  // deliberately low: "…: 15 Technical SEO Issues" carries keywords worth
  // keeping, whereas "…: How" does not.
  const colon = out.indexOf(':');
  if (colon > 0) {
    const head = out.slice(0, colon).trim();
    const tail = out.slice(colon + 1).trim();
    if (tail.length < 12 && head.length >= 20) return head;
  }
  return out;
}

/**
 * Clean up a truncated tail so it never ends mid-thought: drop an unclosed
 * parenthetical, then strip trailing punctuation and dangling function words
 * ("… (And Why It's" → "…", "… Services for" → "… Services").
 */
function tidyTail(str) {
  let s = String(str);
  const open = s.lastIndexOf('(');
  if (open !== -1 && s.indexOf(')', open) === -1) s = s.slice(0, open);
  s = s.replace(/[\s,;:|—–-]+$/, '');
  const DANGLING = /\s+(and|or|the|a|an|to|of|in|on|for|with|that|why|how|is|are|it's|we|our|your|from|by|at|every|each|this|these|those|into|over|across|without|when|can|will|has|have|was|were|been|being|do|does|did|built|make|makes)$/i;
  while (DANGLING.test(s)) s = s.replace(DANGLING, '');
  return s.replace(/[\s,;:|—–-]+$/, '');
}

function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Service hub slugs, used to build contextual links between related pages.
const RELATED_SERVICES = {
  'web-development': ['web-design-company', 'mobile-app-development-company', 'ecommerce-development-company', 'seo-company'],
  'web-design': ['web-development-company', 'ecommerce-development-company', 'seo-company'],
  'mobile-app-development': ['web-development-company', 'custom-software-development-company', 'ai-chatbot-development'],
  'ecommerce-development': ['web-development-company', 'ecommerce-seo-services', 'meta-ads-agency', 'google-ads-agency'],
  seo: ['digital-marketing-company', 'google-ads-agency', 'ai-content-services', 'web-development-company'],
  'digital-marketing': ['seo-company', 'google-ads-agency', 'meta-ads-agency', 'social-media-marketing-company'],
  'google-ads': ['meta-ads-agency', 'digital-marketing-company', 'seo-company'],
  'meta-ads': ['google-ads-agency', 'social-media-marketing-company', 'ai-video-services'],
  'social-media-marketing': ['meta-ads-agency', 'ai-video-services', 'ai-content-services'],
  'ai-development': ['ai-chatbot-development', 'agentic-ai-development-company', 'ai-automation-company', 'llm-development-company'],
  'ai-chatbot': ['ai-callers', 'agentic-ai-development-company', 'ai-development-company'],
  'ai-callers': ['ai-chatbot-development', 'agentic-ai-development-company', 'crm-development-company'],
  'ai-content': ['ai-video-services', 'seo-company', 'social-media-marketing-company'],
  'ai-video': ['ai-content-services', 'meta-ads-agency', 'social-media-marketing-company'],
  'agentic-ai': ['ai-automation-company', 'ai-development-company', 'mcp-development-company'],
  'ai-automation': ['agentic-ai-development-company', 'crm-development-company', 'erp-development-company'],
  'crm-development': ['erp-development-company', 'custom-software-development-company', 'business-os'],
  'erp-development': ['crm-development-company', 'custom-software-development-company', 'business-os'],
  'custom-software-development': ['web-development-company', 'crm-development-company', 'erp-development-company'],
};

// Locations we keep, grouped so a city links to genuine neighbours rather than
// to an arbitrary list.
const LOCATION_CLUSTERS = [
  ['gurgaon', 'delhi', 'noida', 'faridabad', 'ghaziabad', 'greater-noida', 'rohtak', 'haryana'],
  ['mumbai', 'pune', 'ahmedabad'],
  ['bangalore', 'hyderabad', 'chennai'],
  ['kolkata', 'jaipur'],
  ['dubai', 'uae', 'singapore', 'usa'],
];

/**
 * Contextual internal links: same service in nearby cities, related services,
 * and the core hubs. Replaces the identical 22-link block that previously ran on
 * every page — that was both weak internal linking and pure duplicate text.
 */
function internalLinksHtml(pagePath, resolved) {
  const items = [];
  const seen = new Set([String(pagePath).replace(/^\/+/, '')]);
  const add = (href, label) => {
    const key = href.replace(/^\/+/, '');
    if (seen.has(key)) return;
    seen.add(key);
    items.push([href, label]);
  };

  if (resolved) {
    const base = resolved.slug.replace(
      resolved.location ? new RegExp('-' + resolved.location.key + '$') : /$/,
      ''
    );

    // Same service, neighbouring cities we actually serve.
    if (resolved.location) {
      const cluster = LOCATION_CLUSTERS.find((c) => c.includes(resolved.location.key)) || [];
      cluster.forEach((loc) => {
        if (loc === resolved.location.key) return;
        const href = `/${base}-${loc}`;
        if (isNoIndex(href)) return; // never link into a de-indexed doorway
        const name = (LOCATIONS_LABEL[loc] || loc);
        add(href, `${resolved.service.name} in ${name}`);
      });
      add(`/${base}`, `${resolved.service.name} (all locations)`);
    }

    // Related services.
    (RELATED_SERVICES[resolved.serviceId] || []).forEach((slug) => {
      if (isNoIndex('/' + slug)) return;
      add('/' + slug, slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
    });
  }

  // Sibling city pages for the same service — the strongest lateral link for a
  // location page, and what stops the city set becoming a set of orphans.
  if (resolved && resolved.location) {
    const base = resolved.slug.replace(new RegExp('-' + resolved.location.key + '$'), '');
    ['gurgaon', 'rohtak', 'delhi', 'noida', 'faridabad', 'ghaziabad', 'india']
      .forEach((loc) => {
        if (loc === resolved.location.key) return;
        const href = `/${base}-${loc}`;
        if (isNoIndex(href)) return;
        add(href, `${resolved.service.name} in ${LOCATIONS_LABEL[loc] || loc}`);
      });
  }

  [
    ['/services', 'All Services'],
    ['/guides', 'Guides'],
    ['/blog', 'Blog'],
    ['/case-studies', 'Case Studies'],
    ['/projects', 'Projects'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
    ['/sitemap', 'Full site index'],
  ].forEach(([h, l]) => add(h, l));

  return (
    '<nav aria-label="Related"><h2>Related services and locations</h2><ul>' +
    items.slice(0, 20).map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('') +
    '</ul></nav>'
  );
}

// City display names for link labels.
const LOCATIONS_LABEL = {
  gurgaon: 'Gurugram', delhi: 'Delhi', noida: 'Noida', 'greater-noida': 'Greater Noida',
  faridabad: 'Faridabad', ghaziabad: 'Ghaziabad', rohtak: 'Rohtak', haryana: 'Haryana',
  mumbai: 'Mumbai', bangalore: 'Bengaluru', pune: 'Pune', hyderabad: 'Hyderabad',
  chennai: 'Chennai', kolkata: 'Kolkata', ahmedabad: 'Ahmedabad', jaipur: 'Jaipur',
  india: 'India', dubai: 'Dubai', uae: 'the UAE', singapore: 'Singapore', usa: 'the USA',
};

/**
 * Per-route JSON-LD injected server-side: BreadcrumbList, Service, FAQPage and
 * LocalBusiness. The React app emits equivalents, but Googlebot's first pass is
 * pre-JavaScript, so anything only rendered client-side is a second-pass signal.
 */
function schemaHtml(pagePath, canonical, title, resolved, guide, faqs, post) {
  const graphs = [];
  const slug = String(pagePath || '/').replace(/^\/+/, '').replace(/\/+$/, '');

  // ── Organization ──────────────────────────────────────────────────────────
  // Emitted on every page with a stable @id so every other entity on the site
  // can reference it. This is the entity anchor: it is how Google and answer
  // engines resolve "Avani Enterprises" to one organisation with one address
  // and one phone number, which is what a brand nobody has heard of needs
  // before it can be surfaced at all.
  //
  // Deliberately no aggregateRating — see SEO-RECOVERY.md §4.1.
  graphs.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: NAP.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo0.webp` },
    description:
      'Avani Enterprises is a full-service digital, product and AI studio based in Gurugram and Rohtak, India. It builds websites, mobile apps, e-commerce stores and custom business software, runs SEO and paid media, and develops AI systems including chatbots, voice agents and agentic workflows.',
    foundingDate: '2016',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tower B, 3rd Floor, Unitech Cyber Park, Durga Colony, Sector 39',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: NAP.phone,
        email: NAP.email,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
        // No `contactOption: 'TollFree'`. index.html used to assert that on an
        // Indian mobile number, which is simply untrue.
      },
      // The second line, listed so the number stays associated with the entity
      // for anyone who has it from an older listing or an old business card.
      ...(NAP.phoneSecondary ? [{
        '@type': 'ContactPoint',
        telephone: NAP.phoneSecondary,
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      }] : []),
    ],
    // What the organisation is actually competent in. This is the property
    // answer engines read when deciding whether a brand is a plausible source
    // for a given question, so it is worth stating explicitly.
    knowsAbout: [
      'Web Development', 'Web Design', 'Mobile App Development',
      'E-commerce Development', 'Custom Software Development',
      'Search Engine Optimization', 'Local SEO', 'Digital Marketing',
      'Google Ads Management', 'Meta Advertising', 'Social Media Marketing',
      'AI Development', 'AI Chatbot Development', 'AI Voice Agents',
      'Agentic AI', 'Business Process Automation',
      'CRM Development', 'ERP Development', 'HRMS Development',
    ],
    founder: { '@id': `${SITE_URL}/#founder` },
    sameAs: NAP.sameAs,
  });

  // ── Person — the founder ──────────────────────────────────────────────────
  // Emitted on the pages where a human is actually presented, and referenced by
  // Organization.founder everywhere else via @id. A named, linkable person is
  // one of the few E-E-A-T signals a young brand can offer honestly.
  if (!slug || slug === 'about' || slug === 'contact') {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: 'Kapil Khandelwal',
      givenName: 'Kapil',
      familyName: 'Khandelwal',
      jobTitle: 'Founder & CEO',
      url: `${SITE_URL}/about`,
      worksFor: { '@id': `${SITE_URL}/#organization` },
      sameAs: ['https://www.linkedin.com/in/kapil-khandelwal-avani/'],
    });
  }

  // ── ContactPage ───────────────────────────────────────────────────────────
  // Tells Google and answer engines that this specific URL is where you get in
  // touch, rather than leaving them to infer it from the page title.
  if (slug === 'contact') {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#webpage`,
      url: canonical,
      name: 'Contact Avani Enterprises',
      description:
        'Contact details, offices and enquiry form for Avani Enterprises — a digital, product and AI studio with offices in Gurugram, Mumbai and Rohtak.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
    });
  }

  // ── LocalBusiness for the head office ─────────────────────────────────────
  // Previously emitted only on {service}-{city} pages, so the homepage — the
  // page most likely to be the local-pack landing target — carried no premises
  // markup at all. Gated on offices.js `confirmed`, so it can only ever describe
  // a real, staffed address.
  if (!slug || slug === 'contact' || slug === 'about' || slug === 'global-presence') {
    const hq = localBusinessSchema(officeFor('gurgaon'), canonical);
    if (hq) graphs.push(hq);
  }

  // ── WebSite + SearchAction ────────────────────────────────────────────────
  // Homepage only. Declares the site as an entity and exposes internal search,
  // which is what makes a sitelinks search box eligible.
  if (!slug) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: NAP.name,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    });
  }

  // ── SoftwareApplication — the two real products ───────────────────────────
  if (slug === 'business-os' || slug.startsWith('business-os/')) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/business-os#software`,
      name: 'Avani Business OS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}/business-os`,
      description: 'A unified business operating system covering HR, payroll, attendance, CRM, projects and finance, built for the client and deployed on their own infrastructure with no per-seat licensing.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        // No price: quoted per engagement. Omitted rather than invented.
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/contact`,
      },
    });
  }
  if (slug === 'social-sync' || slug.startsWith('social-sync/') || slug === 'social-media-scheduler') {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/social-sync#software`,
      name: 'Social Sync',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}/social-sync`,
      description: 'A social media scheduling and management platform covering Instagram, Facebook, LinkedIn, X and YouTube, with per-platform formatting, approval workflows and multi-brand management.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/contact`,
      },
    });
  }

  // BlogPosting for blog posts — dated, authored editorial content.
  if (post) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || undefined,
      datePublished: post.publishedAt || undefined,
      dateModified: post.updatedAt || post.publishedAt || undefined,
      // Reference the Organization by @id rather than inlining a second copy —
      // an inline node here minted a third Organization on every post.
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      image: post.featuredImage || undefined,
    });
  }

  // Article — guides only. Signals authored, dated editorial content, which is
  // what both Google and AI answer engines look for on informational queries.
  if (guide) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      datePublished: guide.published,
      dateModified: guide.updated,
      // Reference the Organization by @id rather than inlining a second copy —
      // an inline node here minted a third Organization on every post.
      author: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    });
  }

  // BreadcrumbList — mirrors the visible trail.
  if (slug) {
    const crumbs = [{ name: 'Home', url: SITE_URL }];
    if (guide) {
      crumbs.push({ name: 'Guides', url: `${SITE_URL}/guides` });
    } else if (post) {
      crumbs.push({ name: 'Blog', url: `${SITE_URL}/blog` });
    } else if (resolved && resolved.service) {
      crumbs.push({ name: 'Services', url: `${SITE_URL}/services` });
    }
    crumbs.push({ name: title.split(/\s+[|—]\s+/)[0].trim(), url: canonical });
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.name, item: c.url,
      })),
    });
  }

  // Service — what commercial service the page represents.
  if (resolved && resolved.service) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: resolved.location ? `${resolved.service.name} in ${resolved.location.city}` : resolved.service.name,
      serviceType: resolved.service.name,
      url: canonical,
      provider: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
      ...(resolved.location ? { areaServed: { '@type': 'Place', name: resolved.location.city } } : {}),
    });
  }

  // FAQPage — only for FAQs actually rendered on the page.
  if (faqs && faqs.length) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.slice(0, 8).map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  // HowTo — the engagement process, where we have real steps.
  if (resolved && resolved.service && Array.isArray(resolved.service.process) && resolved.service.process.length >= 3) {
    graphs.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How our ${resolved.service.name} engagement works`,
      step: resolved.service.process.map((s, i) => ({
        '@type': 'HowToStep', position: i + 1, name: s,
      })),
    });
  }

  // LocalBusiness — only where we hold a verified address.
  if (resolved && resolved.location) {
    const ld = localBusinessSchema(officeFor(resolved.location.key), canonical);
    if (ld) graphs.push(ld);
  }

  if (!graphs.length) return '';
  return graphs
    .map((g) => `<script type="application/ld+json">${JSON.stringify(g).replace(/</g, '\\u003c')}</script>`)
    .join('');
}

function faqHtml(faqs) {
  if (!faqs || !faqs.length) return '';
  return (
    '<section><h2>Frequently asked questions</h2><dl>' +
    faqs.slice(0, 8).map((f) => `<dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd>`).join('') +
    '</dl></section>'
  );
}

/**
 * Blog post body from the build-time snapshot.
 *
 * 52 published posts averaging ~1,300 words were completely invisible to search
 * engines because /blog/:slug fetched them in the browser. They are snapshotted
 * at build (scripts/snapshot-blog.cjs) and rendered here.
 *
 * Content is already sanitised at snapshot time — script, style, iframe and
 * event-handler attributes are stripped — so it is safe to emit as markup,
 * which preserves the headings and links that carry the SEO value.
 */
// Blog slugs are mixed-case and some contain spaces ("The SEO Playbook"), while
// path handling lowercases and the URL may arrive percent-encoded. This index
// resolves all four combinations back to the real key.
const BLOG_INDEX = Object.keys(blogContent).reduce((acc, k) => {
  acc[k.toLowerCase()] = k;
  return acc;
}, {});

/**
 * Resolve a URL path segment to a real blog key, or null.
 *
 * Handles four cases: the stored slug verbatim, a case difference, a
 * percent-encoded form, and a clean slug from blogSlugRedirects.js that maps
 * back to the messy slug the CMS still stores.
 */
function resolveBlogSlug(raw) {
  if (!raw) return null;

  const candidates = [raw];
  try { candidates.push(decodeURIComponent(raw)); } catch { /* malformed escape */ }
  // A clean slug resolves back to the original CMS key.
  candidates.slice().forEach((c) => {
    const stored = storedBlogSlug(c);
    if (stored !== c) candidates.push(stored);
  });

  for (const c of candidates) {
    if (blogContent[c]) return c;
    const lower = String(c).toLowerCase();
    if (BLOG_INDEX[lower]) return BLOG_INDEX[lower];
  }
  return null;
}

/**
 * Pull the FAQ pairs back out of a stored post so we can emit FAQPage schema.
 *
 * Queue-authored posts render their FAQs as an "Frequently asked questions" H2
 * followed by H3/paragraph pairs. Extracting them here means the schema always
 * describes FAQs that are genuinely visible on the page — which is what Google
 * requires — without needing a second source of truth.
 */
function extractFaqs(html) {
  const s = String(html || '');
  const start = s.search(/<h2[^>]*>\s*Frequently asked questions\s*<\/h2>/i);
  if (start === -1) return [];
  // Stop at the next H2 so the CTA section is not swept in.
  const rest = s.slice(start + 1);
  const nextH2 = rest.search(/<h2[^>]*>/i);
  const zone = nextH2 === -1 ? rest : rest.slice(0, nextH2);

  const faqs = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(zone)) !== null) {
    const q = m[1].replace(/<[^>]+>/g, '').trim();
    const a = m[2].replace(/<[^>]+>/g, '').trim();
    if (q && a) faqs.push({ q, a });
  }
  return faqs;
}

function buildBlogHtml(slug, post) {
  const parts = [
    '<nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Blog</a> / ' +
      `<span>${esc(post.title)}</span></nav>`,
    `<header><h1>${esc(post.title)}</h1>`,
    post.excerpt ? `<p>${esc(post.excerpt)}</p>` : '',
    `<p>By ${esc(post.author)}${post.publishedAt ? ` · ${esc(String(post.publishedAt).slice(0, 10))}` : ''}</p>`,
    '</header>',
    '<main>',
    // Key takeaways when the post stores them (drip-seeded posts do), otherwise
    // an AI Quick Summary derived from the post's own content. Both give an
    // answer engine something liftable above the fold; the stored version is
    // better because a human wrote it as a standalone claim.
    Array.isArray(post.keyTakeaways) && post.keyTakeaways.length
      ? '<aside aria-label="Key takeaways"><h2>Key Takeaways</h2><ul>' +
        post.keyTakeaways.map((t) => `<li>${esc(t)}</li>`).join('') +
        '</ul></aside>'
      : summaryHtml(blogSummary(post, slug)),
    // Same formatter the React page uses, so the crawler and the reader get
    // identical semantic markup — headings, lists and tables rather than a wall
    // of text. The prose styles ship inline so the SSR HTML is styled on its own.
    `<style>${PROSE_CSS}</style>`,
    `<div class="avani-article">${formatBlogBody(post.content, {
      title: post.title,
      // Never link a post to itself.
      selfPath: `/blog/${slug}`,
    })}</div>`,
    '</main>',
    '<footer><nav aria-label="Related"><ul>' +
      '<li><a href="/blog">All posts</a></li>' +
      '<li><a href="/guides">Guides</a></li>' +
      '<li><a href="/services">All Services</a></li>' +
      '<li><a href="/contact">Contact</a></li>' +
      '</ul></nav></footer>',
  ];
  // Stored FAQs win; otherwise they are lifted from the rendered body. Either
  // way the schema can only describe questions that are actually on the page.
  const storedFaqs = Array.isArray(post.faqs)
    ? post.faqs.filter((f) => f && f.q && f.a).map((f) => ({ q: f.q, a: f.a }))
    : [];

  // Stored FAQs are fields, not markup, so render them into the page too —
  // otherwise the FAQPage schema would describe content a crawler cannot see.
  if (storedFaqs.length) {
    parts.push(
      '<section aria-label="Frequently asked questions"><h2>Frequently Asked Questions</h2><dl>' +
      storedFaqs.map((f) => `<dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd>`).join('') +
      '</dl></section>'
    );
  }

  return {
    html: parts.filter(Boolean).join(''),
    faqs: storedFaqs.length ? storedFaqs : extractFaqs(post.content),
    resolved: null,
    post: Object.assign({ slug }, post),
  };
}

/**
 * HTML site index at /sitemap — the orphan fix.
 *
 * 89 pages had no inbound internal link from any other page's rendered body,
 * which tells Google they do not matter. This lists every indexable URL,
 * grouped, and is itself linked from every page's related-links footer. Read
 * from sitemap.xml so it cannot list something that is de-indexed.
 */
function buildSiteIndexHtml() {
  let locs = [];
  try {
    const p = ['public/sitemap.xml', 'dist/sitemap.xml', '/var/task/public/sitemap.xml']
      .find((x) => fs.existsSync(x));
    if (p) {
      locs = [...fs.readFileSync(p, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)]
        .map((m) => m[1].replace(SITE_URL, ''))
        .filter((u) => u && u !== '/');
    }
  } catch { /* fall through to the static nav below */ }

  const GROUPS = [
    ['Company', (u) => ['/about', '/services', '/contact', '/case-studies', '/projects', '/careers', '/courses', '/newsletters', '/global-presence', '/privacy-policy', '/terms-and-conditions'].includes(u)],
    ['Guides', (u) => u.startsWith('/guides')],
    ['Blog', (u) => u.startsWith('/blog')],
    ['Business OS', (u) => u.startsWith('/business-os')],
    ['Social Sync', (u) => u.startsWith('/social-sync') || /scheduler|social-media-(content|approval|client)|dm-tool|multi-brand/.test(u)],
    ['Comparisons', (u) => u.endsWith('-alternative')],
    ['Services by location', (u) => /-(gurgaon|gurugram|rohtak|delhi|noida|greater-noida|faridabad|ghaziabad|haryana|india|mumbai|bangalore|pune|hyderabad|chennai|kolkata|ahmedabad|jaipur|chandigarh|panipat|sonipat|karnal|hisar|ambala)$/.test(u)],
  ];

  const parts = [
    '<nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Site index</span></nav>',
    '<header><h1>Site Index</h1><p>Every page on avanienterprises.in, grouped. If you are looking for something specific, this is the fastest route to it.</p></header>',
    '<main>',
  ];

  const used = new Set();
  GROUPS.forEach(([name, match]) => {
    const group = locs.filter((u) => !used.has(u) && match(u));
    group.forEach((u) => used.add(u));
    if (!group.length) return;
    parts.push(`<section><h2>${esc(name)}</h2><ul>`);
    group.sort().forEach((u) => {
      const label = decodeURIComponent(u.replace(/^\//, '')).replace(/-/g, ' ').replace(/\//g, ' › ');
      parts.push(`<li><a href="${esc(u)}">${esc(label)}</a></li>`);
    });
    parts.push('</ul></section>');
  });

  const rest = locs.filter((u) => !used.has(u));
  if (rest.length) {
    parts.push('<section><h2>Services</h2><ul>');
    rest.sort().forEach((u) => {
      const label = decodeURIComponent(u.replace(/^\//, '')).replace(/-/g, ' ');
      parts.push(`<li><a href="${esc(u)}">${esc(label)}</a></li>`);
    });
    parts.push('</ul></section>');
  }

  parts.push('</main>');
  return { html: parts.join(''), faqs: [], resolved: null };
}

/**
 * Blog index, grouped by category.
 *
 * Rendered server-side so Googlebot sees the full post list rather than an empty
 * shell. The React page adds interactive filter chips on top of the same data;
 * the category headings here mean the grouping is crawlable either way, and each
 * post keeps a real inbound link.
 */
function buildBlogIndexHtml(activeCategory) {
  const entries = Object.entries(blogContent)
    .sort((a, b) => String(b[1].publishedAt || '').localeCompare(String(a[1].publishedAt || '')));

  // Category counts, most populated first.
  const counts = {};
  entries.forEach(([, p]) => { const c = p.category || 'Insights'; counts[c] = (counts[c] || 0) + 1; });
  const categories = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  const active = activeCategory && categories.some((c) => slugifyCat(c) === activeCategory)
    ? categories.find((c) => slugifyCat(c) === activeCategory)
    : null;

  const shown = active ? entries.filter(([, p]) => (p.category || 'Insights') === active) : entries;

  const parts = [
    '<nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Blog</span>' +
      (active ? ` / <span>${esc(active)}</span>` : '') + '</nav>',
    `<header><h1>${active ? esc(active) + ' articles' : 'Blog'}</h1>` +
      `<p>Writing from client work on web development, technical SEO, Google and Meta Ads, and applied AI. ` +
      `${entries.length} articles across ${categories.length} categories.</p></header>`,
    '<nav aria-label="Categories"><h2>Browse by category</h2><ul>',
    `<li><a href="/blog">All (${entries.length})</a></li>`,
    ...categories.map((c) => `<li><a href="/blog/category/${slugifyCat(c)}">${esc(c)} (${counts[c]})</a></li>`),
    '</ul></nav>',
    '<main>',
  ];

  if (active) {
    parts.push('<ul>');
    shown.forEach(([slug, p]) => parts.push(cardHtml(slug, p)));
    parts.push('</ul>');
  } else {
    // Group by category so the crawler sees the same structure a user filters to.
    categories.forEach((c) => {
      const group = entries.filter(([, p]) => (p.category || 'Insights') === c);
      if (!group.length) return;
      parts.push(`<section><h2 id="${slugifyCat(c)}">${esc(c)}</h2><ul>`);
      group.forEach(([slug, p]) => parts.push(cardHtml(slug, p)));
      parts.push('</ul></section>');
    });
  }

  parts.push('</main>');
  parts.push('<footer><nav><ul><li><a href="/guides">Guides</a></li><li><a href="/services">All Services</a></li><li><a href="/contact">Contact</a></li></ul></nav></footer>');
  return { html: parts.join(''), faqs: [], resolved: null, blogIndex: { categories, counts, active } };
}

/** URL-safe category slug. */
function slugifyCat(c) {
  return String(c || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** One post card in the server-rendered index. */
function cardHtml(slug, p) {
  const href = `/blog/${encodeURIComponent(cleanBlogSlug(slug))}`;
  const date = p.publishedAt ? String(p.publishedAt).slice(0, 10) : '';
  const meta = [
    p.category ? esc(p.category) : '',
    p.readTime ? `${p.readTime} min read` : '',
    date,
    typeof p.views === 'number' && p.views > 0 ? `${p.views} views` : '',
  ].filter(Boolean).join(' · ');

  return (
    `<li><article>` +
    `<h3><a href="${esc(href)}">${esc(p.title)}</a></h3>` +
    (p.excerpt ? `<p>${esc(p.excerpt)}</p>` : '') +
    (meta ? `<p>${meta}</p>` : '') +
    `</article></li>`
  );
}

/** Strip the **bold** markers the guide copy uses, for plain-HTML output. */
function inlineHtml(text) {
  return esc(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/** Full server-rendered guide: takeaways, sections, FAQs and the cluster link. */
/** Render an AI Quick Summary block from a list of factual lines. */
function summaryHtml(lines) {
  if (!lines || !lines.length) return '';
  return (
    '<section aria-label="Quick summary"><h2>AI Quick Summary</h2><ul>' +
    lines.map((l) => `<li>${esc(l)}</li>`).join('') +
    '</ul></section>'
  );
}

/**
 * Derive an AI Quick Summary for a blog post from its own content.
 * Uses the excerpt plus the first sentence of each early section, so the block
 * is specific to the post rather than a generic template.
 */
function blogSummary(post, slug) {
  const text = String(post.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const lines = [];
  if (post.excerpt) lines.push(post.excerpt.trim());

  // Section headings make good quotable scaffolding for an answer engine.
  const headings = [...String(post.content || '').matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').trim())
    .filter((h) => h && !/^(frequently asked|key takeaways|ai quick summary)/i.test(h));
  if (headings.length) {
    lines.push(`This article covers ${listOf(headings.slice(0, 4))}.`);
  }

  // First substantive sentence, as the answer-first statement.
  const firstSentence = (text.match(/[^.!?]{60,240}[.!?]/) || [])[0];
  if (firstSentence && (!post.excerpt || !post.excerpt.startsWith(firstSentence.slice(0, 40)))) {
    lines.push(firstSentence.trim());
  }

  const words = text.split(' ').filter(Boolean).length;
  lines.push(`Roughly a ${Math.max(1, Math.round(words / 200))}-minute read, published by Avani Enterprises${post.publishedAt ? ` on ${String(post.publishedAt).slice(0, 10)}` : ''}.`);
  lines.push('Avani Enterprises is a digital, product and AI studio with offices in Gurugram and Rohtak, India.');
  return lines.filter(Boolean).slice(0, 6);
}

function listOf(items) {
  const a = (items || []).filter(Boolean);
  if (!a.length) return '';
  if (a.length === 1) return a[0];
  return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
}

function buildGuideHtml(slug, g) {
  const parts = [
    '<nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/guides">Guides</a> / ' +
      `<span>${esc(g.title)}</span></nav>`,
    `<header><h1>${esc(g.title)}</h1><p>${esc(g.description)}</p>`,
    `<p>Last updated ${esc(g.updated)}</p></header>`,
    '<main>',
    // Key takeaways first — this is the block AI answer engines lift most readily.
    '<section aria-label="Quick summary"><h2>AI Quick Summary</h2><ul>',
    ...g.takeaways.map((t) => `<li>${esc(t)}</li>`),
    '</ul></section>',
  ];

  g.sections.forEach((s) => {
    parts.push(`<section><h2>${esc(s.heading)}</h2>`);
    s.paragraphs.forEach((p) => parts.push(`<p>${inlineHtml(p)}</p>`));
    parts.push('</section>');
  });

  parts.push(faqHtml(g.faqs));

  parts.push(
    `<section><h2>Work with us on this</h2>` +
    `<p>We start every engagement with a written scope after a free discovery call.</p>` +
    `<p><a href="/${esc(g.service)}">${esc(g.serviceLabel)}</a></p></section>`
  );

  if (g.related && g.related.length) {
    parts.push('<nav aria-label="Related guides"><h2>Related guides</h2><ul>');
    g.related.forEach((r) => {
      const rg = GUIDES[r];
      if (rg) parts.push(`<li><a href="/guides/${esc(r)}">${esc(rg.title)}</a></li>`);
    });
    parts.push('</ul></nav>');
  }

  parts.push('</main>');
  parts.push(
    '<footer><nav aria-label="Related"><ul>' +
    `<li><a href="/guides">All guides</a></li>` +
    `<li><a href="/${esc(g.service)}">${esc(g.serviceLabel)}</a></li>` +
    '<li><a href="/services">All Services</a></li><li><a href="/contact">Contact</a></li>' +
    '</ul></nav></footer>'
  );

  return { html: parts.join(''), faqs: g.faqs, resolved: null, guide: Object.assign({ slug }, g) };
}

/** The guides hub — gives every guide a crawlable internal link. */
function buildGuidesIndexHtml() {
  const entries = Object.entries(GUIDES);
  const parts = [
    '<nav aria-label="Breadcrumb"><a href="/">Home</a> / <span>Guides</span></nav>',
    '<header><h1>Guides</h1><p>Practical guides on web development cost, choosing an SEO agency, ' +
    'Google versus Meta ads, AI chatbots and voice agents, CRM build-or-buy, and why Google refuses ' +
    'to index pages.</p></header><main><ul>',
  ];
  entries.forEach(([slug, g]) => {
    parts.push(
      `<li><h2><a href="/guides/${esc(slug)}">${esc(g.title)}</a></h2>` +
      `<p>${esc(g.description)}</p></li>`
    );
  });
  parts.push('</ul></main>');
  parts.push('<footer><nav><ul><li><a href="/services">All Services</a></li><li><a href="/contact">Contact</a></li></ul></nav></footer>');
  return { html: parts.join(''), faqs: [], resolved: null };
}

/**
 * Build the unique body for a route.
 *
 * Every non-home route gets something page-specific. Where the content engine or
 * the page registry has real content we render that; otherwise we fall back to
 * the page's own (already unique) title and description plus the link graph.
 * The one thing we must never do is serve the shell's shared homepage copy,
 * because that is what made all 455 URLs look identical to the crawler.
 *
 * Returns null only for "/", which keeps its own hand-written fallback.
 */
function buildUniqueBodyHtml(pagePath, title, description, runtimePost) {
  const slug = String(pagePath || '/').toLowerCase().replace(/^\/+/, '').replace(/\/+$/, '');
  // The homepage now has real content in STATIC_PAGES.home; it no longer keeps
  // the generic shell copy, which was only 386 words and shared with nothing.

  // STATIC_PAGES covers the hand-built React pages (/about, /services, …) that
  // have no registry entry; without it they all fell back to the shared shell.
  // ── Guides ────────────────────────────────────────────────────────────────
  // Rendered here in full because these are the topical-depth pages: they need
  // to be readable by the crawler and by AI answer engines on the first fetch.
  const guideSlug = slug.startsWith('guides/') ? slug.slice(7) : null;
  if (guideSlug && GUIDES[guideSlug]) {
    return buildGuideHtml(guideSlug, GUIDES[guideSlug]);
  }
  if (slug === 'guides') {
    return buildGuidesIndexHtml();
  }

  // ── HTML site index ───────────────────────────────────────────────────────
  // Every indexable URL gets at least one crawlable inbound link from here, so
  // no page is orphaned and nothing sits more than three clicks from the home
  // page. Built from the sitemap so it can never drift from what is indexable.
  if (slug === 'sitemap') {
    return buildSiteIndexHtml();
  }

  // ── Blog ──────────────────────────────────────────────────────────────────
  const blogSlug = slug.startsWith('blog/') ? resolveBlogSlug(slug.slice(5)) : null;
  if (blogSlug && (blogContent[blogSlug] || runtimePost)) {
    // Snapshot first (instant, no backend dependency); runtimePost only exists
    // for posts published since the last deploy.
    return buildBlogHtml(blogSlug, blogContent[blogSlug] || runtimePost);
  }
  if (slug === 'blog') {
    return buildBlogIndexHtml(null);
  }
  // /blog/category/<slug> — the crawlable form of the filter. The query-string
  // variant (?category=) canonicalises here so the two never compete.
  if (slug.startsWith('blog/category/')) {
    return buildBlogIndexHtml(slug.slice('blog/category/'.length));
  }

  const stored = ssrContent[slug] || STATIC_PAGES[slug || 'home'] || null;
  const resolved = resolvePage(pagePath);
  const block = resolved ? uniqueBlock(resolved) : null;

  // Titles read "Page Name | Avani Enterprises" — strip the brand for the H1.
  const titleH1 = String(title || '').split(/\s+[|—-]\s+/)[0].trim();

  const h1 = (stored && stored.h1) || (block && block.heading) || titleH1;
  // Prefer the generated lead over the registry's intro: the stored intro is the
  // old "Operating successfully in {City}…" template with the city swapped, which
  // is near-identical across pages. Block.lead is built from real local facts.
  const intro = (block && block.lead) || (stored && stored.intro) || description || '';
  if (!h1) return null;

  // Visible breadcrumb, mirroring the BreadcrumbList schema. Google expects the
  // trail to exist on the page, not only in JSON-LD.
  const crumbHtml =
    '<nav aria-label="Breadcrumb"><a href="/">Home</a> / ' +
    (resolved && resolved.service ? '<a href="/services">Services</a> / ' : '') +
    `<span>${esc(h1)}</span></nav>`;

  const parts = [
    crumbHtml,
    `<header><h1>${esc(h1)}</h1>${intro ? `<p>${esc(intro)}</p>` : ''}</header>`,
    '<main>',
  ];

  // AI Quick Summary — placed immediately after the H1 because answer engines
  // weight early, self-contained factual statements most heavily. Generated from
  // this page's own resolved data, so no two pages produce the same box.
  // Static pages carry their own summary lines; everything else derives one.
  let summary = resolved ? aiSummary(resolved) : [];
  if (!summary.length && stored && stored.aiSummary) summary = stored.aiSummary;
  if (!summary.length && stored && stored.sections) {
    // Fall back to the page's own headings and intro — still page-specific.
    const heads = stored.sections.map((x) => x.heading).filter(Boolean);
    summary = [
      stored.intro,
      heads.length ? 'This page covers ' + listOf(heads.slice(0, 4)) + '.' : '',
      'Avani Enterprises is a digital, product and AI studio with offices in Gurugram and Rohtak, India.',
      'Contact: +91 84487 63134 or kp@avanienterprises.in.',
    ].filter(Boolean);
  }
  if (summary.length) {
    parts.push('<section aria-label="Quick summary"><h2>AI Quick Summary</h2><ul>');
    summary.forEach((line) => parts.push(`<li>${esc(line)}</li>`));
    parts.push('</ul></section>');
  }

  if (block) {
    // Do not repeat the lead when it already ran as the intro above.
    parts.push(`<section><h2>${esc(block.heading)}</h2>${intro === block.lead ? '' : `<p>${esc(block.lead)}</p>`}`);

    if (block.localFacts.length) {
      parts.push('<dl>');
      block.localFacts.forEach((f) => parts.push(`<dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`));
      parts.push('</dl>');
    }

    block.facts.forEach((group) => {
      parts.push(`<h3>${esc(group.label)}</h3><ul>`);
      group.items.forEach((item) => parts.push(`<li>${esc(item)}</li>`));
      parts.push('</ul>');
    });

    if (block.meta.length) {
      parts.push('<dl>');
      block.meta.forEach((m) => parts.push(`<dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd>`));
      parts.push('</dl>');
    }

    // Genuinely local long-form sections — the depth that gets city pages past
    // the 600-word bar on facts rather than filler.
    (block.bodyBlocks || []).forEach((b) => {
      parts.push(`<h3>${esc(b.heading)}</h3>`);
      b.paragraphs.forEach((p) => parts.push(`<p>${esc(p)}</p>`));
    });

    // Hub-and-spoke: city pages link up to the service page that holds full detail.
    if (block.hubLink) {
      parts.push(`<p><a href="${block.hubLink.href}">${esc(block.hubLink.label)}</a></p>`);
    }

    if (block.ymyl) {
      parts.push(
        '<p><strong>Important:</strong> Avani Enterprises provides advisory and facilitation ' +
        'support only. We are not a lender, insurer, or a licensed investment adviser. All ' +
        'lending, underwriting, pricing and approval decisions rest with the respective ' +
        'regulated provider, and their policy documents govern. Nothing on this page is an ' +
        'offer, a guarantee of approval, or regulated financial advice.</p>'
      );
    }
    parts.push('</section>');
  }

  // Benefit / feature cards authored per page. On product pages these carry most
  // of the real content, since the long-form sections are shared family-wide.
  if (stored && stored.cards && stored.cards.length) {
    parts.push('<section><h2>Key capabilities</h2><dl>');
    stored.cards.forEach((c) => parts.push(`<dt>${esc(c.title)}</dt><dd>${esc(c.desc)}</dd>`));
    parts.push('</dl></section>');
  }

  // Long-form sections authored per page (product/location registry)
  if (stored && stored.sections && stored.sections.length) {
    stored.sections.forEach((s) => {
      parts.push(`<section><h2>${esc(s.heading)}</h2>`);
      (s.paragraphs || []).forEach((p) => parts.push(`<p>${esc(p)}</p>`));
      parts.push('</section>');
    });
  }

  // FAQs: page-unique ones first, then the page's own, de-duplicated by question.
  const seen = new Set();
  const faqs = [];
  ((block && block.faqs) || []).concat((stored && stored.faqs) || []).forEach((f) => {
    if (!f || !f.q) return;
    const key = f.q.toLowerCase().trim();
    if (seen.has(key)) return;
    seen.add(key);
    faqs.push(f);
  });
  parts.push(faqHtml(faqs));

  // Honest comparison block on *-alternative pages, including the rows where the
  // competitor genuinely wins. A comparison that concedes nothing is not a
  // comparison, and Googlebot reads this on the first pass.
  const cmp = comparisonFor(pagePath);
  if (cmp) {
    parts.push(`<section><h2>Avani Enterprises vs ${esc(cmp.competitor)}</h2>`);
    parts.push(`<p>${esc(cmp.theirPositioning)}</p>`);
    parts.push(`<h3>When ${esc(cmp.competitor)} is the better choice</h3>`);
    parts.push(`<p>${esc(cmp.theirStrength)}</p>`);
    parts.push(`<p>Better for: ${esc(cmp.betterFor)}</p>`);
    parts.push(
      '<table><thead><tr><th>Factor</th><th>Avani Enterprises</th>' +
      `<th>${esc(cmp.competitor)}</th></tr></thead><tbody>`
    );
    cmp.rows.forEach((r) => {
      parts.push(
        `<tr><td>${esc(r.metric)}</td>` +
        `<td>${esc(r.avani)}${r.winner === 'avani' ? ' (advantage: Avani)' : ''}</td>` +
        `<td>${esc(r.competitor)}${r.winner === 'competitor' ? ` (advantage: ${esc(cmp.competitor)})` : ''}</td></tr>`
      );
    });
    parts.push('</tbody></table>');
    parts.push(`<h3>Our verdict</h3><p>${esc(cmp.verdict)}</p>`);
    parts.push(
      `<p><em>The ${esc(cmp.competitor)} column reflects publicly stated positioning, not a tested ` +
      `assessment. Please verify current details with ${esc(cmp.competitor)} directly. ` +
      `Last reviewed ${esc(cmp.reviewedOn)}.</em></p>`
    );
    parts.push('</section>');
  }

  // Location section. Two distinct shapes, and the difference matters:
  //
  //   confirmed office  → visible NAP, opening hours and a directions link, so
  //                       Google can match the address to the Business Profile.
  //   sell-only market  → coverage copy ONLY. No address, no opening hours, no
  //                       directions link and no map. Anything that implies a
  //                       physical presence we do not have risks a GBP
  //                       suspension, which is far worse than ranking lower.
  const office = resolved && resolved.location ? officeFor(resolved.location.key) : null;
  if (office) {
    const confirmed = !!office.confirmed;
    const addr = confirmed ? formatAddress(office) : null;

    parts.push(
      confirmed
        ? `<section><h2>${esc(NAP.name)} in ${esc(office.city)}</h2>`
        : `<section><h2>Serving ${esc(office.city)}</h2>`
    );
    parts.push(`<p>${esc(office.localNote)}</p>`);

    if (confirmed && addr) {
      parts.push(
        `<address>${esc(NAP.name)}, ${esc(addr)}. ` +
        `Phone: <a href="tel:${esc(NAP.phone)}">${esc(NAP.phoneDisplay)}</a>. ` +
        `Email: <a href="mailto:${esc(NAP.email)}">${esc(NAP.email)}</a>.</address>`
      );
      parts.push(`<p>Open Monday to Saturday, 9:00 am to 7:00 pm IST. <a href="${esc(mapLinkUrl(office))}">Get directions</a>.</p>`);
    } else {
      // Contact details without an address — true for a remote-served market.
      parts.push(
        `<p>Talk to us on <a href="tel:${esc(NAP.phone)}">${esc(NAP.phoneDisplay)}</a> ` +
        `or <a href="mailto:${esc(NAP.email)}">${esc(NAP.email)}</a>.</p>`
      );
    }

    if (office.areasServed && office.areasServed.length) {
      parts.push(`<p>Areas we cover in ${esc(office.city)}: ${esc(office.areasServed.join(', '))}.</p>`);
    }
    parts.push('</section>');
  }

  parts.push('</main>');
  parts.push(`<footer>${internalLinksHtml(pagePath, resolved)}</footer>`);

  // faqs and resolved are returned so the caller can emit matching JSON-LD.
  // Schema must describe what is actually on the page, so it is derived from the
  // same values rather than recomputed.
  return { html: parts.join(''), faqs, resolved };
}

export default async function handler(req, res) {
  try {
    const pagePath = req.query.path || "/";
    const normalizedPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;

    // ── 0a. Consolidated page 301s ──────────────────────────────────────────
    // The Social Sync scheduler clones (94% similar to each other) redirect to
    // the single deep hub. 301 rather than canonical: these pages have no
    // independent value to preserve.
    const consolidated = redirectTarget(normalizedPath);
    if (consolidated) {
      res.setHeader('Location', `/${consolidated}`);
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.status(301).send(`Moved permanently to /${consolidated}`);
    }

    // ── 0. Blog slug 301s ───────────────────────────────────────────────────
    // Twelve posts had slugs containing spaces, commas, pipes and colons. Those
    // URLs are unreadable once percent-encoded, so they redirect permanently to
    // a clean equivalent. 301 (not 302) so ranking signals transfer.
    if (normalizedPath.toLowerCase().startsWith('/blog/')) {
      const seg = normalizedPath.slice(6);
      let decoded = seg;
      try { decoded = decodeURIComponent(seg); } catch { /* malformed escape */ }
      if (needsRedirect(decoded)) {
        const target = `/blog/${cleanBlogSlug(decoded)}`;
        res.setHeader('Location', target);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.status(301).send(`Moved permanently to ${target}`);
      }
    }

    // ── 0c. Unknown routes get a real 404 ───────────────────────────────────
    // vercel.json rewrites everything unmatched into this function, which used
    // to render the shell and self-canonicalise it — so /any-typo-at-all came
    // back HTTP 200 with `index,follow`. That is an unbounded indexable URL
    // space, and it is what fills the "Soft 404" bucket in Search Console.
    //
    // The body stays the SPA shell so React still renders the designed NotFound
    // page; only the status, the robots directive and the canonical change.
    const routeExists = isValidRoute(normalizedPath);

    // ── 1. Fetch SEO from backend ───────────────────────────────────────────
    //
    // ⚠️ The backend answers EVERY path, including ones it holds no record for.
    // For those it returns a placeholder flagged `isDefault: true`:
    //
    //   {"success":true,"isDefault":true,"data":{
    //      "title":"Build high-performing Solutions & accelerate Growth.", …}}
    //
    // That placeholder used to be accepted as a real override, and because
    // `seo?.title` led the title fallback chain it won on every page with no
    // CMS entry — ~94% of the site. All of those URLs served one meaningless
    // <title>, <og:title> and <twitter:title>. The flag is now honoured.
    //
    // Skipped entirely for unknown routes: there is no CMS record that can
    // override a 404, and it is wasted latency on exactly the requests least
    // worth spending it on.
    let seo = null;
    if (routeExists) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), SEO_FETCH_TIMEOUT_MS);

      try {
        const fetchUrl = `${BACKEND_URL}/seo?page=${encodeURIComponent(normalizedPath)}`;
        const response = await fetch(fetchUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
          const data = await response.json();
          if (data && data.data && !data.isDefault) seo = data.data;
        }
      } catch (e) {
        clearTimeout(timeoutId);
        if (e.name === 'AbortError') {
          console.error(`❌ SEO fetch timed out for ${normalizedPath}`);
        } else {
          console.error(`❌ Failed to fetch SEO for ${normalizedPath}:`, e.message);
        }
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
      let debugStr = `template.html not found. Paths tried: ${pathsToTry.join(', ')}\n`;
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
    const lookupKey = normalizedPath.toLowerCase();
    const fallbackSeo = STATIC_SEO_LOOKUP[lookupKey] || newSeoData[lookupKey];

    // A description built from the page's real service/location facts beats the
    // templated one, so it is preferred over the generic site-wide fallback.
    const resolvedForMeta = resolvePage(normalizedPath);
    const derivedDescription = resolvedForMeta ? pageDescription(resolvedForMeta) : null;
    // Page-unique title for routes with no registry entry, so they stop sharing
    // one generic site-wide title and competing with each other.
    const derivedTitle = resolvedForMeta ? pageTitle(resolvedForMeta) : null;

    // The page registries carry their own title/description; prefer those over
    // the site-wide default so a newly-added page never falls back to it.
    const cleanSlug = normalizedPath.replace(/^\/+/, '').replace(/\/+$/, '');
    const registrySeo = ssrContent[cleanSlug] || null;

    // Guides carry their own meta.
    const guideEntry = cleanSlug.startsWith('guides/') ? GUIDES[cleanSlug.slice(7)] : null;
    // Hand-built static pages carry their own meta in STATIC_PAGES.
    // '' is the homepage; STATIC_PAGES keys it as 'home'.
    const staticEntry = STATIC_PAGES[cleanSlug || 'home'] || null;
    const staticSeo = staticEntry && staticEntry.metaTitle
      ? { title: staticEntry.metaTitle, description: staticEntry.metaDescription }
      : null;

    const guideSeo = guideEntry
      ? { title: guideEntry.metaTitle, description: guideEntry.description }
      : cleanSlug === 'guides'
        ? {
            title: 'Guides — Web, SEO, Ads and AI | Avani Enterprises',
            description: 'Practical guides on web development cost, choosing an SEO agency, Google vs Meta ads, AI chatbots and voice agents, CRM build-or-buy, and why Google refuses to index pages.',
          }
        : null;

    // Blog posts carry their own meta from the snapshot.
    const rawBlogSlug = cleanSlug.startsWith('blog/') ? cleanSlug.slice(5) : null;
    const decodedBlogSlug = resolveBlogSlug(rawBlogSlug) || rawBlogSlug;
    const blogEntry = decodedBlogSlug ? blogContent[decodedBlogSlug] : null;
    const blogSeo = blogEntry
      ? {
          // shortenTitle() adds the brand when it fits, so do not append here.
          title: blogEntry.title,
          description: blogEntry.excerpt || String(blogEntry.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155),
        }
      : null;

    // Blog category pages carried no meta of their own, so all eight fell
    // through to the site-wide default and shared the homepage's title with it.
    // Derived from the live category list, so a new category is covered the
    // moment a post is filed under it.
    const blogCategorySeo = (() => {
      const lower = cleanSlug.toLowerCase();
      if (!lower.startsWith('blog/category/')) return null;
      const wanted = lower.slice(14).replace(/\/+$/, '');
      if (!wanted) return null;
      const counts = {};
      Object.values(blogContent).forEach((bp) => {
        const c = bp.category || 'Insights';
        counts[c] = (counts[c] || 0) + 1;
      });
      const name = Object.keys(counts).find((c) => slugifyCat(c) === wanted);
      if (!name) return null;
      return {
        title: `${name} Articles — Avani Enterprises Blog`,
        description:
          `${counts[name]} articles on ${name.toLowerCase()} from Avani Enterprises, written from client work rather than theory. ` +
          `What we build, what we measure, and what actually moved the number.`,
      };
    })();

    // Ordered to mirror rawDescription below: the page's own hand-written copy
    // leads, the CMS override sits behind it, generated copy is the backstop.
    //
    // This used to lead with `seo?.title`, which is how one backend placeholder
    // became the <title> of ~94% of the site, and how a stale CMS row put
    // "Digital Marketing Company in Delhi" on /contact while its real title sat
    // unused in STATIC_PAGES. A deliberate CMS edit still wins over generated
    // copy — it just no longer outranks copy written for the route.
    const rawTitle =
      (!routeExists && 'Page not found — Avani Enterprises') ||
      staticSeo?.title ||       // hand-written static pages (home, about, contact …)
      guideSeo?.title ||        // guides carry their own meta
      blogSeo?.title ||         // blog posts carry their own meta
      blogCategorySeo?.title || // /blog/category/<slug>
      fallbackSeo?.title ||     // hand-written STATIC_SEO_LOOKUP / newSeoData
      registrySeo?.title ||     // per-page titles from newSeoPagesData
      seo?.title ||             // genuine CMS override (never a default record)
      derivedTitle ||           // generated from real service + location facts
      "Avani Enterprises — Digital, Product & AI Studio";
    // Trimmed to what Google actually renders — see shortenTitle().
    const title       = shortenTitle(rawTitle);
    // The generated description is preferred because it is always fitted to the
    // 140–160 band Google renders in full; registry copy is frequently ~112
    // characters, which wastes a third of the snippet.
    const rawDescription =
      staticSeo?.description ||
      blogCategorySeo?.description ||
      derivedDescription ||
      seo?.metaDescription ||
      guideSeo?.description ||
      blogSeo?.description ||
      fallbackSeo?.description ||
      registrySeo?.description ||
      'Digital, product and AI studio in Gurugram and Rohtak — web and app development, SEO, paid media and AI systems delivered by one team.';

    const description = fitDescription(rawDescription, [
      'Free scope call and a written quote before any work starts.',
      'Offices in Gurugram and Rohtak.',
      'Delivering across India and internationally.',
    ]);
    const canonical   = seo?.canonicalUrl     || buildCanonical(normalizedPath);
    // "noindex,follow" — not nofollow. De-indexed doorway pages should still pass
    // link equity through to the pages we keep.
    // A 404 must never invite indexing. De-indexed doorway slugs stay
    // "noindex,follow" so link equity keeps flowing to the pages we keep; a
    // genuinely missing page gets "noindex,nofollow" — there is nothing on it
    // worth following.
    const robots      = !routeExists
      ? "noindex,nofollow"
      : isNoIndex(normalizedPath) ? "noindex,follow" : (seo?.robots || "index,follow");
    const ogImage     = seo?.ogImage          || `${SITE_URL}/logo0.webp`;

    // ── 4. Inject into HTML (server-side, visible to Googlebot on first crawl) ─
    html = html
      // Title
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, `<title>${title}</title>`)
      .replace(/__SEO_TITLE__/g,       title)
      // Description
      .replace(/__SEO_DESCRIPTION__/g, description)
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
      { id: 'og:title',            val: title       },
      { id: 'twitter:title',       val: title       },
      { id: 'og:url',              val: canonical   },
      { id: 'robots',              val: robots      },
    ];

    metas.forEach(({ id, val }) => {
      const regex = new RegExp(`(<meta\\s+[^>]*?(?:name|property)=["']${id}["'][^>]*?\\s+content=)["'].*?["']`, 'gi');
      html = html.replace(regex, `$1"${val}"`);
    });

    // Remove the stuffed <meta name="keywords"> entirely. Google ignores it and
    // the long comma-separated lists these pages carried read as a spam signal.
    html = html.replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, '');

    // A 404 must not nominate itself as canonical — that is precisely the signal
    // that invites indexing of a page which does not exist.
    if (!routeExists) {
      html = html.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '');
    }

    // ── 4a. Per-route body content (the fix for "Crawled – not indexed") ────
    // Replace the shell's shared homepage block with this page's real content so
    // Googlebot's first pass sees unique HTML rather than the same 455 copies.
    // Runtime fallback for a blog post published since the last deploy. Only
    // fires when the slug is genuinely missing from the snapshot, so the
    // common case never pays for a backend round trip.
    let runtimePost = null;
    const maybeBlogSlug = decodedBlogSlug;
    if (maybeBlogSlug && !blogContent[maybeBlogSlug]) {
      try {
        const c = new AbortController();
        const t = setTimeout(() => c.abort(), SEO_FETCH_TIMEOUT_MS);
        const r = await fetch(`${BACKEND_URL}/blogs/${encodeURIComponent(maybeBlogSlug)}`, { signal: c.signal });
        clearTimeout(t);
        if (r.ok) {
          const j = await r.json();
          const p = j && j.data;
          if (p && p.isPublished) {
            runtimePost = {
              title: p.title || '',
              excerpt: p.excerpt || '',
              // Same sanitisation as the build-time snapshot.
              content: String(p.content || '')
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
                .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
                .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
                .replace(/javascript:/gi, ''),
              author: p.author || 'Avani Enterprises',
              publishedAt: p.publishedAt || p.createdAt || '',
              updatedAt: p.updatedAt || p.publishedAt || '',
            };
          }
        }
      } catch {
        /* fall through — the SPA still renders it client-side */
      }
    }

    // A 404 gets its own minimal body and no JSON-LD. Serving the homepage
    // fallback block here is what made missing pages look like real content in
    // the first place, and schema describing a page that does not exist is
    // worse than no schema at all.
    const built = routeExists
      ? buildUniqueBodyHtml(normalizedPath, title, description, runtimePost)
      : {
          html:
            '<main><h1>Page not found</h1>' +
            '<p>This page does not exist. It may have moved, or the link may be mistyped.</p>' +
            '<ul>' +
            `<li><a href="${SITE_URL}/">Home</a></li>` +
            `<li><a href="${SITE_URL}/services">Services</a></li>` +
            `<li><a href="${SITE_URL}/guides">Guides</a></li>` +
            `<li><a href="${SITE_URL}/contact">Contact</a></li>` +
            '</ul></main>',
          faqs: [],
          resolved: null,
          skipSchema: true,
        };
    if (built) {
      const start = html.indexOf(SSR_START);
      const end = html.indexOf(SSR_END);
      if (start !== -1 && end !== -1 && end > start) {
        html =
          html.slice(0, start + SSR_START.length) +
          built.html +
          html.slice(end);
      } else {
        console.warn(`⚠️ SSR content markers missing in template.html — ${normalizedPath} served shared body`);
      }

      // Per-route JSON-LD in the head, describing what the body above actually says.
      if (!built.skipSchema) {
        const ld = schemaHtml(normalizedPath, canonical, title, built.resolved, built.guide || null, built.faqs, built.post || null);
        if (ld) html = html.replace(/<\/head>/i, `${ld}</head>`);
      }
    }

    // ── 4b. Homepage-only LCP preload ───────────────────────────────────────
    // Preload the hero background image (the LCP element on "/") so it begins
    // downloading during HTML parse instead of after the JS bundle mounts and
    // React renders the hero. Injected only for "/" because the SPA shares one
    // template — preloading it globally would waste the download on every route.
    if (normalizedPath === "/") {
      // Self-hosted, so the LCP no longer waits on a DNS lookup and TLS
      // handshake to a third-party image host. Imagesrcset mirrors the <img>
      // in Hero.tsx exactly — if the two drift, the browser downloads twice.
      const heroPreload =
        '<link rel="preload" as="image" fetchpriority="high" ' +
        'href="/hero-office-1280.webp" ' +
        'imagesrcset="/hero-office-800.webp 800w, /hero-office-1280.webp 1280w, /hero-office-1600.webp 1600w" ' +
        'imagesizes="100vw">';
      html = html.replace(/<\/head>/i, `${heroPreload}</head>`);
    }

    // ── 5. noindex: also set X-Robots-Tag HTTP header for Googlebot ────────
    if (!routeExists) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    } else if (isNoIndex(normalizedPath)) {
      res.setHeader('X-Robots-Tag', 'noindex, follow');
    }

    res.setHeader('Content-Type', 'text/html');

    // The browser still revalidates on every navigation, so a new deploy's
    // bundle is picked up immediately. `s-maxage` lets Vercel's edge answer
    // repeat crawls and repeat visitors without re-running this function —
    // which was costing ~1s of TTFB on every single request. Vercel purges the
    // edge cache on deploy, so a cached shell can never outlive its assets.
    res.setHeader(
      'Cache-Control',
      routeExists
        ? 'public, max-age=0, must-revalidate, s-maxage=3600, stale-while-revalidate=86400'
        : 'public, max-age=0, must-revalidate, s-maxage=60'
    );

    res.status(routeExists ? 200 : 404).send(html);
  } catch (err) {
    console.error("❌ Vercel SEO Error:", err);
    res.status(500).send("Internal Server Error");
  }
}
