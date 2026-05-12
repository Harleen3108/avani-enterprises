import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Search, Share2, Zap, Radio, PieChart, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

/* Reusable components from other pages */
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

const serviceData: Record<string, { icon: any; title: string; desc: string; longDesc: string; features: string[]; stats: string[][] }> = {
  'web-app-development': {
    icon: <Code size={48} />,
    title: 'Web & App Development',
    desc: 'Crafting high-performance digital architectures with precision and scale.',
    longDesc: 'We build scalable, high-performance web and mobile applications tailored to your business needs. Our expert team utilizes cutting-edge technologies to deliver seamless user experiences and robust backend systems.',
    features: ['Custom React & Next.js Frameworks', 'Mobile App Ecosystems (iOS & Android)', 'Enterprise-Grade Backend Solutions', 'API Integration & Microservices', 'UI/UX Design & Prototyping'],
    stats: [['99.9%', 'Uptime'], ['50+', 'Apps Built'], ['10x', 'Scale']]
  },
  'seo-content-marketing': {
    icon: <Search size={48} />,
    title: 'SEO & Content Marketing',
    desc: 'Dominating search landscapes through strategic authority and visibility.',
    longDesc: 'Drive organic traffic and establish your brand as an industry authority. Our data-driven SEO strategies and compelling content marketing campaigns ensure your business ranks high on search engines and resonates with your audience.',
    features: ['Semantic SEO & Keyword Research', 'Authority Building & Backlink Strategy', 'High-Impact Content Creation', 'Technical SEO Audits', 'Performance Analytics & Reporting'],
    stats: [['250%', 'Traffic Growth'], ['1st Page', 'Rankings'], ['5M+', 'Impressions']]
  },
  'social-media-marketing': {
    icon: <Share2 size={48} />,
    title: 'Social Media Marketing',
    desc: 'Building meaningful brand narratives that resonate globally.',
    longDesc: 'Amplify your brand voice and engage with your community across all major social platforms. We create data-backed social strategies, scroll-stopping content, and targeted campaigns that drive conversions.',
    features: ['Narrative Design & Brand Storytelling', 'Viral Mechanics & Trend Jacking', 'Community Growth & Engagement', 'Paid Social Campaigns (Meta, LinkedIn)', 'Influencer Partnerships'],
    stats: [['500K+', 'Followers Reached'], ['12%', 'Avg. Engagement'], ['3x', 'ROI']]
  },
  'ai-solutions': {
    icon: <Zap size={48} />,
    title: 'AI Solutions',
    desc: 'Harnessing the power of automation to drive operational intelligence.',
    longDesc: 'Integrate intelligent automation and artificial intelligence into your business processes. From custom chatbots to predictive analytics, we help you leverage AI to optimize operations and make smarter decisions.',
    features: ['Large Language Model (LLM) Integration', 'Business Process Automation', 'Intelligent AI Chatbots', 'Predictive Analytics & Data Mining', 'Custom AI Tool Development'],
    stats: [['60%', 'Time Saved'], ['24/7', 'Automation'], ['0', 'Human Errors']]
  },
  'podcast-production': {
    icon: <Radio size={48} />,
    title: 'Podcast Production',
    desc: 'Amplifying your brand voice through cinematic audio experiences.',
    longDesc: 'Launch and scale a professional podcast that captivates listeners. We handle everything from concept development and high-end audio engineering to distribution and audience growth strategies.',
    features: ['High-End Audio Engineering & Mixing', 'Global Distribution (Spotify, Apple)', 'Narrative Production & Scripting', 'Guest Sourcing & Management', 'Podcast Monetization Strategies'],
    stats: [['1M+', 'Downloads'], ['Top 10', 'Charts'], ['100+', 'Episodes']]
  },
  'financial-consulting': {
    icon: <PieChart size={48} />,
    title: 'Financial Consulting',
    desc: 'Navigating market complexities with data-driven strategic oversight.',
    longDesc: 'Scale your business with confidence backed by expert financial guidance. We provide strategic planning, risk management, and capital optimization strategies to accelerate your growth trajectory.',
    features: ['Growth Capital Acquisition', 'Risk Management & Mitigation', 'Strategic Scaling & M&A', 'Financial Modeling & Forecasting', 'Operational Cost Optimization'],
    stats: [['$10M+', 'Capital Raised'], ['30%', 'Cost Reduction'], ['5x', 'Value Growth']]
  }
};

const DHServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  useEffect(() => { window.scrollTo(0, 0); }, []);

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

  return (
    <div className="dh-service-detail-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={400} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp}>
              <Link to="/dummyhome/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '2rem', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <ArrowLeft size={14} /> BACK TO SERVICES
              </Link>
            </motion.div>
            
            <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{service.icon}</div>
            
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem' }}>
              {service.title.toUpperCase()}
            </h1>
            
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
              {service.desc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. CONTENT */}
      <section className="theme-beige" style={{ position: 'relative', padding: '100px 0', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.04} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }} className="dh-responsive-grid">
            
            {/* Left Col */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="dh-heading" style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>OVERVIEW</h2>
              <p className="dh-body" style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                {service.longDesc}
              </p>
              
              <h2 className="dh-heading" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>KEY CAPABILITIES</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {service.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '16px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-faint)' }}>
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
                <h3 style={{ fontFamily: "'Outfit'", fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '2rem' }}>IMPACT METRICS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                  {service.stats.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '3rem', fontFamily: "'Syne'", fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s[0]}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', marginTop: '4px' }}>{s[1].toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Box */}
              <div style={{ padding: '32px', background: 'linear-gradient(135deg, var(--card-bg), var(--bg-secondary))', borderRadius: '24px', border: '1px solid var(--accent-primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'var(--accent-primary)', opacity: 0.05, filter: 'blur(30px)' }} />
                <h3 className="dh-heading" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>READY TO START?</h3>
                <p className="dh-body" style={{ fontSize: '0.85rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                  Partner with us to implement these solutions and accelerate your business growth.
                </p>
                <Link to="/dummyhome/get-consultation" className="dh-btn-fill" style={{ width: '100%', justifyContent: 'center' }}>
                  GET STARTED <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHServiceDetail;
