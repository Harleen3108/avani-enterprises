import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Search, Share2, Zap, Radio, PieChart, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

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
    image: "/services-web-dev.png",
    desc: 'Crafting high-performance digital architectures with precision and scale.',
    hook: 'YOU NEED A HIGH-PERFORMANCE SYSTEM THAT NEVER FAILS. WE ENGINEER IT.',
    ctaHook: 'Ready to engineer a digital platform that converts passive visitors into active buyers? Partner with us today to build your bespoke ecosystem.',
    longDesc: 'Your digital architecture is either a massive revenue driver or a hidden operational bottleneck. We design elite Web & Mobile ecosystems that scale automatically, load instantly, and turn complex transactions into seamless user journeys. We build scalable, high-performance web and mobile applications tailored to your business needs using next-generation stack components.',
    features: ['Custom React & Next.js Frameworks', 'Mobile App Ecosystems (iOS & Android)', 'Enterprise-Grade Backend Solutions', 'API Integration & Microservices', 'UI/UX Design & Prototyping'],
    stats: [['99.9%', 'Uptime'], ['50+', 'Apps'], ['10x', 'Scale']],
    workflow: [
      { title: "SYSTEM BLUEPRINTING", desc: "We architect the full database schema, microservices communication matrix, and wireframe user flows before a single line of code is written." },
      { title: "FRONTEND FIDELITY", desc: "Our engineering team crafts pixel-perfect interface mockups using modern frameworks (React, Next.js, Framer Motion) for blazing fast load speeds." },
      { title: "ROBUST INTEGRATION", desc: "We build scalable REST and GraphQL API routes, backed by resilient serverless environments, securing absolute data flow continuity." },
      { title: "CI/CD AUTOMATION", desc: "Automatic deployment pipelines deploy your code securely across server clusters, backed by automated integration test triggers." }
    ],
    layers: [
      { number: "01", title: "PRESENTATION SYSTEM (UI)", tech: ["React", "Next.js", "Framer Motion", "Tailwind CSS"], purpose: "Creating fluid, responsive client-side routing, high-fidelity micro-interactions, and premium visual components that capture visitor attention instantly.", color: "var(--accent-primary)" },
      { number: "02", title: "LOGIC INTEGRATION ENGINE (API)", tech: ["Node.js", "GraphQL", "REST APIs", "Serverless"], purpose: "Managing data-fetching pipelines, handling security handshakes, processing payments, and executing real-time communications.", color: "#00f0ff" },
      { number: "03", title: "RELIABLE DATA CORE (INFRA)", tech: ["PostgreSQL", "MongoDB", "Redis", "AWS Cloud"], purpose: "Securing database persistence, high-speed RAM caching, scalable storage buckets, and automated global CDN distribution.", color: "#a855f7" }
    ]
  },
  'seo-content-marketing': {
    icon: <Search size={48} />,
    title: 'SEO & Content Marketing',
    titleLines: { line1: "SEO & CONTENT", line2: "AUTHORITY", line3: "MARKETING" },
    image: "/services-seo.png",
    desc: 'Dominating search landscapes through strategic authority and visibility.',
    hook: 'IF YOU ARE NOT RANKING ON PAGE ONE, YOU DO NOT EXIST. WE DOMINATE.',
    ctaHook: 'Ready to dominate search pages and command absolute organic authority? Start your organic growth engine with us today to scale your traffic.',
    longDesc: 'Relying on paid ads is a dangerous game. We build semantic content engines, backlink authority networks, and technical SEO architectures that place your business in front of high-intent buyers, driving non-stop organic revenue. Establish your brand as an absolute authority and capture maximum search impressions.',
    features: ['Semantic SEO & Keyword Research', 'Authority Building & Backlink Strategy', 'High-Impact Content Creation', 'Technical SEO Audits', 'Performance Analytics & Reporting'],
    stats: [['250%', 'Growth'], ['1st', 'Rank'], ['5M+', 'Views']],
    workflow: [
      { title: "SEMANTIC RESEARCH", desc: "We scan search volumes, identify user search intent vectors, and target high-converting semantic keyword clusters." },
      { title: "TECHNICAL RECON", desc: "We solve crawl budget delays, structure XML schemas, optimize site indexing, and minimize Largest Contentful Paint (LCP)." },
      { title: "AUTHORITY CAMPAIGNS", desc: "Our editors write compelling articles, backed by link acquisition pipelines from high-domain authority sites." },
      { title: "ANALYTICS OPTIMIZATION", desc: "We track live impressions, search query shifts, and user flow conversions, continually updating our content algorithms." }
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
    image: "/services-social.png",
    desc: 'Building meaningful brand narratives that resonate globally.',
    hook: 'ATTENTION IS THE ULTIMATE CURRENCY. WE CAPTURE AND CONVERT IT.',
    ctaHook: 'Ready to capture absolute customer attention and build a legendary brand voice? Scale your audience reach and conversion loops with us today.',
    longDesc: 'Generic posting is white noise. We craft cinematic brand narratives, viral trend mechanics, and targeted advertising strategies that capture absolute attention and convert followers into brand evangelists. Amplify your brand voice and engage with your community across all major social networks.',
    features: ['Narrative Design & Brand Storytelling', 'Viral Mechanics & Trend Jacking', 'Community Growth & Engagement', 'Paid Social Campaigns (Meta, LinkedIn)', 'Influencer Partnerships'],
    stats: [['500K+', 'Reach'], ['12%', 'Engaged'], ['3x', 'ROI']],
    workflow: [
      { title: "NARRATIVE BRANDING", desc: "We establish the tone, custom style guides, and specific digital identity metrics to differentiate your business from the noise." },
      { title: "CREATIVE FACTORY", desc: "We generate scroll-stopping graphics, dynamic cinematic short-form video reels, and compelling caption hooks daily." },
      { title: "INTERACTIVE LAUNCH", desc: "We coordinate cross-channel scheduling campaigns (LinkedIn, Instagram, TikTok) alongside real-time community engagement scripts." },
      { title: "CAMPAIGN CONVERSIONS", desc: "We analyze campaign reach, community actions, and lead conversion rates, optimizing future content budgets." }
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
    image: "/services-ai.png",
    desc: 'Harnessing the power of automation to drive operational intelligence.',
    hook: 'AUTOMATE OR BE OUT-COMPETED. WE DEPLOY PRODUCTION-GRADE AI.',
    ctaHook: 'Ready to deploy production-grade intelligent systems and automate manual bottlenecks 24/7? Join us to implement custom AI agents today.',
    longDesc: 'AI is not a future trend—it is today\'s unfair advantage. We integrate production-grade LLMs, custom machine learning agents, and intelligent automated workflows that slash labor hours, eliminate errors, and scale your operations 24/7. Leverage AI to optimize complex operational bottlenecks.',
    features: ['Large Language Model (LLM) Integration', 'Business Process Automation', 'Intelligent AI Chatbots', 'Predictive Analytics & Data Mining', 'Custom AI Tool Development'],
    stats: [['60%', 'Saved'], ['24/7', 'Active'], ['99%', 'Accuracy']],
    workflow: [
      { title: "DISCOVERY AUDIT", desc: "We review your team's manual operations to identify tasks ripe for automatic processing, LLM handling, and AI assistants." },
      { title: "PIPELINE INGESTION", desc: "We set up vector database systems, structuring your organization's records into highly organized data indices." },
      { title: "LLM PROMPTING", desc: "We build and program autonomous AI agents using advanced models, connecting them to secure backend APIs." },
      { title: "RELIABLE ENGINES", desc: "We test and refine our model outputs with safety guardrails, guaranteeing zero-error, 24/7 autonomous task execution." }
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
    image: "/services-podcast.png",
    desc: 'Amplifying your brand voice through cinematic audio experiences.',
    hook: 'YOUR VOICE IS YOUR MOST POWERFUL ASSET. WE MAKE IT CINEMATIC.',
    ctaHook: 'Ready to launch a cinematic brand podcast that positions you as the absolute industry authority? Partner with us to master your audio media today.',
    longDesc: 'A podcast is the ultimate authority builder for founders and leaders. We provide a complete, high-end production suite: from professional script engineering and cinematic audio mastering to global multi-channel distribution and audience growth campaigns. Launch and scale a professional podcast that captivates listeners globally.',
    features: ['High-End Audio Engineering & Mixing', 'Global Distribution (Spotify, Apple)', 'Narrative Production & Scripting', 'Guest Sourcing & Management', 'Podcast Monetization Strategies'],
    stats: [['1M+', 'Audience'], ['Top 10', 'Rank'], ['100+', 'Episodes']],
    workflow: [
      { title: "EPISODE CONCEPTS", desc: "We brainstorm high-impact seasonal topics, design custom cover assets, and write structured interview scripts." },
      { title: "HIGH-FIDELITY RECORD", desc: "We assist with studio equipment setups, audio captures, and remote multi-mic connection protocols." },
      { title: "CINEMATIC MASTER", desc: "Our engineers clean background noises, balances voices, add custom intro tracks, and compile clean master tapes." },
      { title: "GLOBAL DISPATCH", desc: "We launch your show across all main podcast players (Spotify, Apple) alongside social media video snippets." }
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
    image: "/services-seo.png", // Reusing capital growth charts as it perfectly fits!
    desc: 'Navigating market complexities with data-driven strategic oversight.',
    hook: 'GROWTH WITHOUT FINANCIAL STRATEGY IS CHAOS. WE SECURE YOUR SCALE.',
    ctaHook: 'Ready to optimize operational pipelines, raise strategic capital, and secure risk-mitigated corporate scaling? Join us to blueprint your corporate growth today.',
    longDesc: 'Scaling a business requires absolute capital precision. We provide strategic growth consulting, cost optimizations, capital fundraising blueprints, and rigorous forecasting models to ensure your expansion is profitable and risk-secured. Navigate market complexities with dedicated strategic financial oversight.',
    features: ['Growth Capital Acquisition', 'Risk Management & Mitigation', 'Strategic Scaling & M&A', 'Financial Modeling & Forecasting', 'Operational Cost Optimization'],
    stats: [['$10M+', 'Raised'], ['30%', 'Savings'], ['5x', 'Growth']],
    workflow: [
      { title: "BALANCE DEEPMIVE", desc: "We conduct a complete audit of your financial registers, operational spends, and current debt pipelines." },
      { title: "EFFICIENCY RECON", desc: "We locate hidden operational leaks, simplify recurring expenses, and optimize department cash flows." },
      { title: "CAPITAL MATCHING", desc: "We prepare high-fidelity investment summaries and connect your team with banks and venture capital groups." },
      { title: "SCALE MOCKUPS", desc: "We map out detailed, 5-year growth forecasting reports to ensure every future step is financially sound." }
    ],
    layers: [
      { number: "01", title: "FORECASTING DASHBOARD", tech: ["Chart Canvas", "Excel Modeling", "Burn-rate Hud"], purpose: "Modeling visual capital pathways, displaying monthly burn-rates, and presenting growth projections in interactive executive layouts.", color: "var(--accent-primary)" },
      { number: "02", title: "EFFICIENCY BLUEPRINT CORE", tech: ["Expense Auditing", "Consolidation Logic", "Leasing Core"], purpose: "Calculating cost-saving pathways, structuring debt consolidation plans, and identifying capital opportunities.", color: "#00f0ff" },
      { number: "03", title: "INVESTOR FUNDING MATRIX", tech: ["HNW Pitch Deck", "VC Matching Core", "Credit Registers"], purpose: "Aligning operational structures with target investor metrics, securing investment pitches, and coordinating corporate finances.", color: "#a855f7" }
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
      <section className="theme-brown" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '120px', paddingBottom: '80px' }}>
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
              
              <motion.div variants={fadeUp} className="dh-label" style={{ color: 'var(--accent-primary)', marginBottom: '1.2rem' }}>
                SERVICE EXPERTISE
              </motion.div>
              
              <h1 className="dh-display" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)', marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>{line1}</motion.span></span>
                {line2 && <span className="dh-hero-line"><motion.span custom={1} variants={titleV} className="dh-hero-stroked">{line2}</motion.span></span>}
                <span className="dh-hero-line"><motion.span custom={2} variants={titleV} className="dh-hero-accent">{line3}</motion.span></span>
              </h1>
              
              <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '580px', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {service.desc}
              </motion.p>
            </motion.div>

            {/* Right Visual Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              style={{ width: '100%', position: 'relative' }}
            >
              <div style={{ position: 'absolute', inset: '-15px', background: 'radial-gradient(circle, rgba(196, 145, 58, 0.15) 0%, transparent 70%)', filter: 'blur(20px)', zIndex: 1, pointerEvents: 'none' }} />
              
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                width: '100%', 
                aspectRatio: '16/10', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid var(--accent-primary)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(196, 145, 58, 0.08)'
              }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }} 
                />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

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
                    <Link to="/dummyhome/get-consultation" className="dh-btn-fill" style={{ 
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
                <Link to="/dummyhome/get-consultation" className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '380px', position: 'relative' }}>
              <div style={{ 
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

    </div>
  );
};

export default DHServiceDetail;
