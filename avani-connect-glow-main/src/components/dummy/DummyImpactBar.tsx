import React from 'react';
import { motion } from 'framer-motion';
import DummyAnimatedCounter from './DummyAnimatedCounter';

const stats = [
  { target: 150, suffix: '+', label: 'Happy Clients', sub: 'Worldwide' },
  { target: 300, suffix: '+', label: 'Projects Delivered', sub: 'And counting' },
  { target: 85, suffix: '%', label: 'Avg. Growth Rate', sub: 'For our clients' },
  { target: 8, suffix: '+', label: 'Years of Excellence', sub: 'Since 2016' },
];

const DummyImpactBar = () => {
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '300px', background: 'radial-gradient(ellipse, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Top/bottom accent lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 30%, var(--border-light) 70%, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 30%, var(--border-light) 70%, transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '14px' }}
        >
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.3em', color: 'var(--accent-primary)', fontWeight: 600 }}>OUR IMPACT IN NUMBERS</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }} className="dummy-impact-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center',
                padding: '36px 24px',
                position: 'relative',
                borderRight: i < 3 ? '1px solid var(--border-faint)' : 'none',
              }}
            >
              {/* Glow behind number */}
              <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '120px', height: '80px', background: 'radial-gradient(ellipse, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{
                fontFamily: "'Clash Display', Impact, sans-serif",
                fontSize: 'clamp(36px, 8vw, 80px)',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                lineHeight: 1,
                position: 'relative',
              }}>
                <DummyAnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <div style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.12em',
                marginTop: '12px',
                textTransform: 'uppercase',
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                marginTop: '4px',
                fontWeight: 400,
              }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dummy-impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dummy-impact-grid > div { border-right: none !important; border-bottom: 1px solid var(--border-faint); padding: 24px 16px !important; }
        }
        @media (max-width: 480px) {
          .dummy-impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default DummyImpactBar;
