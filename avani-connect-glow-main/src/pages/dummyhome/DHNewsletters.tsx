import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Download, Eye, Sparkles, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../components/dummy/DummyHome.css';

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

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const newsletters = [
  { _id: '1', title: 'The Future of AI in Enterprise', excerpt: 'How Large Language Models are transforming business operations.', publishedAt: '2026-05-10T10:00:00.000Z', slug: 'future-ai-enterprise' },
  { _id: '2', title: 'Scaling Digital Architecture', excerpt: 'Best practices for building high-performance web systems.', publishedAt: '2026-04-15T10:00:00.000Z', slug: 'scaling-digital-architecture' },
  { _id: '3', title: 'Mastering Semantic SEO', excerpt: 'Dominating search landscapes through strategic authority.', publishedAt: '2026-03-20T10:00:00.000Z', slug: 'mastering-semantic-seo' },
  { _id: '4', title: 'The Power of Narrative Design', excerpt: 'Building meaningful brand stories that resonate globally.', publishedAt: '2026-02-05T10:00:00.000Z', slug: 'power-narrative-design' }
];

const DHNewsletters = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubscribe = (e: any) => { 
    e.preventDefault(); 
    if (email) setIsSubscribed(true); 
  };

  return (
    <div className="dh-newsletters-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* 1. CINEMATIC HERO */}
      <section className="theme-brown" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <Grain />
        <GridBg size={50} opacity={0.05} />
        <GlowBlob top="-5%" right="-5%" w={350} opacity={0.04} blur={120} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />
        
        <div className="dh-container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <div className="dh-label">RESOURCES & INSIGHTS</div>
            
            <h1 className="dh-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}>
              <span className="dh-hero-line"><motion.span custom={0} variants={titleV}>CURATED</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={1} variants={titleV} className="dh-hero-stroked">DIGITAL</motion.span></span>
              <span className="dh-hero-line"><motion.span custom={2} variants={titleV} className="dh-hero-accent">INTEL.</motion.span></span>
            </h1>

            <motion.p variants={fadeUp} className="dh-body" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
              Strategic insights, market intelligence, and technical oversight delivered directly to your <strong style={{ color: 'var(--accent-primary)' }}>command center.</strong>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. SUBSCRIPTION BAR */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)' }}>
        <div className="dh-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }} className="dh-responsive-grid">
            <div>
              <div className="dh-label">STAY INFORMED</div>
              <h2 className="dh-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>THE INSIDE TRACK.</h2>
              <p className="dh-body" style={{ fontSize: '0.95rem' }}>Get exclusive deep-dives that we don't publish anywhere else.</p>
            </div>

            <div>
              {isSubscribed ? (
                <div style={{ background: 'var(--accent-hover)', padding: '2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
                  <CheckCircle size={32} />
                  <div>
                    <h4 className="dh-heading" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>WELCOME TO THE INNER CIRCLE</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>You've been successfully registered for our next transmission.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '1rem' }} className="dh-responsive-grid">
                  <input type="email" placeholder="ENTER YOUR WORK EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: '100px', padding: '0 2rem', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, outline: 'none', height: '60px' }} />
                  <button type="submit" className="dh-btn-fill" style={{ height: '60px' }}><Send size={18} /> SUBSCRIBE</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHIVE LIST */}
      <section style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
        <div className="dh-container">
          <div style={{ marginBottom: '3rem' }}>
            <div className="dh-label">ARCHIVES</div>
            <h2 className="dh-display" style={{ fontSize: '3rem' }}>PREVIOUS EDITIONS</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {newsletters.map((item, i) => (
              <motion.div 
                key={item._id} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '16px', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-faint)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  className="dh-responsive-grid"
                >
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-hover)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="dh-heading" style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{item.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{item.excerpt}</p>
                      <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Transmission Date: {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
                    <Link to={`/dummyhome/newsletters/${item.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--border-light)', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    >
                      <Eye size={14} /> VIEW ONLINE
                    </Link>
                    <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--accent-primary)', background: 'transparent', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                    >
                      <Download size={14} /> DOWNLOAD PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DHNewsletters;
