import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const DummyProjects = ({ clientLogos }: any) => {
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section id="project-showcase" style={{ padding: '72px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-projects-container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--accent-primary)', fontWeight: 600 }}>FEATURED WORK</span>
            </div>
            <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
              TRANSFORMING<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>BUSINESSES</span>
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
            VIEW ALL PROJECTS <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Row 1 */}
      <div style={{ overflow: 'hidden', marginBottom: '14px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, var(--bg-secondary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, var(--bg-secondary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 35, ease: 'linear', repeat: Infinity }} style={{ display: 'flex', gap: '14px', width: 'max-content' }}>
          {doubled.map((c: any, i: number) => (
            <Link key={`row1-${i}`} to={c.link} style={{ textDecoration: 'none', flexShrink: 0 }}
              onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}>
              <div style={{
                width: '380px', height: '240px', borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${hovIdx === i ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                position: 'relative', transition: 'border-color 0.4s, transform 0.4s',
                transform: hovIdx === i ? 'translateY(-4px)' : 'none',
              }}>
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovIdx === i ? 'scale(1.06)' : 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-secondary) 0%, var(--glass-bg) 50%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-light)', overflow: 'hidden', padding: '3px', marginBottom: '8px' }}>
                    <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '20px', color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: '2px', lineHeight: 1.1, fontWeight: 700 }}>
                    {c.name.toUpperCase()}
                  </h3>
                  <motion.div animate={{ y: hovIdx === i ? 0 : 8, opacity: hovIdx === i ? 1 : 0 }} transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-primary)', fontFamily: "'Clash Display', sans-serif", fontSize: '10px', letterSpacing: '0.14em', fontWeight: 600 }}>
                    VIEW PROJECT <ArrowUpRight size={10} />
                  </motion.div>
                </div>
                {hovIdx === i && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ position: 'absolute', top: '12px', right: '12px', width: '26px', height: '26px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={12} color="var(--bg-primary)" />
                  </motion.div>
                )}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Row 2 */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, var(--bg-secondary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, var(--bg-secondary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <motion.div animate={{ x: ['-50%', '0%'] }} transition={{ duration: 42, ease: 'linear', repeat: Infinity }} style={{ display: 'flex', gap: '14px', width: 'max-content' }}>
          {[...doubled].reverse().map((c: any, i: number) => (
            <Link key={`row2-${i}`} to={c.link} style={{ textDecoration: 'none', flexShrink: 0 }}
              onMouseEnter={() => setHovIdx(100 + i)} onMouseLeave={() => setHovIdx(null)}>
              <div style={{
                width: '340px', height: '200px', borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${hovIdx === 100 + i ? 'var(--accent-primary)' : 'var(--border-faint)'}`,
                position: 'relative', transition: 'border-color 0.4s, transform 0.4s',
                transform: hovIdx === 100 + i ? 'translateY(-4px)' : 'none',
              }}>
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovIdx === 100 + i ? 'scale(1.06)' : 'scale(1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-secondary) 0%, var(--glass-bg) 50%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-light)', overflow: 'hidden', padding: '3px', marginBottom: '6px' }}>
                    <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '17px', color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: '2px', lineHeight: 1.1, fontWeight: 700 }}>
                    {c.name.toUpperCase()}
                  </h3>
                  <motion.div animate={{ y: hovIdx === 100 + i ? 0 : 8, opacity: hovIdx === 100 + i ? 1 : 0 }} transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-primary)', fontFamily: "'Clash Display', sans-serif", fontSize: '10px', letterSpacing: '0.14em', fontWeight: 600 }}>
                    VIEW PROJECT <ArrowUpRight size={10} />
                  </motion.div>
                </div>
                {hovIdx === 100 + i && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={11} color="var(--bg-primary)" />
                  </motion.div>
                )}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) { .dummy-projects-container { padding: 0 24px !important; } }
      `}</style>
    </section>
  );
};

export default DummyProjects;