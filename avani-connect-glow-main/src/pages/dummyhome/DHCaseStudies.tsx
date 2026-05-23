import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import RotatingText from '../../components/RotatingText';
import { ArrowRight, BookOpen, BarChart3, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const Grain = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
);
const GridBg = ({ size = 40, opacity = 0.06 }: any) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />
);
const GlowBlob = ({ top, left, right, bottom, w = 300, opacity = 0.05, blur = 100 }: any) => (
  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [opacity, opacity * 1.4, opacity] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: w, height: w, borderRadius: '50%', background: 'var(--accent-primary)', filter: `blur(${blur}px)`, top, left, right, bottom, pointerEvents: 'none', zIndex: 1 }} />
);
const LuxuryLine = () => (
  <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 20%, var(--accent-light) 50%, var(--accent-primary) 80%, transparent)', opacity: 0.3 }} />
);

const caseStudies = [
  {
    id: 1,
    category: 'web-development',
    title: "TechStart India - E-commerce Platform",
    client: "TechStart India",
    industry: "E-commerce",
    challenge: "TechStart needed a modern, scalable e-commerce platform to compete with established players in the Indian market.",
    solution: "Developed a custom e-commerce solution with advanced features including AI-powered recommendations, mobile-first design, and integrated payment gateways.",
    results: {
      traffic: "300% increase in website traffic",
      conversions: "150% improvement in conversion rates",
      revenue: "₹2.5Cr additional revenue in first year",
      mobile: "85% of sales from mobile devices"
    },
    duration: "6 months",
    team: "5 developers, 2 designers, 1 PM",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Stripe"]
  },
  {
    id: 2,
    category: 'seo-content',
    title: "EcoSolutions - SEO & Content Strategy",
    client: "EcoSolutions",
    industry: "Environmental Services",
    challenge: "EcoSolutions struggled with low organic visibility and needed to establish thought leadership in the sustainability space.",
    solution: "Implemented comprehensive SEO strategy with content marketing, technical optimization, and local SEO to target environmentally conscious businesses.",
    results: {
      rankings: "Ranked #1 for 15 target keywords",
      traffic: "400% increase in organic traffic",
      leads: "250% more qualified leads",
      authority: "Established as industry thought leader"
    },
    duration: "8 months",
    team: "2 SEO specialists, 3 content writers",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["WordPress", "Yoast SEO", "Google Analytics", "SEMrush"]
  },
  {
    id: 3,
    category: 'social-media',
    title: "HealthTech - Social Media Campaign",
    client: "HealthTech",
    industry: "Healthcare Technology",
    challenge: "HealthTech needed to increase brand awareness and generate leads through social media platforms.",
    solution: "Created targeted social media campaigns across LinkedIn, Instagram, and Facebook with educational content and lead generation strategies.",
    results: {
      followers: "200% increase in social media followers",
      engagement: "150% improvement in engagement rates",
      leads: "300% more qualified leads",
      awareness: "Significant brand awareness growth"
    },
    duration: "Ongoing",
    team: "2 social media managers, 1 designer",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    technologies: ["LinkedIn Ads", "Facebook Ads", "Instagram", "Hootsuite"]
  },
  {
    id: 4,
    category: 'ai-solutions',
    title: "FinServe - AI-Powered Customer Service",
    client: "FinServe",
    industry: "Financial Services",
    challenge: "FinServe needed to automate customer service operations while maintaining high service quality.",
    solution: "Developed AI-powered chatbot, automated response system, lead management automation, and WhatsApp text automation integrated with existing CRM and knowledge base.",
    results: {
      automation: "70% of customer queries automated",
      savings: "₹50L annual cost savings",
      satisfaction: "95% customer satisfaction rate",
      efficiency: "3x faster response times"
    },
    duration: "4 months",
    team: "3 AI developers, 1 UX designer",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    technologies: ["Python", "TensorFlow", "NLP", "AWS", "Dialogflow", "WhatsApp API"]
  },
  {
    id: 5,
    category: 'podcast-production',
    title: "EduTech - Educational Podcast Series",
    client: "EduTech",
    industry: "Education Technology",
    challenge: "EduTech wanted to establish thought leadership and reach educators through podcast content.",
    solution: "Created and produced a weekly educational podcast series with industry experts and practical insights.",
    results: {
      downloads: "50,000+ monthly downloads",
      subscribers: "10,000+ podcast subscribers",
      partnerships: "15+ educational partnerships",
      authority: "Established as education thought leader"
    },
    duration: "Ongoing",
    team: "1 producer, 1 host, 1 audio engineer",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop",
    technologies: ["Adobe Audition", "Zoom", "Anchor", "Spotify"]
  },
  {
    id: 6,
    category: 'financial-consulting',
    title: "RetailPlus - Financial Strategy & Funding",
    client: "RetailPlus",
    industry: "Retail",
    challenge: "RetailPlus needed strategic financial guidance to scale operations and secure funding for expansion.",
    solution: "Provided comprehensive financial consulting including business model optimization, funding strategy, and investor pitch preparation.",
    results: {
      funding: "₹10Cr secured in Series A funding",
      valuation: "3x increase in company valuation",
      growth: "200% revenue growth",
      expansion: "Successfully expanded to 5 new cities"
    },
    duration: "6 months",
    team: "2 financial consultants, 1 strategy expert",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    technologies: ["Financial Modeling", "Pitch Decks", "Valuation Analysis"]
  }
];

const DHCaseStudies = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="dh-casestudies-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* 1. HERO */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={350} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh-label">REAL-WORLD IMPACT</motion.div>
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}>
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>OUR SUCCESS</motion.span></span>
              <span className="dh-hero-line">
                <motion.span custom={1} variants={titleV} style={{ color: 'var(--accent-primary)' }}>
                  <RotatingText words={['STORIES', 'IMPACT', 'RESULTS', 'CASES']} interval={2500} className="dh-display" />
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
              In-depth analysis of how we deliver measurable results for our partners across industries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <LuxuryLine />

      {/* 2. CASE STUDIES GRID */}
      <section className="theme-beige" style={{ position: 'relative', padding: '60px 0 80px', background: 'var(--bg-primary)', overflow: 'hidden' }}>
        <Grain />
        <GridBg size={30} opacity={0.03} />
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {caseStudies.map((study, i) => (
              <motion.div key={study.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div style={{
                  background: 'linear-gradient(90deg, var(--card-bg) 0%, rgba(240, 235, 225, 0.05) 100%)', 
                  borderRadius: '12px', border: '1px solid var(--border-faint)', borderLeft: '4px solid var(--accent-primary)',
                  overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem',
                  backdropFilter: 'blur(10px)', transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'linear-gradient(90deg, rgba(240, 235, 225, 0.08) 0%, rgba(240, 235, 225, 0.15) 100%)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'var(--border-faint)'; e.currentTarget.style.background = 'linear-gradient(90deg, var(--card-bg) 0%, rgba(240, 235, 225, 0.05) 100%)'; }}
                  className="dh-responsive-flex-bar"
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={study.image} alt={study.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>CLIENT: {study.client.toUpperCase()}</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-tertiary)', background: 'var(--bg-primary)', padding: '2px 8px', borderRadius: '100px' }}>{study.category.toUpperCase()}</span>
                      </div>
                      <h3 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{study.title}</h3>
                      <p className="dh-body" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{study.challenge}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
                    <div style={{ padding: '8px 12px', background: 'var(--accent-hover)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <BarChart3 size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{Object.values(study.results)[0]}</span>
                    </div>

                    <Link to="/case-studies" style={{ textDecoration: 'none' }}>
                      <button className="dh-btn-ghost" style={{ padding: '8px 16px', fontSize: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>READ <ArrowRight size={12} style={{ marginLeft: '4px' }} /></button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .dh-responsive-flex-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .dh-responsive-flex-bar > div {
            width: 100% !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .dh-responsive-flex-bar img {
            width: 100% !important;
            height: 150px !important;
            object-fit: cover !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DHCaseStudies;
