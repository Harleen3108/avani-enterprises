import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DummyProcess = ({ processSteps }: any) => {
  const [active, setActive] = useState(0);
  const colors = ['#3B82F6', '#8B5CF6', '#F97316', '#14B8A6', '#22C55E', '#6366F1'];

  return (
    <section style={{ padding: '72px 0', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '300px', background: 'radial-gradient(ellipse, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-proc-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>METHODOLOGY</span>
            </div>
            <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              OUR 6‑D<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>PROCESS</span>
            </h2>
          </div>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '320px', fontWeight: 400, paddingBottom: '4px' }}>
            A proven methodology that ensures successful project delivery and measurable results.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-faint)', marginBottom: '40px', overflowX: 'auto' }}>
          {processSteps.map((s: any, i: number) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ flex: 1, minWidth: '90px', padding: '12px 8px', background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }}>
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '10px', color: active === i ? 'var(--accent-primary)' : 'var(--text-tertiary)', letterSpacing: '0.2em', marginBottom: '3px', fontWeight: 600 }}>{s.step}</div>
              <div style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '16px', color: active === i ? 'var(--text-primary)' : 'var(--text-tertiary)', letterSpacing: '0.06em', transition: 'color 0.3s', fontWeight: 600 }}>{s.title.toUpperCase()}</div>
              {active === i && <motion.div layoutId="dummy-proc-line" style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: 'var(--accent-primary)' }} />}
            </button>
          ))}
        </div>

        {/* Active detail */}
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'center', marginBottom: '48px' }} className="dummy-proc-detail">
          <div>
            <div style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '100px', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px var(--border-light)', lineHeight: 1, letterSpacing: '-0.02em' }}>{processSteps[active].step}</div>
            <div style={{ width: '40px', height: '3px', background: colors[active], borderRadius: '2px', marginTop: '-14px' }} />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em', marginBottom: '12px' }}>{processSteps[active].title.toUpperCase()}</h3>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)', fontWeight: 400 }}>{processSteps[active].description}</p>
          </div>
        </motion.div>

        {/* Mini grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '10px' }} className="dummy-proc-grid">
          {processSteps.map((s: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
              onClick={() => setActive(i)}
              style={{ padding: '14px 10px', borderRadius: '10px', border: `1px solid ${active === i ? colors[i] + '55' : 'var(--border-faint)'}`, background: active === i ? `${colors[i]}0A` : 'var(--card-bg)', cursor: 'pointer', transition: 'all 0.3s', borderTopColor: active === i ? colors[i] : undefined }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: colors[i], marginBottom: '8px' }} />
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '9px', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginBottom: '4px', fontWeight: 600 }}>{s.step}</div>
              <div style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '13px', color: active === i ? 'var(--text-primary)' : 'var(--text-tertiary)', letterSpacing: '0.04em', fontWeight: 600 }}>{s.title.toUpperCase()}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dummy-proc-detail { grid-template-columns: 1fr !important; gap: 16px !important; }
          .dummy-proc-grid { grid-template-columns: repeat(3,1fr) !important; }
          .dummy-proc-container { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default DummyProcess;