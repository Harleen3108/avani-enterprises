import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, ShoppingCart, Building2, Landmark, UtensilsCrossed, Cpu, Hotel, Scale } from 'lucide-react';

const industries = [
  { icon: GraduationCap, label: 'Education' },
  { icon: Heart, label: 'Healthcare' },
  { icon: ShoppingCart, label: 'E-Commerce' },
  { icon: Building2, label: 'Real Estate' },
  { icon: Landmark, label: 'Finance' },
  { icon: UtensilsCrossed, label: 'Food & Nutrition' },
  { icon: Cpu, label: 'Technology' },
  { icon: Hotel, label: 'Hospitality' },
  { icon: Scale, label: 'Legal' },
];

const DummyIndustries = () => {
  return (
    <section className="theme-brown" style={{ padding: '100px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-primary)', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
            VERTICALS
          </span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase' }}>
            INDUSTRIES WE<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>SERVE</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '20px auto 0', fontWeight: 400, lineHeight: 1.6 }}>
            From education to fintech, we bring domain-specific expertise to digital transformations across 9+ industries.
          </p>
        </motion.div>

        {/* Organic Floating Bubble Cluster */}
        <div className="dh-industry-cluster" style={{ display: 'grid', gap: '24px', justifyContent: 'center', padding: '40px 0' }}>
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            // Create a staggered floating effect by varying duration and delay
            const floatDuration = 4 + (i % 3);
            const floatDelay = i * 0.2;
            const floatOffset = i % 2 === 0 ? 15 : -15;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  opacity: { delay: i * 0.1, duration: 0.6 },
                  scale: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  y: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
                }}
                className="dh-industry-bubble-wrapper"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <motion.div
                  animate={{ y: [0, floatOffset, 0] }}
                  transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    maxWidth: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '24px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'linear-gradient(135deg, var(--card-bg) 0%, rgba(20,20,20,0.4) 100%)',
                    cursor: 'default',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-hover) 0%, rgba(20,20,20,0.6) 100%)';
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(196, 145, 58, 0.1)';
                    const icon = e.currentTarget.querySelector('.ind-icon') as HTMLElement;
                    if (icon) {
                      icon.style.color = 'var(--accent-primary)';
                      icon.style.transform = 'scale(1.2) translateY(-4px)';
                    }
                    const text = e.currentTarget.querySelector('.ind-text') as HTMLElement;
                    if (text) text.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--card-bg) 0%, rgba(20,20,20,0.4) 100%)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)';
                    const icon = e.currentTarget.querySelector('.ind-icon') as HTMLElement;
                    if (icon) {
                      icon.style.color = 'var(--text-secondary)';
                      icon.style.transform = 'scale(1) translateY(0)';
                    }
                    const text = e.currentTarget.querySelector('.ind-text') as HTMLElement;
                    if (text) text.style.color = 'var(--text-secondary)';
                  }}
                >
                  <div className="ind-icon" style={{ display: 'flex', transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)', color: 'var(--text-secondary)' }}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <div className="ind-text" style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em', 
                    transition: 'color 0.4s ease',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}>
                    {ind.label}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        .dh-industry-cluster {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .dh-industry-cluster {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .dh-industry-cluster {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px !important;
          }
          .dh-industry-bubble-wrapper > div {
            max-width: 150px !important;
            padding: 16px !important;
          }
          .ind-icon svg {
            width: 24px !important;
            height: 24px !important;
          }
          .ind-text {
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DummyIndustries;
