import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, ShoppingCart, Building2, Landmark, UtensilsCrossed, Cpu, Hotel, Scale } from 'lucide-react';

const industries = [
  { icon: GraduationCap, label: 'Education', desc: 'Schools, colleges & ed-tech platforms' },
  { icon: Heart, label: 'Healthcare', desc: 'Hospitals, clinics & wellness apps' },
  { icon: ShoppingCart, label: 'E-Commerce', desc: 'Online stores & marketplaces' },
  { icon: Building2, label: 'Real Estate', desc: 'Property portals & virtual tours' },
  { icon: Landmark, label: 'Finance', desc: 'InsurTech, banking & consulting' },
  { icon: UtensilsCrossed, label: 'Food & Nutrition', desc: 'Restaurants, delivery & D2C brands' },
  { icon: Cpu, label: 'Technology', desc: 'SaaS, AI tools & startups' },
  { icon: Hotel, label: 'Hospitality', desc: 'Hotels, resorts & travel platforms' },
  { icon: Scale, label: 'Legal', desc: 'Law firms & compliance platforms' },
];

const DummyIndustries = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '60%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-industries-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>VERTICALS</span>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            INDUSTRIES WE <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>SERVE</span>
          </h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '16px auto 0', fontWeight: 400, lineHeight: 1.6 }}>
            From education to fintech, we've built digital solutions across 9+ industries — each with domain-specific expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="dummy-industries-grid">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isHov = hovered === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '28px 24px',
                  borderRadius: '14px',
                  border: `1px solid ${isHov ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                  background: isHov ? 'var(--accent-hover)' : 'var(--card-bg)',
                  cursor: 'default',
                  transition: 'all 0.35s ease',
                  transform: isHov ? 'translateY(-4px)' : 'none',
                  boxShadow: isHov ? '0 12px 32px rgba(0,0,0,0.3)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hover glow */}
                {isHov && (
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                )}

                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: isHov ? 'var(--accent-primary)' : 'var(--accent-hover)',
                  border: `1px solid ${isHov ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px', transition: 'all 0.3s',
                }}>
                  <Icon size={20} color={isHov ? 'var(--bg-primary)' : 'var(--accent-primary)'} strokeWidth={1.5} />
                </div>
                <div style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '16px', fontWeight: 600, color: isHov ? 'var(--text-primary)' : 'var(--text-secondary)',
                  letterSpacing: '0.06em', marginBottom: '6px', transition: 'color 0.3s',
                  textTransform: 'uppercase',
                }}>
                  {ind.label}
                </div>
                <div style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '12px', color: 'var(--text-tertiary)',
                  lineHeight: 1.5, fontWeight: 400,
                }}>
                  {ind.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .dummy-industries-grid { grid-template-columns: repeat(2, 1fr) !important; } .dummy-industries-container { padding: 0 24px !important; } }
        @media (max-width: 480px) { .dummy-industries-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default DummyIndustries;
