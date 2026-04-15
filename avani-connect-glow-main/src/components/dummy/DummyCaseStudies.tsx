import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const caseStudies = [
  {
    name: 'Indus Group of Institutions',
    slug: 'indus',
    image: '/indus1.png',
    logo: '/indus.jpeg',
    category: 'Education',
    description: 'Complete digital overhaul for one of the leading educational institutions — website, SEO, and enrollment funnel.',
    metrics: [
      { label: 'Organic Traffic', value: '+340%' },
      { label: 'Enrollment Rate', value: '+65%' },
      { label: 'Load Time', value: '0.8s' },
    ],
    color: '#3B82F6',
  },
  {
    name: 'Policicue',
    slug: 'policicue',
    image: '/policy1.png',
    logo: '/policucue.jpeg',
    category: 'InsurTech',
    description: 'Built a sophisticated policy management platform from scratch — handling complex workflows with an exceptional UI/UX.',
    metrics: [
      { label: 'User Signups', value: '+180%' },
      { label: 'Policy Processed', value: '5K+' },
      { label: 'App Rating', value: '4.8★' },
    ],
    color: '#8B5CF6',
  },
  {
    name: 'FRD Nutrition',
    slug: 'frd-nutrition',
    image: '/frd-nutrition-new.png',
    logo: '/frd-nutrition-new.png',
    category: 'E-Commerce',
    description: 'Full e-commerce build with product catalog, payment integration, and performance-optimized storefront.',
    metrics: [
      { label: 'Online Sales', value: '+250%' },
      { label: 'Conversion Rate', value: '4.2%' },
      { label: 'Avg. Order', value: '+35%' },
    ],
    color: '#F97316',
  },
];

const DummyCaseStudies = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Dot pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-cases-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>SUCCESS STORIES</span>
            </div>
            <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              REAL RESULTS<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>REAL GROWTH</span>
            </h2>
          </div>
          <Link to="/case-studies" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: "'Clash Display', sans-serif", fontSize: '12px', letterSpacing: '0.15em', fontWeight: 600,
            color: 'var(--accent-primary)', textDecoration: 'none', paddingBottom: '6px',
            borderBottom: '1px solid var(--border-light)', transition: 'all 0.3s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--accent-primary)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--border-light)'}>
            ALL CASE STUDIES <ArrowUpRight size={12} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="dummy-cases-grid">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link to={`/projects/${cs.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  borderRadius: '16px', overflow: 'hidden',
                  border: `1px solid ${hovered === i ? 'var(--border-light)' : 'var(--border-faint)'}`,
                  background: 'var(--card-bg)',
                  transition: 'all 0.4s',
                  transform: hovered === i ? 'translateY(-6px)' : 'none',
                  boxShadow: hovered === i ? '0 20px 48px rgba(0,0,0,0.5)' : 'none',
                }}>
                  {/* Image */}
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={cs.image} alt={cs.name}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.7s ease',
                        transform: hovered === i ? 'scale(1.08)' : 'scale(1)',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-secondary) 0%, var(--glass-bg) 50%, transparent 100%)' }} />

                    {/* Category badge */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', borderRadius: '100px', border: `1px solid ${cs.color}33` }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cs.color }} />
                      <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.18em', fontWeight: 600 }}>{cs.category.toUpperCase()}</span>
                    </div>

                    {/* Logo */}
                    <div style={{ position: 'absolute', bottom: '14px', left: '14px', width: '36px', height: '36px', borderRadius: '10px', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-light)', overflow: 'hidden', padding: '4px' }}>
                      <img src={cs.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontFamily: "'Clash Display', Impact, sans-serif",
                      fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)',
                      letterSpacing: '0.02em', marginBottom: '8px', lineHeight: 1.2,
                    }}>
                      {cs.name.toUpperCase()}
                    </h3>
                    <p style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: '13px', color: 'var(--text-secondary)',
                      lineHeight: 1.6, fontWeight: 400, marginBottom: '18px',
                    }}>
                      {cs.description}
                    </p>

                    {/* Metrics */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      {cs.metrics.map((m, mi) => (
                        <div key={mi} style={{
                          padding: '6px 12px', borderRadius: '8px',
                          background: 'var(--accent-hover)',
                          border: '1px solid var(--border-faint)',
                          display: 'flex', alignItems: 'center', gap: '5px',
                        }}>
                          <TrendingUp size={10} color="var(--accent-primary)" />
                          <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '12px', fontWeight: 700, color: 'var(--accent-primary)' }}>{m.value}</span>
                          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '10px', color: 'var(--text-tertiary)' }}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: "'Clash Display', sans-serif", fontSize: '11px', fontWeight: 600,
                      color: 'var(--accent-primary)', letterSpacing: '0.14em',
                      opacity: hovered === i ? 1 : 0.6,
                      transition: 'opacity 0.3s',
                    }}>
                      VIEW CASE STUDY <ArrowUpRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .dummy-cases-grid { grid-template-columns: 1fr !important; max-width: 500px; margin: 0 auto; } }
        @media (max-width: 768px) { .dummy-cases-container { padding: 0 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyCaseStudies;
