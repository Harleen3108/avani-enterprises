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

        {/* Minimalist Pill Cloud */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 28px',
                  borderRadius: '100px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--card-bg)',
                  cursor: 'default',
                  transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'var(--accent-hover)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  (e.currentTarget.querySelector('.ind-icon') as HTMLElement).style.color = 'var(--accent-primary)';
                  (e.currentTarget.querySelector('.ind-icon') as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
                  (e.currentTarget.querySelector('.ind-text') as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.background = 'var(--card-bg)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  (e.currentTarget.querySelector('.ind-icon') as HTMLElement).style.color = 'var(--text-secondary)';
                  (e.currentTarget.querySelector('.ind-icon') as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                  (e.currentTarget.querySelector('.ind-text') as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                <div className="ind-icon" style={{ display: 'flex', transition: 'all 0.3s ease', color: 'var(--text-secondary)' }}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="ind-text" style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '18px', 
                  fontWeight: 600, 
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.04em', 
                  transition: 'color 0.3s ease',
                  textTransform: 'uppercase',
                }}>
                  {ind.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DummyIndustries;
