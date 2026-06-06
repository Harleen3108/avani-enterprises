import React from 'react';
import { motion } from 'framer-motion';

const row1Logos = [
  { name: 'Paragon', logo: '/paragon.png' },
  { name: 'Indus group of institutions', logo: '/indus.jpeg' },
  { name: 'Policicue', logo: '/policucue.jpeg' },
  { name: 'Frd Nutrition', logo: '/frd-nutrition-new.png' },
  { name: 'Rohtak Shoe Co.', logo: '/shoes.jpeg' },
  { name: 'Gaon se ghar tak', logo: '/gaonsegharatk.png' },
];

const row2Logos = [
  { name: 'Redball Cricket Ground', logo: '/redball.png' },
  { name: 'The Page', logo: '/thepage.png' },
  { name: 'King\'s Pet Hospital', logo: '/kingspet.png' },
  { name: 'Hi-tech Homes', logo: '/hitech.jpeg' },
  { name: 'Sanjeevni Hospital', logo: '/sanjeevni.jpeg' },
];

const DummyLogoMarquee = ({ clientLogos }: any) => {
  const tripledRow1 = [...row1Logos, ...row1Logos, ...row1Logos];
  const tripledRow2 = [...row2Logos, ...row2Logos, ...row2Logos];

  return (
    <section className="theme-brown" style={{ padding: '44px 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-faint)', borderBottom: '1px solid var(--border-faint)', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', letterSpacing: '0.32em', color: 'var(--text-tertiary)', fontWeight: 600 }}>TRUSTED BY 150+ COMPANIES WORLDWIDE</span>
      </div>
      
      {/* Row 1 moving left */}
      <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
        <motion.div animate={{ x: ['0%', '-33.33%'] }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          {tripledRow1.map((l: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 moving right */}
      <div style={{ overflow: 'hidden' }}>
        <motion.div animate={{ x: ['-33.33%', '0%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          {tripledRow2.map((l: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '100px', flexShrink: 0 }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', overflow: 'hidden' }}>
                <img src={l.logo} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DummyLogoMarquee;