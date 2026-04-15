import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const words = ['Success Story', 'Digital Future', 'Growth Engine', 'Next Big Move'];

const DummyCTA = () => {
  const [wi, setWi] = useState(0);
  useEffect(() => { const t = setInterval(() => setWi(p => (p + 1) % words.length), 3000); return () => clearInterval(t); }, []);

  return (
    <section style={{ padding: '72px 0 64px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(80px, 14vw, 180px)', fontWeight: 700, color: 'var(--border-faint)', letterSpacing: '0.08em', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>
        AVANI
      </div>
      <div style={{ position: 'absolute', top: '30%', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-cta-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="dummy-cta-grid">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>START TODAY</span>
            </div>

            <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(32px, 8vw, 60px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '8px' }}>
              LET'S BUILD YOUR
            </h2>

            <div style={{ overflow: 'hidden', height: 'clamp(34px, 4.5vw, 56px)', marginBottom: '8px' }}>
              <motion.div key={wi} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(32px, 8vw, 60px)', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)', lineHeight: 0.92, letterSpacing: '-0.01em', display: 'block' }}>
                {words[wi].toUpperCase()}
              </motion.div>
            </div>

            <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(32px, 8vw, 60px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              TOGETHER
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div style={{ width: '36px', height: '2px', background: 'var(--accent-primary)', marginBottom: '24px' }} />
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', fontWeight: 400, marginBottom: '32px' }}>
              Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance every step of the way.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
              <Link to="/get-consultation" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))', color: 'var(--bg-primary)',
                borderRadius: '5px', textDecoration: 'none', fontFamily: "'Clash Display', sans-serif",
                fontSize: '14px', letterSpacing: '0.12em', fontWeight: 600, boxShadow: '0 6px 24px var(--border-light)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px var(--border-light)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px var(--border-light)'; }}
              >
                GET CONSULTATION <ArrowRight size={13} />
              </Link>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-light)',
                borderRadius: '5px', textDecoration: 'none', fontFamily: "'Clash Display', sans-serif",
                fontSize: '14px', letterSpacing: '0.12em', fontWeight: 600, transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
              >
                TALK TO EXPERT
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '28px', paddingTop: '24px', borderTop: '1px solid var(--border-faint)' }}>
              {[['150+', 'Clients'], ['300+', 'Projects'], ['8+', 'Years']].map(([num, label], i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '28px', color: 'var(--accent-primary)', lineHeight: 1, fontWeight: 700 }}>{num}</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '3px', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)' }} />
      <style>{`
        @media (max-width: 1024px) { .dummy-cta-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .dummy-cta-container { padding: 0 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyCTA;