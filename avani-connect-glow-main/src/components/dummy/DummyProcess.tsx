import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DummyProcess = ({ processSteps }: any) => {
  const [active, setActive] = useState(0);
  const colors = ['#3B82F6', '#8B5CF6', '#F97316', '#14B8A6', '#22C55E', '#6366F1'];

  return (
    <section style={{ padding: '72px 0', background: '#1A1410', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, rgba(245,237,216,0.8) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '300px', background: 'radial-gradient(ellipse, rgba(196,145,58,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: '#C4913A' }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: '#C4913A' }}>METHODOLOGY</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#F5EDD8', lineHeight: 0.92, letterSpacing: '0.02em' }}>
              OUR 6‑D<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px #C4913A' }}>PROCESS</span>
            </h2>
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'rgba(245,237,216,0.45)', maxWidth: '320px', fontWeight: 300, paddingBottom: '4px' }}>
            A proven methodology that ensures successful project delivery and measurable results.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(245,237,216,0.07)', marginBottom: '40px', overflowX: 'auto' }}>
          {processSteps.map((s: any, i: number) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ flex: 1, minWidth: '90px', padding: '12px 8px', background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', color: active === i ? '#C4913A' : 'rgba(196,145,58,0.3)', letterSpacing: '0.2em', marginBottom: '3px' }}>{s.step}</div>
              <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '16px', color: active === i ? '#F5EDD8' : 'rgba(245,237,216,0.3)', letterSpacing: '0.08em', transition: 'color 0.3s' }}>{s.title.toUpperCase()}</div>
              {active === i && <motion.div layoutId="dummy-proc-line" style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: '#C4913A' }} />}
            </button>
          ))}
        </div>

        {/* Active detail */}
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'center', marginBottom: '48px' }} className="dummy-proc-detail">
          <div>
            <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '100px', fontWeight: 400, color: 'transparent', WebkitTextStroke: '1px rgba(196,145,58,0.15)', lineHeight: 1, letterSpacing: '-0.02em' }}>{processSteps[active].step}</div>
            <div style={{ width: '40px', height: '3px', background: colors[active], borderRadius: '2px', marginTop: '-14px' }} />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: '#F5EDD8', letterSpacing: '0.05em', marginBottom: '12px' }}>{processSteps[active].title.toUpperCase()}</h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', lineHeight: 1.75, color: 'rgba(245,237,216,0.55)', fontWeight: 300 }}>{processSteps[active].description}</p>
          </div>
        </motion.div>

        {/* Mini grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '10px' }} className="dummy-proc-grid">
          {processSteps.map((s: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
              onClick={() => setActive(i)}
              style={{ padding: '14px 10px', borderRadius: '10px', border: `1px solid ${active === i ? colors[i] + '55' : 'rgba(245,237,216,0.07)'}`, background: active === i ? `${colors[i]}0A` : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.3s', borderTopColor: active === i ? colors[i] : undefined }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: colors[i], marginBottom: '8px' }} />
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '9px', color: 'rgba(196,145,58,0.5)', letterSpacing: '0.2em', marginBottom: '4px' }}>{s.step}</div>
              <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '13px', color: active === i ? '#F5EDD8' : 'rgba(245,237,216,0.4)', letterSpacing: '0.06em' }}>{s.title.toUpperCase()}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dummy-proc-detail { grid-template-columns: 1fr !important; gap: 16px !important; }
          .dummy-proc-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default DummyProcess;