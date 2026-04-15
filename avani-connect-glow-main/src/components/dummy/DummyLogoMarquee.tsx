import React from 'react';
import { motion } from 'framer-motion';

const DummyLogoMarquee = ({ clientLogos }: any) => {
  const tripled = [...clientLogos, ...clientLogos, ...clientLogos];
  return (
    <section style={{ padding: '44px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '10px', letterSpacing: '0.32em', color: 'var(--text-tertiary)', fontWeight: 600 }}>TRUSTED BY 150+ COMPANIES WORLDWIDE</span>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
        <motion.div animate={{ x: ['0%', '-33.33%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          {tripled.map((l: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
              </div>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.div animate={{ x: ['-33.33%', '0%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          {tripled.map((l: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
              </div>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DummyLogoMarquee;