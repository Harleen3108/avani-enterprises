import React from 'react';
import { motion } from 'framer-motion';

const DummyProcess = ({ processSteps }: any) => {
  // We can use a subtle palette for the dots to give a touch of life
  const colors = ['#C4913A', '#3B82F6', '#8B5CF6', '#14B8A6', '#F97316', '#22C55E'];

  return (
    <section className="theme-brown" style={{ 
      padding: '80px 0', 
      background: 'var(--bg-secondary)', 
      position: 'relative', 
      overflow: 'hidden',
      borderTop: '1px solid var(--border-faint)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
            OUR STRATEGY
          </span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase' }}>
            HOW WE<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>WORK</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '20px auto 0', lineHeight: 1.6 }}>
            A proven methodology that ensures successful project delivery, measurable results, and absolute transparency from start to finish.
          </p>
        </motion.div>

        {/* Minimalist Grid */}
        <div className="dummy-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {processSteps.map((s: any, i: number) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ 
                background: 'var(--card-bg)', 
                border: '1px solid var(--border-faint)', 
                borderRadius: '16px', 
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                const num = e.currentTarget.querySelector('.proc-bg-num') as HTMLElement;
                if (num) {
                  num.style.color = colors[i % colors.length];
                  num.style.transform = 'scale(1.1)';
                  num.style.opacity = '0.8';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-faint)';
                e.currentTarget.style.transform = 'translateY(0)';
                const num = e.currentTarget.querySelector('.proc-bg-num') as HTMLElement;
                if (num) {
                  num.style.color = 'transparent';
                  num.style.transform = 'scale(1)';
                  num.style.opacity = '0.5';
                }
              }}
            >
              {/* Large background number */}
              <div className="proc-bg-num" style={{ 
                position: 'absolute', 
                top: '24px', 
                right: '24px', 
                fontFamily: "'Outfit', sans-serif", 
                fontSize: '72px', 
                fontWeight: 800, 
                color: 'transparent', 
                WebkitTextStroke: `1.5px ${colors[i % colors.length]}`, 
                lineHeight: 1, 
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.5,
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }}>
                {s.step}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[i % colors.length] }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.15em', fontWeight: 600 }}>
                    STEP {s.step}
                  </span>
                </div>
                
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '0.02em' }}>
                  {s.title}
                </h3>
                
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, fontWeight: 400 }}>
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .dummy-process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .dummy-process-grid > div {
            padding: 16px !important;
          }
          .proc-bg-num {
            font-size: 48px !important;
            top: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DummyProcess;