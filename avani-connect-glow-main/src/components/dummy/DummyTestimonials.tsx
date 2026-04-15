import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const DummyTestimonials = ({ testimonials }: any) => {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  const t = testimonials[cur];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '480px', display: 'flex', alignItems: 'center' }}>
      {/* BG Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', opacity: 0.88 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.04 }} />
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 30%, var(--accent-primary) 70%, transparent)', zIndex: 10 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 48px', width: '100%', position: 'relative', zIndex: 5 }} className="dummy-testi-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>CLIENT STORIES</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            WHAT OUR<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>CLIENTS SAY</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }} className="dummy-testi-grid">
          {/* Left: Quote */}
          <AnimatePresence mode="wait">
            <motion.div key={cur} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
                {[...Array(t.rating)].map((_: any, i: number) => <Star key={i} size={14} fill="var(--accent-primary)" color="var(--accent-primary)" />)}
              </div>
              <div style={{ fontFamily: "'Clash Display', serif", fontSize: '72px', lineHeight: 0.7, color: 'var(--accent-hover)', marginBottom: '4px', userSelect: 'none', fontWeight: 300 }}>"</div>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 'clamp(14px, 1.6vw, 18px)', lineHeight: 1.65, color: 'var(--text-secondary)', fontWeight: 400, fontStyle: 'italic', marginBottom: '28px' }}>
                {t.content}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-light)', flexShrink: 0, background: 'var(--bg-tertiary)' }}>
                  <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px' }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '0.06em', fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: 'var(--accent-primary)', marginTop: '1px', fontWeight: 500 }}>{t.position}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className="dummy-testi-cards">
            {testimonials.map((item: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03, duration: 0.4 }}
                onClick={() => setCur(i)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${cur === i ? 'var(--accent-primary)' : 'var(--border-faint)'}`, background: cur === i ? 'var(--accent-hover)' : 'var(--card-bg)', cursor: 'pointer', transition: 'all 0.3s' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-light)', background: 'var(--bg-tertiary)', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '12px', color: cur === i ? 'var(--text-primary)' : 'var(--text-tertiary)', letterSpacing: '0.06em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '10px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.position}</div>
                </div>
                {cur === i && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0 }} />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '32px' }}>
          <button onClick={() => setCur(p => (p - 1 + testimonials.length) % testimonials.length)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', color: 'var(--accent-primary)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            <ChevronLeft size={16} color="var(--accent-primary)" />
          </button>
          <div style={{ display: 'flex', gap: '6px' }}>
            {testimonials.map((_: any, i: number) => (
              <button key={i} onClick={() => setCur(i)}
                style={{ height: '2px', width: i === cur ? '24px' : '12px', background: i === cur ? 'var(--accent-primary)' : 'var(--border-light)', border: 'none', borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setCur(p => (p + 1) % testimonials.length)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            <ChevronRight size={16} color="var(--accent-primary)" />
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .dummy-testi-cards { display: none !important; } .dummy-testi-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .dummy-testi-container { padding: 48px 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyTestimonials;