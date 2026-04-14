import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const words = ['Success Story', 'Digital Future', 'Growth Engine', 'Next Big Move'];

const DummyCTA = () => {
  const [wi, setWi] = useState(0);
  useEffect(() => { const t = setInterval(() => setWi(p => (p + 1) % words.length), 3000); return () => clearInterval(t); }, []);

  return (
    <section style={{ padding: '72px 0 64px', background: '#0F0C09', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(80px, 14vw, 180px)', fontWeight: 400, color: 'rgba(196,145,58,0.04)', letterSpacing: '0.08em', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>
        AVANI
      </div>
      <div style={{ position: 'absolute', top: '30%', left: '15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(196,145,58,0.06) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="dummy-cta-grid">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '28px', height: '2px', background: '#C4913A' }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: '#C4913A' }}>START TODAY</span>
            </div>

            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, color: '#F5EDD8', lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: '8px' }}>
              LET'S BUILD YOUR
            </h2>

            <div style={{ overflow: 'hidden', height: 'clamp(34px, 4.5vw, 56px)', marginBottom: '8px' }}>
              <motion.div key={wi} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, color: 'transparent', WebkitTextStroke: '1.5px #C4913A', lineHeight: 0.92, letterSpacing: '0.02em', display: 'block' }}>
                {words[wi].toUpperCase()}
              </motion.div>
            </div>

            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, color: '#F5EDD8', lineHeight: 0.92, letterSpacing: '0.02em' }}>
              TOGETHER
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div style={{ width: '36px', height: '2px', background: '#C4913A', marginBottom: '24px' }} />
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', lineHeight: 1.75, color: 'rgba(245,237,216,0.55)', fontWeight: 300, marginBottom: '32px' }}>
              Partner with us to unlock growth opportunities, streamline operations, and achieve your business vision with expert guidance every step of the way.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
              <Link to="/get-consultation" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                background: 'linear-gradient(135deg, #C4913A, #E8B96A)', color: '#0A0705',
                borderRadius: '5px', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '14px', letterSpacing: '0.16em', boxShadow: '0 6px 24px rgba(196,145,58,0.3)',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(196,145,58,0.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(196,145,58,0.3)'; }}
              >
                GET CONSULTATION <ArrowRight size={13} />
              </Link>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                background: 'transparent', color: '#F5EDD8', border: '1px solid rgba(245,237,216,0.18)',
                borderRadius: '5px', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '14px', letterSpacing: '0.16em', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4913A'; (e.currentTarget as HTMLElement).style.color = '#C4913A'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,237,216,0.18)'; (e.currentTarget as HTMLElement).style.color = '#F5EDD8'; }}
              >
                TALK TO EXPERT
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '28px', paddingTop: '24px', borderTop: '1px solid rgba(245,237,216,0.07)' }}>
              {[['150+', 'Clients'], ['300+', 'Projects'], ['8+', 'Years']].map(([num, label], i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '28px', color: '#C4913A', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '9px', color: 'rgba(245,237,216,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '3px' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, #C4913A 25%, #E8B96A 50%, #C4913A 75%, transparent)' }} />
      <style>{`
        @media (max-width: 1024px) { .dummy-cta-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default DummyCTA;