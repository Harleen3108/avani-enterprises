import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { newSeoData } from './newSeoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL    = "https://www.avanienterprises.in";
const BACKEND_URL = "https://avani-enterprises-backend-1.onrender.com";

// Routes that must never be indexed by search engines
// (utility / auth / internal pages that have no search intent)
const NOINDEX_PATHS = new Set([
  "/thank-you",
  "/links",
  "/admin",
  "/salary-hike-calculator",
  "/social-media-content-planner",
  "/auto-dm-tool",
  "/bulk-dm-tool",
  "/instagram-reels-scheduler",
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

const STATIC_SEO_LOOKUP = {
  // Batch B (12 city pages)
  "/seo-company-mumbai": {
    title: "SEO Company in Mumbai | Avani Enterprises",
    description: "Avani Enterprises is an SEO company in Mumbai driving 3x organic traffic for BKC, Lower Parel & Andheri businesses. 95% first-page success, 8+ years. Get a free SEO audit.",
    keywords: "seo company mumbai, seo services mumbai, seo agency mumbai, local seo mumbai, search engine optimization mumbai, google ranking company mumbai, ecommerce seo mumbai"
  },
  "/seo-company-bangalore": {
    title: "SEO Company in Bangalore | Avani Enterprises",
    description: "Avani Enterprises is an SEO company in Bangalore (Bengaluru) driving 3x organic traffic for startups, SaaS & D2C brands. 95% first-page success. Get a free SEO audit.",
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
    description: "Avani Enterprises builds fast, bilingual Arabic-English websites and ecommerce stores for Qatar and Doha businesses. 300+ projects, 8+ years, 5.0 rating. Get a free quote.",
    keywords: "web development company qatar, website development doha, web design qatar, ecommerce development qatar, web developers doha, arabic website qatar, business website qatar, qatar web agency"
  },
  "/seo-company-dubai": {
    title: "SEO Company in Dubai | Rank #1 \u2014 Avani Enterprises",
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
    description: "Avani Enterprises builds fast, custom websites and ecommerce stores for London businesses. 300+ projects, 5.0 rating, 8+ years. Get a free quote today.",
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
    description: "Vendor-neutral CRM consulting company in India: CRM strategy, selection, implementation, migration, and adoption. 8+ years, 150+ clients, 5.0 rating. Book a free consult.",
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
    description: "Avani Enterprises builds custom payroll software for India with automated PF, ESI, TDS compliance and instant payslips. 8+ years, 5.0 rating. Get a quote today.",
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
    description: "Avani Enterprises builds native Android apps in Kotlin \u2014 fast, secure, Play Store-ready. 8+ years, 300+ projects, 5.0 rating. Get a free Android app quote.",
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
    description: "Avani Enterprises builds scalable backend systems, secure APIs, and cloud architecture with Node.js. 300+ projects, 8+ years, 5.0 rating. Book a free architecture call.",
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
    description: "Avani Enterprises builds fast, custom websites and ecommerce stores for Rohtak businesses. 300+ projects, 5.0 rating, 8+ years. Get a free quote today.",
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
    description: "Avani Enterprises is an SEO company in Noida driving 3x organic traffic and first-page Google rankings for IT, D2C, real estate & education brands. Free SEO audit.",
    keywords: "seo company noida, seo services noida, seo agency noida, local seo noida, search engine optimization noida, best seo company greater noida, google ranking services noida"
  },
  "/seo-company-rohtak": {
    title: "SEO Company in Rohtak | Avani Enterprises",
    description: "Top SEO company in Rohtak driving 3x organic traffic and first-page rankings for local businesses, institutes, and manufacturers. Get a free SEO audit today.",
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
    description: "Rank #1 on Google with Delhi's premier SEO company. We provide advanced technical audits, backlink building, local SEO, and keyword optimization. Free SEO audit.",
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
    const lookupKey = normalizedPath.toLowerCase();
    const fallbackSeo = STATIC_SEO_LOOKUP[lookupKey] || newSeoData[lookupKey];

    const title       = seo?.title            || fallbackSeo?.title       || "Avani Enterprises : No.1 Digital Marketing Agency in India";
    const description = seo?.metaDescription  || fallbackSeo?.description || "No.1 Digital Marketing Agency in India, we deliver result-driven SEO, PPC, social media, and branding solutions.";
    const keywords    = seo?.metaKeywords     || fallbackSeo?.keywords    || "digital marketing agency in india, seo services india, social media marketing, performance marketing company, lead generation services";
    const canonical   = seo?.canonicalUrl     || buildCanonical(normalizedPath);
    const robots      = isNoIndex(normalizedPath) ? "noindex,nofollow" : (seo?.robots || "index,follow");
    const ogImage     = seo?.ogImage          || `${SITE_URL}/logo0.webp`;

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

    // ── 4b. Homepage-only LCP preload ───────────────────────────────────────
    // Preload the hero background image (the LCP element on "/") so it begins
    // downloading during HTML parse instead of after the JS bundle mounts and
    // React renders the hero. Injected only for "/" because the SPA shares one
    // template — preloading it globally would waste the download on every route.
    if (normalizedPath === "/") {
      const heroPreload =
        '<link rel="preload" as="image" fetchpriority="high" ' +
        'href="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=68&w=1280">';
      html = html.replace(/<\/head>/i, `${heroPreload}</head>`);
    }

    // ── 5. noindex: also set X-Robots-Tag HTTP header for Googlebot ────────
    if (isNoIndex(normalizedPath)) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }

    res.setHeader('Content-Type', 'text/html');
    // Always revalidate the HTML shell so a new deploy's bundle is picked up immediately
    // (the hashed JS/CSS assets stay long-cached & immutable — only this small doc revalidates).
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(html);
  } catch (err) {
    console.error("❌ Vercel SEO Error:", err);
    res.status(500).send("Internal Server Error");
  }
}
