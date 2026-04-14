import React from 'react';
import { motion } from 'framer-motion';

const DummyLogoMarquee = ({ clientLogos }: any) => {
  const tripled = [...clientLogos, ...clientLogos, ...clientLogos];
  return (
    <section style={{ padding: '44px 0', background: '#0A0705', borderTop: '1px solid rgba(196,145,58,0.1)', borderBottom: '1px solid rgba(196,145,58,0.1)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', letterSpacing: '0.32em', color: 'rgba(196,145,58,0.5)' }}>TRUSTED BY 150+ COMPANIES WORLDWIDE</span>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
        <motion.div animate={{ x: ['0%', '-33.33%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          {tripled.map((l: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(245,237,216,0.04)', border: '1px solid rgba(196,145,58,0.12)', borderRadius: '100px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(245,237,216,0.55)', whiteSpace: 'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.div animate={{ x: ['-33.33%', '0%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          {tripled.map((l: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'rgba(245,237,216,0.04)', border: '1px solid rgba(196,145,58,0.12)', borderRadius: '100px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
              </div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(245,237,216,0.55)', whiteSpace: 'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DummyLogoMarquee;