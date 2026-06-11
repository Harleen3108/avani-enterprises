import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const fallbackSeo = STATIC_SEO_LOOKUP[lookupKey];

    const title       = seo?.title            || fallbackSeo?.title       || "Avani Enterprises : No.1 Digital Marketing Agency in India";
    const description = seo?.metaDescription  || fallbackSeo?.description || "No.1 Digital Marketing Agency in India, we deliver result-driven SEO, PPC, social media, and branding solutions.";
    const keywords    = seo?.metaKeywords     || fallbackSeo?.keywords    || "digital marketing agency in india, seo services india, social media marketing, performance marketing company, lead generation services";
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
