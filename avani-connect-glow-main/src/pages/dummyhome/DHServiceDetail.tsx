import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Search, Share2, Zap, Radio, PieChart, ArrowLeft, CheckCircle, ArrowRight, Lightbulb, TrendingUp, Shield } from 'lucide-react';

/* Background effects */
const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const GridBg = ({ size = 40, opacity = 0.05 }) => (
  <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px`, pointerEvents: 'none' }} />
);

const GlowBlob = ({ top, left, right, bottom, w = 300, h = 300, color = 'var(--accent-primary)', opacity = 0.05, blur = 80 }: any) => (
  <div style={{ position: 'absolute', top, left, right, bottom, width: w, height: h, background: color, opacity, filter: `blur(${blur}px)`, borderRadius: '50%', pointerEvents: 'none', zIndex: 1 }} />
);

const LuxuryLine = () => (
  <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 15%, var(--border-light) 85%, transparent)', opacity: 0.6 }} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * 0.12 } })
};

interface WorkflowStep {
  title: string;
  desc: string;
}

interface ArchitectureLayer {
  number: string;
  title: string;
  tech: string[];
  purpose: string;
  color: string;
}

interface ServiceDetail {
  icon: any;
  title: string;
  titleLines: { line1: string; line2: string; line3: string };
  image: string;
  desc: string;
  hook: string;
  ctaHook: string;
  longDesc: string;
  features: string[];
  stats: string[][];
  workflow: WorkflowStep[];
  layers: ArchitectureLayer[];
}

const serviceData: Record<string, ServiceDetail> = {
  'web-app-development': {
    icon: <Code size={48} />,
    title: 'Web & App Development',
    titleLines: { line1: "WEB & APP", line2: "ENGINEERED", line3: "DEVELOPMENT" },
    image: "/whatwecreate/webdev.png",
    desc: 'We design and build custom, ultra-fast websites and mobile apps that work flawlessly. From beautiful designs to secure checkout pages, we bring your digital ideas to life and make sure they scale as your business grows.',
    hook: 'Your website is your 24/7 digital storefront. We build it to be fast, secure, and beautiful, so you can attract and keep customers effortlessly.',
    ctaHook: 'Ready to engineer a digital platform that converts passive visitors into active buyers? Partner with us today to build your bespoke ecosystem.',
    longDesc: 'A slow or confusing website costs you sales. Our team builds custom, state-of-the-art websites and mobile apps using the latest technology, ensuring your pages load in milliseconds. We take care of all the complicated coding, security, and setup, so you can focus entirely on running your business with peace of mind.',
    features: ['Tailor-made websites built for speed', 'iOS & Android mobile apps', 'Secure databases & payment checkout', 'Integrates easily with your current tools', 'Beautiful, custom-designed layouts'],
    stats: [['99.9%', 'Uptime'], ['50+', 'Apps Built'], ['10x', 'Faster Load']],
    workflow: [
      { title: "1. DESIGN THE BLUEPRINT", desc: "We sketch out your pages and map the customer journey, making sure everything is clear and easy to navigate before we start coding." },
      { title: "2. CRAFT THE VISUALS", desc: "Our designers bring the website to life with smooth animations, high-fidelity layouts, and elegant colors tailored to your brand." },
      { title: "3. BUILD THE ENGINE", desc: "We write secure, reliable code to power the backend systems, making sure your contact forms, checkout pages, and client portals work perfectly." },
      { title: "4. LAUNCH & PROTECT", desc: "We host your website on secure global servers, perform extensive testing, and set up continuous security checks so it never goes offline." }
    ],
    layers: [
      { number: "01", title: "VISUAL INTERFACE (FRONTEND)", tech: ["React", "Next.js", "Framer Motion", "Tailwind CSS"], purpose: "Creating fluid, responsive client-side routing, high-fidelity micro-interactions, and premium visual components that capture visitor attention instantly.", color: "var(--accent-primary)" },
      { number: "02", title: "LOGIC & INTEGRATION ENGINE (API)", tech: ["Node.js", "GraphQL", "REST APIs", "Serverless"], purpose: "Managing data-fetching pipelines, handling security handshakes, processing payments, and executing real-time communications.", color: "#00f0ff" },
      { number: "03", title: "RELIABLE DATA CORE (INFRA)", tech: ["PostgreSQL", "MongoDB", "Redis", "AWS Cloud"], purpose: "Securing database persistence, high-speed RAM caching, scalable storage buckets, and automated global CDN distribution.", color: "#a855f7" }
    ]
  },
  'seo-content-marketing': {
    icon: <Search size={48} />,
    title: 'SEO & Content Marketing',
    titleLines: { line1: "SEO & CONTENT", line2: "AUTHORITY", line3: "MARKETING" },
    image: "/whatwecreate/seoandcontent.jpg",
    desc: 'Get found on Google by active buyers without paying for expensive ads. We write engaging, high-ranking articles and optimize your website so you rank higher, attract more organic traffic, and build authority.',
    hook: 'If customers can\'t find you on Google, they find your competitors instead. We make sure you show up first when they look for your services.',
    ctaHook: 'Ready to dominate search pages and command absolute organic authority? Start your organic growth engine with us today to scale your traffic.',
    longDesc: 'Relying on paid ads is a dangerous game. We build semantic content engines, backlink authority networks, and technical SEO architectures that place your business in front of high-intent buyers, driving non-stop organic revenue. Establish your brand as an absolute authority and capture maximum search impressions.',
    features: ['High-ranking Google keywords targeting', 'Website health & speed optimization', 'Engaging articles written for humans', 'High-authority link partnerships', 'Clear search traffic progress reports'],
    stats: [['250%', 'Traffic Growth'], ['1st Page', 'Google Ranking'], ['5M+', 'Organic Views']],
    workflow: [
      { title: "1. DISCOVER SEARCH PATTERNS", desc: "We research exactly what phrases and questions your potential customers are typing into Google, targeting high-value opportunities." },
      { title: "2. OPTIMIZE YOUR WEBSITE HEALTH", desc: "We clean up backend code, fix slow loading pages, and organize your site structure so search engines can read it easily." },
      { title: "3. WRITE TARGETED CONTENT", desc: "Our writers create interesting, informative articles that answer your customers' questions and keep them on your page longer." },
      { title: "4. BUILD DOMAIN TRUST", desc: "We establish links with other respected websites in your industry, proving to Google that your brand is a trustworthy authority." }
    ],
    layers: [
      { number: "01", title: "SEMANTIC LANDING ENGINE", tech: ["Optimized HTML5", "JSON-LD Schema", "Next.js SSG"], purpose: "Rendering crawlable content structures, technical metadata, and responsive articles that satisfy search algorithms instantly.", color: "var(--accent-primary)" },
      { number: "02", title: "VISIBILITY ANALYTICS CORE", tech: ["Search Console API", "Keyword Metrics", "Semantic Maps"], purpose: "Scanning real-time search query shifts, identifying competitive gaps, and targeting high-converting keyword vectors.", color: "#00f0ff" },
      { number: "03", title: "AUTHORITY BACKBONE MATRIX", tech: ["Link Acquisition", "Domain Ledger", "Trust Metrics"], purpose: "Establishing high-domain backlink portfolios that signal absolute industry authority and trust to search engine indexing bots.", color: "#a855f7" }
    ]
  },
  'social-media-marketing': {
    icon: <Share2 size={48} />,
    title: 'Social Media Marketing',
    titleLines: { line1: "SOCIAL MEDIA", line2: "ENGAGEMENT", line3: "MARKETING" },
    image: "/whatwecreate/socialmedia.png",
    desc: 'Grow your audience, build brand loyalty, and drive sales on social media. We create thumb-stopping visual posts, engaging video reels, and manage high-converting ad campaigns tailored to your target market.',
    hook: 'Social media is where your customers hang out. We make your brand look professional, engaging, and impossible to scroll past.',
    ctaHook: 'Ready to capture absolute customer attention and build a legendary brand voice? Scale your audience reach and conversion loops with us today.',
    longDesc: 'Posting randomly doesn\'t generate sales. We develop a complete social media blueprint to tell your brand\'s unique story. From designing custom graphics and editing short-form video reels (for Instagram, TikTok, LinkedIn) to launching targeted ads, we capture attention and turn passive scrolls into active inquiries.',
    features: ['Custom brand graphics & visual themes', 'Scroll-stopping short-form video reels', 'Targeted ads on Instagram, Facebook & LinkedIn', 'Active community engagement & replies', 'Data-driven audience growth campaigns'],
    stats: [['500K+', 'Combined Reach'], ['12%', 'Engagement Rate'], ['3x+', 'Average ROI']],
    workflow: [
      { title: "1. DEFINE YOUR SOCIAL VOICE", desc: "We establish your brand's style guide, color theme, and specific messaging rules so your social channels look unified and professional." },
      { title: "2. PRODUCTION & CREATION", desc: "Our creative team shoots videos, designs premium graphics, and drafts caption copywriting tailored to hook viewers." },
      { title: "3. STRATEGIC PUBLISHING", desc: "We automate publication schedules across all channels at peak traffic hours, and engage directly with your commenters." },
      { title: "4. ADVERTISING CAMPAIGNS", desc: "We set up highly targeted campaigns to show your best content to people who are most likely to buy your product or service." }
    ],
    layers: [
      { number: "01", title: "NARRATIVE CREATIVE FACTORY", tech: ["Cinematic Video", "Kinetic Graphics", "Premium Copy"], purpose: "Designing attention-grabbing hooks, scroll-stopping graphic assets, and compelling storylines that convert casual viewers into active followers.", color: "var(--accent-primary)" },
      { number: "02", title: "CHANNEL MULTI-PUBLISHER", tech: ["Scheduling APIs", "Multi-Platform Dispatch", "Audience Sync"], purpose: "Automating high-engagement timing releases across LinkedIn, Instagram, TikTok, and Twitter, ensuring maximum global reach.", color: "#00f0ff" },
      { number: "03", title: "CONVERSION RETARGETING", tech: ["Tracking Pixels", "Lead Capture Form", "Audience Sync"], purpose: "Monitoring user behaviors, capturing visitor registrations, and retargeting ads to transform attention into revenue-ready pipeline.", color: "#a855f7" }
    ]
  },
  'ai-solutions': {
    icon: <Zap size={48} />,
    title: 'AI Solutions',
    titleLines: { line1: "AI SOLUTIONS", line2: "INTELLIGENT", line3: "AUTOMATION" },
    image: "/whatwecreate/aisolutions.webp",
    desc: 'Save hours of busywork by automating your business with smart AI. From automatic lead trackers and WhatsApp chatbots to custom tools that answer customers 24/7, we handle your repetitive tasks so you can focus on growth.',
    hook: 'Your team shouldn\'t waste hours on repetitive tasks. We build smart AI helpers that handle the busywork for you automatically.',
    ctaHook: 'Ready to deploy production-grade intelligent systems and automate manual bottlenecks 24/7? Join us to implement custom AI agents today.',
    longDesc: 'Artificial Intelligence isn\'t just for tech giants. We build practical AI solutions customized for your daily operations. Whether you need a smart WhatsApp auto-replier that answers customers immediately or a Lead Management system that tracks inquiries and alerts your sales team, we build tools that work 24/7 with zero downtime.',
    features: ['Automated Lead Trackers & managers', 'WhatsApp Auto-Agents & customer helper tools', 'Custom 24/7 AI chat helpers for websites', 'Automatic document readers & data entry', 'Integrates AI with your existing tools'],
    stats: [['60%', 'Hours Saved'], ['24/7', 'Always Active'], ['99%', 'Task Accuracy']],
    workflow: [
      { title: "1. LOCATE THE BUSYWORK", desc: "We look at your daily processes and identify repetitive tasks (like data entry, messaging, scheduling) that can be easily automated." },
      { title: "2. BUILD THE AI HELPER", desc: "We program smart AI models using secure tools, feeding them your specific business guidelines and documents so they know your policies." },
      { title: "3. SECURE API CONNECTIONS", desc: "We link your new AI assistant directly to your website, CRM, WhatsApp, or email, making data transfer fast and safe." },
      { title: "4. ZERO-ERROR TESTING", desc: "We test the AI helper against real-world questions, setting up safety boundaries so it always behaves professionally." }
    ],
    layers: [
      { number: "01", title: "INTERACTIVE GLASS INTERFACE", tech: ["WebSockets", "Streaming Panels", "React DOM"], purpose: "Providing seamless, high-fidelity conversational environments, real-time responses, and clean automated feedback prompts.", color: "var(--accent-primary)" },
      { number: "02", title: "INTELLIGENT LLM ROUTER", tech: ["GPT-4 Inference", "Claude SDK", "LangChain Agents"], purpose: "Processing query intents, matching prompts against business documents, executing reasoning chains, and structuring agent tasks.", color: "#00f0ff" },
      { number: "03", title: "VECTOR KNOWLEDGE MEMORY", tech: ["Pinecone Index", "PgVector Core", "Secure Registers"], purpose: "Enabling ultra-fast semantic memory recall, embedding database lookups, and preserving workspace contextual reference guides.", color: "#a855f7" }
    ]
  },
  'podcast-production': {
    icon: <Radio size={48} />,
    title: 'Podcast Production',
    titleLines: { line1: "PODCAST", line2: "CINEMATIC", line3: "PRODUCTION" },
    image: "/whatwecreate/podcast.webp",
    desc: 'Launch a high-fidelity professional podcast without any of the technical headache. We handle everything from script planning and audio editing to publishing your episodes on Spotify, Apple Podcasts, and YouTube.',
    hook: 'A podcast makes you the voice of your industry. We handle the recording advice, audio editing, and global setup so hosting is a breeze.',
    ctaHook: 'Ready to launch a cinematic brand podcast that positions you as the absolute industry authority? Partner with us to master your audio media today.',
    longDesc: 'Starting a podcast sounds fun until you have to edit audio, fix echo, and deal with RSS feeds. We take all the technical stress away. Our audio experts polish your sound, add background music, write episode descriptions, and publish each episode globally, making sure you look and sound like a seasoned pro.',
    features: ['Professional audio mixing & voice polishing', 'Episode publishing on Spotify, Apple & Google', 'Script ideas & interview outlines', 'Short video clips for social media promotion', 'Complete recording equipment guide & setup support'],
    stats: [['1M+', 'Audience Reach'], ['Top 10', 'Show Rankings'], ['100+', 'Episodes Done']],
    workflow: [
      { title: "1. OUTLINE YOUR SHOW", desc: "We help you select your show name, design custom cover art, structure your episodes, and prepare interview question guides." },
      { title: "2. EQUIPMENT & RECORDING SUITE", desc: "We recommend easy-to-use microphones and guide you step-by-step through recording clean, echo-free audio." },
      { title: "3. AUDIO EDITING & MASTERING", desc: "Our engineers cut out pauses, remove background noises, balance volumes, and merge custom music into a master track." },
      { title: "4. GLOBAL DISTRIBUTION", desc: "We upload your finished episodes to Apple Podcasts, Spotify, and YouTube, alongside SEO-optimized transcripts and descriptions." }
    ],
    layers: [
      { number: "01", title: "MULTI-CHANNEL MEDIA PLAYER", tech: ["Custom Audio API", "Waveform Canvas", "CSS Panels"], purpose: "Offering clean, premium listening hubs directly on your site, complete with chapter navigation and high-fidelity sound.", color: "var(--accent-primary)" },
      { number: "02", title: "MASTER BALANCING SUITE", tech: ["Noise Gating", "Voice Balancers", "Intro Composers"], purpose: "Balancing audio channels, eliminating background ambient hums, and combining standard audio streams into cinematic master files.", color: "#00f0ff" },
      { number: "03", title: "FEED INTEGRATION NETWORK", tech: ["Apple RSS XML", "Spotify Hub API", "Auto-Transcribe"], purpose: "Distributing pristine audio files to global podcast catchers with automated SEO transcripts and episode descriptions.", color: "#a855f7" }
    ]
  },
  'financial-consulting': {
    icon: <PieChart size={48} />,
    title: 'Financial Consulting',
    titleLines: { line1: "FINANCIAL", line2: "STRATEGIC", line3: "CONSULTING" },
    image: "/whatwecreate/finance.webp",
    desc: 'Make smart, data-backed financial decisions for a prosperous future. We help you audit operational costs, build clear revenue blueprints, and arrange flexible business loans so you can expand safely.',
    hook: 'Growth without clear numbers is high-risk. We build a clear financial map so you always know your profit margins and expansion budget.',
    ctaHook: 'Ready to optimize operational pipelines, raise strategic capital, and secure risk-mitigated corporate scaling? Join us to blueprint your corporate growth today.',
    longDesc: 'Running a business requires a clear understanding of cash flow. Our financial consultants analyze your day-to-day expenditures, optimize your tax position, and forecast your revenue for the coming years. We make complex spreadsheets easy to understand, helping you budget for expansion and navigate growth smoothly.',
    features: ['Operational expense audits & savings plan', 'Clear 3-year and 5-year revenue blueprints', 'Venture capital & business loan prep', 'Profit margin & cash flow analysis', 'Risk management & mitigation strategy'],
    stats: [['$10M+', 'Capital Raised'], ['30%', 'Expense Savings'], ['5x', 'Scale Multiplier']],
    workflow: [
      { title: "1. AUDIT REVENUE & EXPENSES", desc: "We analyze your past financial records, identifying exactly where money is coming in and where it might be leaked." },
      { title: "2. LOCATE EXPENSE CUTS", desc: "We identify recurring subscription leaks, operational bottlenecks, and negotiating tips to immediately improve your profit margins." },
      { title: "3. BLUEPRINT CAPITAL FUNDING", desc: "We help organize clean investor pitches, credit reports, and business plan files to qualify you for expansion capital." },
      { title: "4. REVENUE ROADMAP", desc: "We build easy-to-read monthly forecast charts so you can see your projected cash flow and expansion thresholds clearly." }
    ],
    layers: [
      { number: "01", title: "FORECASTING DASHBOARD", tech: ["Chart Canvas", "Excel Modeling", "Burn-rate Hud"], purpose: "Modeling visual capital pathways, displaying monthly burn-rates, and presenting growth projections in interactive executive layouts.", color: "var(--accent-primary)" },
      { number: "02", title: "EFFICIENCY BLUEPRINT CORE", tech: ["Expense Auditing", "Consolidation Logic", "Leasing Core"], purpose: "Calculating cost-saving pathways, structuring debt consolidation plans, and identifying capital opportunities.", color: "#00f0ff" },
      { number: "03", title: "INVESTOR FUNDING MATRIX", tech: ["HNW Pitch Deck", "VC Matching Core", "Credit Registers"], purpose: "Aligning operational structures with target investor metrics, securing investment pitches, and coordinating corporate finances.", color: "#a855f7" }
    ]
  },
  'business-consultation': {
    icon: <Lightbulb size={48} />,
    title: 'Business Consultation',
    titleLines: { line1: "BUSINESS", line2: "STRATEGIC", line3: "CONSULTATION" },
    image: "/whatwecreate/consultation.png",
    desc: 'Scale your business with expert guidance and strategy. We analyze your day-to-day operations to find hidden opportunities, streamline workflows, and set you up for long-term, sustainable success.',
    hook: 'Scale your business with expert guidance. We streamline operations to save costs and locate hidden revenue paths.',
    ctaHook: 'Ready to optimize your business operations and command your market? Contact us today for a free strategic audit.',
    longDesc: 'Running an enterprise requires constant adaptation. Our strategic consultants analyze your internal team structures, sales pipelines, and technology systems to eliminate inefficiencies. We help you build solid growth blueprints so you can delegate tasks confidently and scale operations without chaos.',
    features: ['Operational workflow audits', 'Team structure & role design', 'Sales funnel optimization', 'Market competitive analysis', 'Strategic scaling roadmaps'],
    stats: [['45%', 'Efficiency Up'], ['100+', 'Audits Done'], ['3x', 'Scale Speed']],
    workflow: [
      { title: "1. OPERATIONAL ANALYSIS", desc: "We interview key team members and map out your day-to-day operational flows to find bottlenecks." },
      { title: "2. STRATEGIC BLUEPRINTING", desc: "We draft a comprehensive recommendation report highlighting immediate efficiency wins and long-term milestones." },
      { title: "3. TECHNOLOGY INTEGRATION", desc: "We recommend and help configure tools to automate task delegation and progress tracking across teams." },
      { title: "4. EXECUTION & FEEDBACK", desc: "We monitor implementation outcomes and refine workflows to ensure consistent execution." }
    ],
    layers: [
      { number: "01", title: "WORKFLOW VISUALIZATION", tech: ["Process Mapping", "Lucid Chart", "Operant Hud"], purpose: "Mapping department inter-dependencies and visualizing information handoffs to eliminate team communication delays.", color: "var(--accent-primary)" },
      { number: "02", title: "STRATEGY ROADMAP CORE", tech: ["Milestone Matrices", "ROI Predictors", "Competitive Maps"], purpose: "Evaluating operational conversion rates and mapping growth pathways to guarantee sustainable business scaling.", color: "#00f0ff" },
      { number: "03", title: "EXECUTION INTEGRITY METRIC", tech: ["KPI Dashboards", "Output Registers", "Accountability Audits"], purpose: "Creating accountability scorecards and automated dashboard tracking to align employee performance with enterprise milestones.", color: "#a855f7" }
    ]
  },
  'business-loans': {
    icon: <TrendingUp size={48} />,
    title: 'Business Loans',
    titleLines: { line1: "BUSINESS", line2: "GROWTH", line3: "LOANS" },
    image: "/whatwecreate/loans.png",
    desc: 'Get the funding you need to grow and expand. We connect you with flexible business loans, working capital, and equipment financing at competitive rates, with quick approvals and hassle-free processing.',
    hook: 'Secure the capital you need to scale operations. Quick processing, flexible terms, and competitive interest rates.',
    ctaHook: 'Need capital to fund your next big move? Apply today for quick approvals and customized financing terms.',
    longDesc: 'Capital bottlenecks shouldn\'t stop your ambition. We partner with top-tier lenders to offer secure business loans, credit lines, and equipment leases tailored to your cash flow. We manage the complex paperwork and application hurdles so you secure critical funds quickly and affordably.',
    features: ['Flexible working capital lines', 'Equipment leasing & financing', 'Low-interest rates', 'Quick approval timelines', 'Custom repayment structures'],
    stats: [['$25M+', 'Disbursed'], ['24 Hr', 'Decision Window'], ['98%', 'Approval Rate']],
    workflow: [
      { title: "1. CAPITAL REQUIREMENT AUDIT", desc: "We review your cash flow and growth objectives to calculate the exact funding size and type required." },
      { title: "2. PREPARATION & PACKAGING", desc: "We organize your balance sheets, business plans, and documents into a clean dossier for lending committees." },
      { title: "3. LENDER MATCHING & BIDDING", desc: "We submit your file to our trusted pool of banking and private lenders to negotiate the lowest rates." },
      { title: "4. FUND DISBURSEMENT", desc: "We guide you through the terms approval, final contract signing, and direct deposit into your business account." }
    ],
    layers: [
      { number: "01", title: "LENDING PORTAL FRONTEND", tech: ["Secure Forms", "Document Uploaders", "Calculator API"], purpose: "Providing candidates a secure portal to calculate potential loan terms and safely upload sensitive balance sheets.", color: "var(--accent-primary)" },
      { number: "02", title: "UNDERWRITING ENGINE CORE", tech: ["Credit Check API", "Risk Assessors", "Cash-flow Analyzers"], purpose: "Evaluating enterprise debt-service-coverage ratios and comparing records against targeted lending policies.", color: "#00f0ff" },
      { number: "03", title: "LENDER BRIDGE ROUTER", tech: ["B2B Loan APIs", "Syndication Ledgers", "Escrow Handlers"], purpose: "Routing pre-qualified dossiers to active lending networks and tracking bids to secure competitive terms.", color: "#a855f7" }
    ]
  },
  'business-insurance': {
    icon: <Shield size={48} />,
    title: 'Business Insurance',
    titleLines: { line1: "BUSINESS", line2: "ENTERPRISE", line3: "INSURANCE" },
    image: "/whatwecreate/insurance.png",
    desc: 'Secure your hard work and protect your business from risks. We offer customized insurance plans to safeguard your assets, employees, and operations, giving you absolute peace of mind.',
    hook: 'Protect your enterprise assets and workforce. Custom risk coverage and quick claims support.',
    ctaHook: 'Don\'t leave your business vulnerable to unforeseen liability. Protect your assets with custom insurance coverage today.',
    longDesc: 'Risk is inevitable, but financial loss doesn\'t have to be. We analyze your industry risk profile to design customized insurance portfolios, covering liability, cyber risks, property damage, and employee health. Rest easy knowing your business is fully protected against unexpected events.',
    features: ['General liability & asset coverage', 'Professional indemnity insurance', 'Cyber risk & data breach protection', 'Group employee health benefits', 'Rapid claims processing support'],
    stats: [['100%', 'Risk Covered'], ['10k+', 'Employees Protected'], ['24/7', 'Claims Intake']],
    workflow: [
      { title: "1. RISK ASSESSMENT PROFILE", desc: "We audit your operations, client contracts, and workspace to identify potential liability vulnerabilities." },
      { title: "2. CUSTOM COVERAGE BLUEPRINT", desc: "We structure an insurance plan combining exactly the protections you need, preventing double-payments." },
      { title: "3. UNDERWRITERS NEGOTIATION", desc: "We source terms from top global insurance carriers to secure comprehensive coverage at optimal premiums." },
      { title: "4. POLICY ISSUANCE & ONBOARDING", desc: "We activate your insurance policies and train your leadership team on claiming protocols." }
    ],
    layers: [
      { number: "01", title: "RISK MODEL DISPLAY INTERFACE", tech: ["Interactive Audits", "Coverage Slider", "PDF Generators"], purpose: "Presenting risk assessment scorecards and explaining liability coverage benefits in plain English.", color: "var(--accent-primary)" },
      { number: "02", title: "UNDERWRITING COMPARISON HUB", tech: ["Carrier Quote APIs", "Premium Assessors", "Terms Comparators"], purpose: "Querying multiple insurance underwriting APIs to compare coverage limits, deductibles, and premiums.", color: "#00f0ff" },
      { number: "03", title: "CLAIMS DISPATCH INTERFACE", tech: ["Incident Loggers", "Evidence Uploaders", "CRM Registers"], purpose: "Creating a reliable, secure intake channel for logging operational incidents and routing claim paperwork directly to carriers.", color: "#a855f7" }
    ]
  }
};

const DHServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;
  const [activeStep, setActiveStep] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(0);

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [slug]);

  if (!service) {
    return (
      <div className="dh-service-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="dh-display" style={{ fontSize: '3rem', marginBottom: '1rem' }}>SERVICE NOT FOUND</h1>
          <Link to="/dummyhome/services" className="dh-btn-fill">BACK TO SERVICES</Link>
        </div>
      </div>
    );
  }

  const { line1, line2, line3 } = service.titleLines;

  return (
    <div className="dh-service-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* 1. HERO - Dual Column Premium Layout */}
      <section className="theme-brown" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '120px', paddingBottom: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-10%" right="-5%" w={450} h={450} opacity={0.06} blur={130} />
        <GlowBlob bottom="-10%" left="-5%" w={300} h={300} opacity={0.04} blur={100} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
            
            {/* Left Content Column */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              style={{ width: '100%', maxWidth: '680px' }}
            >
              <motion.div variants={fadeUp}>
                <Link to="/dummyhome/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '2rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <ArrowLeft size={14} /> BACK TO SERVICES
                </Link>
              </motion.div>
              
              {/* Premium Hook Tag */}
              <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196, 145, 58, 0.08)', border: '1px solid rgba(196, 145, 58, 0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>🔥 {service.hook}</span>
              </motion.div>
              
              <h1 className="dh-display" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)', marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>{line1}</motion.span></span>
                {line2 && <span className="dh-hero-line"><motion.span custom={1} variants={titleV} className="dh-hero-stroked">{line2}</motion.span></span>}
                <span className="dh-hero-line"><motion.span custom={2} variants={titleV} className="dh-hero-accent">{line3}</motion.span></span>
              </h1>
              
              <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '580px', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {service.desc}
              </motion.p>
              
              {/* Symmetrical quick performance highlights */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', marginTop: '2rem', flexWrap: 'wrap' }}>
                {service.stats.slice(0, 2).map((s, idx) => (
                  <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '12px 20px', minWidth: '140px', flex: '1 1 140px' }}>
                    <div style={{ fontSize: '1.6rem', fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: 'var(--accent-primary)', lineHeight: 1 }}>{s[0]}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s[1]}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual Image Column with floating luxury badges */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              style={{ width: '100%', position: 'relative' }}
            >
              <div style={{ position: 'absolute', inset: '-30px', background: 'radial-gradient(circle, rgba(196, 145, 58, 0.18) 0%, transparent 65%)', filter: 'blur(30px)', zIndex: 1, pointerEvents: 'none' }} />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ 
                  position: 'relative', 
                  zIndex: 2, 
                  width: '100%', 
                  aspectRatio: '16/10', 
                  borderRadius: '20px', 
                  overflow: 'visible', 
                  border: '1px solid var(--accent-primary)',
                  boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5), 0 0 40px rgba(196, 145, 58, 0.12)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div style={{ width: '100%', height: '100%', borderRadius: '19px', overflow: 'hidden' }}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.8s ease'
                    }} 
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Floating Glassmorphism Badge 1 */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-15px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 10
                }}>
                  <span style={{ fontSize: '12px' }}>✨</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Premium Solution</span>
                </div>

                {/* Floating Glassmorphism Badge 2 */}
                <div style={{
                  position: 'absolute',
                  bottom: '-15px',
                  left: '-15px',
                  background: 'rgba(196, 145, 58, 0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(196, 145, 58, 0.25)',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 10
                }}>
                  <span style={{ fontSize: '12px' }}>🛡️</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>100% Vetted Quality</span>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div></section>

      <LuxuryLine />

      {/* 2. OVERVIEW & CAPABILITIES */}
      <section className="theme-beige" style={{ position: 'relative', padding: '90px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.04} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '5rem' }} className="dh-responsive-grid">
            
            {/* Left Col */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="dh-heading" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontFamily: "'Outfit'" }}>OVERVIEW</h2>
              
              {/* Bold engaging gold hook box showing the stylized service title & action-oriented ctaHook */}
              {service.title && (
                <div style={{ 
                  marginBottom: '2.5rem', 
                  padding: '32px', 
                  background: 'var(--card-bg)', 
                  borderRadius: '24px', 
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.01)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--accent-primary)' }}>STRATEGIC MISSION</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
                  </div>
                  <p style={{ 
                    fontFamily: "'Syne', sans-serif", 
                    fontSize: '1.9rem', 
                    fontWeight: 900, 
                    lineHeight: 1.15, 
                    margin: 0,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)'
                  }}>
                    <span style={{ display: 'block' }}>{service.titleLines.line1}</span>
                    {service.titleLines.line2 && <span className="dh-hero-stroked" style={{ display: 'block', margin: '4px 0' }}>{service.titleLines.line2}</span>}
                    <span className="dh-hero-accent" style={{ display: 'block' }}>{service.titleLines.line3}</span>
                  </p>
                  
                  {/* High-converting inline hook and button linking directly to consultation */}
                  <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-faint)' }}>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: 1.6, 
                      color: 'var(--text-secondary)', 
                      fontWeight: 600, 
                      marginBottom: '1.5rem',
                      fontFamily: "'Outfit', sans-serif" 
                    }}>
                      {service.ctaHook}
                    </p>
                    <Link to="/dummyhome/contact" className="dh-btn-fill" style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '0.8rem',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      textDecoration: 'none'
                    }}>
                      ENGAGE NOW <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
              
              <p className="dh-body" style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                {service.longDesc}
              </p>
              
              <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: "'Outfit'" }}>KEY CAPABILITIES</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {service.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '16px 20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-faint)' }}>
                    <CheckCircle size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Right Col */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Stats Box */}
              <div style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-faint)', textAlign: 'center' }}>
                <h3 className="dh-heading" style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: 900,
                  fontFamily: "'Outfit', sans-serif", 
                  letterSpacing: '-0.02em', 
                  marginBottom: '0.8rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)'
                }}>
                  IMPACT <span className="dh-hero-accent" style={{ fontFamily: "'Outfit', sans-serif" }}>METRICS.</span>
                </h3>
                <div style={{ width: '45px', height: '3px', background: 'var(--accent-primary)', margin: '0 auto 2.5rem', borderRadius: '2px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
                  {service.stats.map((s, i) => (
                    <div key={i} style={{ 
                      padding: '24px', 
                      background: 'var(--bg-secondary)', 
                      border: '1px solid var(--border-light)', 
                      borderRadius: '16px',
                      textAlign: 'center' 
                    }}>
                      <div style={{ 
                        fontSize: '3.4rem', 
                        fontFamily: "'Outfit', sans-serif", 
                        fontWeight: 900, 
                        color: 'var(--text-primary)', 
                        lineHeight: 1,
                        letterSpacing: '-0.02em'
                      }}>
                        {s[0]}
                      </div>
                      
                      {/* Line inside separating statistical number and description */}
                      <div style={{ width: '35px', height: '1.5px', background: 'var(--accent-primary)', margin: '14px auto', borderRadius: '1px' }} />
                      
                      <div style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 800, 
                        color: 'var(--text-secondary)', 
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontFamily: "'Outfit', sans-serif"
                      }}>
                        {s[1]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Box */}
              <div style={{ padding: '32px', background: 'linear-gradient(135deg, var(--card-bg), var(--bg-secondary))', borderRadius: '24px', border: '1px solid var(--accent-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'var(--accent-primary)', opacity: 0.05, filter: 'blur(30px)' }} />
                <h3 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: "'Outfit'" }}>READY TO TALK?</h3>
                <p className="dh-body" style={{ fontSize: '0.85rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                  Partner with us to deploy these strategies and unlock exponential operational performance.
                </p>
                <Link to="/dummyhome/contact" className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center' }}>
                  GET STARTED <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 3. SYSTEM ISOMETRIC ARCHITECTURE LAYERS - BRAND NEW 3D SHOWCASE */}
      <section className="theme-brown" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={40} opacity={0.03} />
        <GlowBlob top="20%" right="10%" w={400} h={400} opacity={0.04} blur={110} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="dh-label">SYSTEM INFRASTRUCTURE</div>
            <h2 className="dh-display" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>
              ARCHITECTURE <span style={{ color: 'var(--accent-primary)' }}>LAYERS.</span>
            </h2>
            <p className="dh-body" style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Explore the multi-dimensional blueprint of our technical setup by interacting with the layers of the 3D stack.
            </p>
          </motion.div>

          {/* Isometric 3D Layer Stack Integration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
            
            {/* Left Box: Selected Layer Breakdown */}
            <div style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-faint)', 
              borderRadius: '24px', 
              padding: '3rem', 
              minHeight: '380px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)', 
              position: 'relative',
              zIndex: 5
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLayer}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1.8rem' }}>
                    <span style={{ 
                      fontSize: '3.5rem', 
                      fontFamily: "'Syne', sans-serif", 
                      fontWeight: 800, 
                      color: service.layers[selectedLayer].color, 
                      lineHeight: 1 
                    }}>
                      {service.layers[selectedLayer].number}
                    </span>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.25em', color: 'var(--text-tertiary)', display: 'block', marginBottom: '4px' }}>
                        ARCHITECTURE LEVEL
                      </span>
                      <h3 className="dh-heading" style={{ fontSize: '1.6rem', fontFamily: "'Outfit'", margin: 0, color: 'var(--text-primary)' }}>
                        {service.layers[selectedLayer].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="dh-body" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '2.2rem' }}>
                    {service.layers[selectedLayer].purpose}
                  </p>
                  
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.8rem' }}>
                      TECHNOLOGY INTEGRATION
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {service.layers[selectedLayer].tech.map((t, idx) => (
                        <span 
                          key={idx} 
                          style={{ 
                            padding: '6px 14px', 
                            background: 'var(--bg-secondary)', 
                            border: '1px solid var(--border-light)', 
                            borderRadius: '20px', 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: 'var(--text-primary)' 
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right Box: Tilted 3D Stack Layer UI */}
            <div className="dh-arch-right-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '380px', position: 'relative' }}>
              <div className="dh-arch-stack" style={{ 
                position: 'relative', 
                width: '320px', 
                height: '280px', 
                transform: 'perspective(1000px) rotateX(55deg) rotateZ(-30deg)', 
                transformStyle: 'preserve-3d' 
              }}>
                {service.layers.map((layer, idx) => {
                  const zOffset = (2 - idx) * 80; // layer 0 is top (z=160), layer 1 is mid (z=80), layer 2 is bot (z=0)
                  const isSelected = selectedLayer === idx;
                  
                  return (
                    <motion.div
                      key={idx}
                      className="dh-arch-layer"
                      onClick={() => setSelectedLayer(idx)}
                      onMouseEnter={() => setSelectedLayer(idx)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '140px',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(12px)',
                        border: isSelected ? `2.5px solid ${layer.color}` : '1.5px solid var(--border-light)',
                        borderRadius: '16px',
                        boxShadow: isSelected 
                          ? `0 25px 60px rgba(0,0,0,0.45), 0 0 35px ${layer.color}45`
                          : '0 10px 30px rgba(0,0,0,0.15)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d',
                        zIndex: 3 - idx
                      }}
                      animate={{ 
                        z: isSelected ? zOffset + 25 : zOffset 
                      }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    >
                      <div style={{ 
                        textAlign: 'center',
                        padding: '1.5rem',
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                        transition: 'color 0.3s'
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', color: layer.color, marginBottom: '6px' }}>
                          LEVEL {layer.number}
                        </div>
                        <div style={{ fontSize: '1.05rem', fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: 'var(--text-primary)' }}>
                          {layer.title.split(" (")[0]}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <LuxuryLine />

      {/* 4. WORKFLOW TIMELINE PROCESS */}
      <section className="theme-beige" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }} className="dh-responsive-grid">
            
            {/* Left Process Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="dh-label">BATTLE-TESTED WORKFLOW</div>
              <h2 className="dh-display" style={{ fontSize: '3.2rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.1 }}>
                DEVELOPMENT <br />
                <span style={{ color: 'var(--accent-primary)' }}>LIFECYCLE.</span>
              </h2>
              <p className="dh-body" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                We execute with extreme precision across four specialized, iterative phases, ensuring complete transparency and stellar architectural standards.
              </p>
              
              {/* Interactive Steps List Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {service.workflow.map((w, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      textAlign: 'left',
                      padding: '16px 24px',
                      background: activeStep === idx ? 'var(--accent-hover)' : 'transparent',
                      border: '1px solid',
                      borderColor: activeStep === idx ? 'var(--accent-primary)' : 'transparent',
                      borderRadius: '12px',
                      color: activeStep === idx ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    PHASE 0{idx + 1}: {w.title}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Detailed Stage Viewer */}
            <div style={{ position: 'relative', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '24px', padding: '3.5rem', minHeight: '340px', display: 'flex', alignItems: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'absolute', top: 32, right: 32, fontSize: '4.5rem', fontFamily: "'Syne', sans-serif", fontWeight: 800, color: 'var(--accent-primary)', opacity: 0.08, lineHeight: 1 }}>
                0{activeStep + 1}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--accent-primary)', display: 'block', marginBottom: '0.5rem' }}>
                    CURRENT OPERATION PHASE
                  </span>
                  <h3 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.2rem', letterSpacing: '-0.02em', fontFamily: "'Outfit'" }}>
                    {service.workflow[activeStep].title}
                  </h3>
                  <p className="dh-body" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                    {service.workflow[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .dh-arch-right-box {
            height: auto !important;
            margin-top: 2rem !important;
          }
          .dh-arch-stack {
            transform: none !important;
            width: 100% !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .dh-arch-layer {
            position: relative !important;
            transform: none !important;
            height: auto !important;
            min-height: 100px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DHServiceDetail;
