import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const bgImages: Record<string, string> = {
  'web-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop',
  'seo-content': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&fit=crop',
  'social-media': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&fit=crop',
  'ai-solutions': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&fit=crop',
  'podcast-production': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&fit=crop',
  'financial-consulting': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&fit=crop',
};

const DummyServices = ({ services }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Side image panel */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '38%', zIndex: 1, overflow: 'hidden' }} className="dummy-services-panel">
        {/* Default abstract art */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, var(--bg-tertiary) 0%, var(--bg-secondary) 40%, var(--bg-tertiary) 100%)' }}>
          <svg width="100%" height="100%" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
            <circle cx="250" cy="350" r="180" stroke="var(--border-light)" strokeWidth="1" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 250 350" to="360 250 350" dur="60s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="350" r="130" stroke="var(--border-light)" strokeWidth="1" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="360 250 350" to="0 250 350" dur="45s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="350" r="80" stroke="var(--border-light)" strokeWidth="1" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 250 350" to="360 250 350" dur="30s" repeatCount="indefinite" />
            </circle>
            <line x1="0" y1="0" x2="500" y2="800" stroke="var(--border-faint)" strokeWidth="1" />
            <line x1="100" y1="0" x2="500" y2="640" stroke="var(--border-faint)" strokeWidth="1" />
            <line x1="500" y1="0" x2="0" y2="800" stroke="var(--border-faint)" strokeWidth="1" />
            <polygon points="250,150 380,350 250,550 120,350" stroke="var(--border-light)" strokeWidth="1" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 250 350" to="360 250 350" dur="90s" repeatCount="indefinite" />
            </polygon>
            <circle cx="250" cy="350" r="4" fill="var(--accent-hover)">
              <animate attributeName="opacity" values="0.25;0.6;0.25" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="250" cy="170" r="2" fill="var(--accent-hover)" />
            <circle cx="250" cy="530" r="2" fill="var(--accent-hover)" />
            <circle cx="130" cy="350" r="2" fill="var(--accent-hover)" />
            <circle cx="370" cy="350" r="2" fill="var(--accent-hover)" />
          </svg>
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '320px', height: '320px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-90deg)', fontFamily: "'Clash Display', sans-serif", fontSize: '120px', letterSpacing: '0.3em', color: 'var(--border-faint)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none', fontWeight: 700 }}>
            EXPERTISE
          </div>
        </div>

        {/* Hovered service image */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div key={hovered} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'absolute', inset: 0 }}>
              <img src={bgImages[services[hovered]?.slug] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-secondary) 0%, var(--glass-bg) 50%, transparent 100%)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 48px', position: 'relative', zIndex: 5 }} className="dummy-services-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>OUR EXPERTISE</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            WHAT WE<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>CREATE</span>
          </h2>
        </motion.div>

        {/* Service list */}
        <div style={{ width: '62%' }} className="dummy-services-list">
          {services.map((svc: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }}>
              <Link to={`/services/${svc.slug}`} style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <div style={{
                  display: 'flex', alignItems: 'center', gap: '20px',
                  padding: '18px 0', borderBottom: '1px solid var(--border-faint)',
                  transition: 'all 0.3s', cursor: 'pointer',
                  background: hovered === i ? 'var(--accent-hover)' : 'transparent',
                  borderRadius: '4px', paddingLeft: hovered === i ? '10px' : '0',
                }}>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', color: hovered === i ? 'var(--accent-primary)' : 'var(--text-tertiary)', letterSpacing: '0.15em', flexShrink: 0, minWidth: '28px', transition: 'color 0.3s', fontWeight: 600 }}>
                    {svc.index}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 600, color: hovered === i ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '0.02em', transition: 'color 0.3s', marginBottom: 0 }}>
                      {svc.title.toUpperCase()}
                    </h3>
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                          style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.65, fontWeight: 400, maxWidth: '420px', marginTop: '6px' }}>
                          {svc.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${hovered === i ? 'var(--accent-primary)' : 'var(--border-faint)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', transform: hovered === i ? 'rotate(-45deg)' : 'rotate(0)', flexShrink: 0 }}>
                    <ArrowUpRight size={15} color={hovered === i ? 'var(--accent-primary)' : 'var(--text-tertiary)'} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .dummy-services-panel { display: none !important; } .dummy-services-list { width: 100% !important; } }
        @media (max-width: 768px) { .dummy-services-container { padding: 60px 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyServices;