import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Mail, Zap, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import '../../components/dummyhome2/DummyHome2.css';

const titleV = {
  hidden: { y: 100, opacity: 0 },
  visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 1, ease: [.22, 1, .36, 1], delay: .2 + i * .12 } })
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const DH2Newsletters = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/newsletters`, {
          headers: { 'Accept': 'application/json' }
        });
        if (res.data.success) {
          setNewsletters(res.data.data || []);
        } else {
          setNewsletters(Array.isArray(res.data) ? res.data : []);
        }
      } catch {
        setNewsletters([]);
      } finally { 
        setLoading(false); 
      }
    })();
  }, []);

  return (
    <div className="dh2-newsletters-page">
      
      {/* 1. CINEMATIC HERO */}
      <section className="dh2-hero" style={{ minHeight: '60vh' }}>
        <div className="dh2-container">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="dh2-label" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} className="dh2-hero-accent" /> PERIODICALS
            </motion.div>
            
            <h1 className="dh2-display dh2-hero-title" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginBottom: '2rem' }}>
              <span className="dh2-hero-line">
                <motion.span custom={0} variants={titleV}>CURATED</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={1} variants={titleV} className="dh2-hero-stroked">DIGITAL</motion.span>
              </span>
              <span className="dh2-hero-line">
                <motion.span custom={2} variants={titleV} className="dh2-hero-accent">INTEL.</motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="dh2-body" style={{ maxWidth: '600px', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              Our weekly transmission of <strong style={{ color: 'var(--accent)' }}>market analysis, tech trends, and strategic plays</strong>. No fluff, just signal.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. NEWSLETTER LIST */}
      <section className="dh2-section" style={{ paddingTop: 0 }}>
        <div className="dh2-container" style={{ maxWidth: '900px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <div className="dh2-loader-text" style={{ fontSize: '1.5rem' }}>RETRIEVING ARCHIVES...</div>
            </div>
          ) : newsletters.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <Mail size={48} style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }} />
              <p className="dh2-body">Our archives are currently private. Subscribe to receive the next edition.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {newsletters.map((n: any, i: number) => (
                <motion.div 
                  key={n._id || i} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: i * 0.06 }}
                >
                  <Link to={`/dummyhome2/newsletters/${n.slug || n._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div 
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-s)', borderRadius: '24px', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.4s var(--ease-out)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateX(10px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-s)'; e.currentTarget.style.transform = 'none'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--bg-base)', border: '1px solid var(--border-s)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                          <Zap size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                            {n.category || 'Weekly Intel'}
                          </div>
                          <h3 className="dh2-heading" style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{n.title}</h3>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="dh2-nl-meta">
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Clock size={14} /> {new Date(n.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-s)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. SUBSCRIPTION CTA */}
      <section className="dh2-cta">
        <div className="dh2-cta-watermark">SIGNAL</div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Sparkles size={32} />
          </div>
          <h2 className="dh2-display dh2-cta-title">
            GET THE INSIDE<br /><span>TRACK.</span>
          </h2>
          <p className="dh2-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            Join 5,000+ industry leaders who receive our weekly briefing. No spam, just pure strategic value.
          </p>
          <form style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }} className="dh2-newsletter-form">
            <input type="email" placeholder="Your executive email" style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '100px', background: 'var(--bg-surface)', border: '1px solid var(--border-s)', color: '#fff', outline: 'none' }} />
            <button className="dh2-btn-fill" style={{ padding: '1rem 2rem' }}>JOIN NOW</button>
          </form>
        </motion.div>
      </section>

    </div>
  );
};

export default DH2Newsletters;
