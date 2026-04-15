import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Star, Zap } from 'lucide-react';

const awards = [
  { icon: Star, label: 'Google Partner', sub: 'Certified Agency' },
  { icon: Shield, label: 'ISO 27001', sub: 'Security Certified' },
  { icon: Award, label: 'Clutch Top Agency', sub: '2024 Winner' },
  { icon: Zap, label: 'Meta Business Partner', sub: 'Official Partner' },
  { icon: Star, label: 'Startup India', sub: 'Recognized Startup' },
  { icon: Award, label: 'Best Digital Agency', sub: 'India 2024' },
];

const DummyAwards = () => {
  const tripled = [...awards, ...awards, ...awards];

  return (
    <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 30%, var(--border-light) 70%, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-light) 30%, var(--border-light) 70%, transparent)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-awards-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>RECOGNITION</span>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92 }}>
            AWARDS & <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>CERTIFICATIONS</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, var(--bg-secondary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, var(--bg-secondary), transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <motion.div
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '16px', width: 'max-content' }}
        >
          {tripled.map((award, i) => {
            const Icon = award.icon;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 24px', borderRadius: '14px', flexShrink: 0,
                background: 'var(--card-bg)',
                border: '1px solid var(--border-faint)',
                backdropFilter: 'blur(10px)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Shimmer effect */}
                <div style={{
                  position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, var(--accent-hover), transparent)',
                  animation: `dummy-shimmer ${8 + (i % 3) * 2}s ease-in-out infinite`,
                  pointerEvents: 'none',
                }} />

                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'var(--accent-hover)',
                  border: '1px solid var(--border-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color="var(--accent-primary)" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
                    letterSpacing: '0.04em', whiteSpace: 'nowrap',
                  }}>
                    {award.label}
                  </div>
                  <div style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '11px', color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap', marginTop: '1px',
                  }}>
                    {award.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @keyframes dummy-shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @media (max-width: 768px) { .dummy-awards-container { padding: 0 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyAwards;
