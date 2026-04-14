import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const DummyProjects = ({ clientLogos }: any) => {
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  // Double the projects for seamless infinite scroll
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section id="project-showcase" style={{ padding: '72px 0', background: '#0F0C09', position: 'relative', overflow: 'hidden' }}>
      {/* Dot pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `radial-gradient(circle, rgba(245,237,216,0.8) 1px, transparent 0)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: '#C4913A' }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', letterSpacing: '0.28em', color: '#C4913A' }}>FEATURED WORK</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#F5EDD8', lineHeight: 0.92, letterSpacing: '0.02em' }}>
              TRANSFORMING<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px #C4913A' }}>BUSINESSES</span>
            </h2>
          </div>
          <Link to="/case-studies" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '12px', letterSpacing: '0.18em',
            color: '#C4913A', textDecoration: 'none', paddingBottom: '6px',
            borderBottom: '1px solid rgba(196,145,58,0.35)', transition: 'all 0.3s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderBottomColor = '#C4913A'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(196,145,58,0.35)'}>
            VIEW ALL PROJECTS <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Scrolling project showcase — Row 1 (left to right) */}
      <div style={{ overflow: 'hidden', marginBottom: '14px', position: 'relative' }}>
        {/* Edge fade gradients */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #0F0C09, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #0F0C09, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '14px', width: 'max-content' }}
        >
          {doubled.map((c: any, i: number) => (
            <Link key={`row1-${i}`} to={c.link} style={{ textDecoration: 'none', flexShrink: 0 }}
              onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)}>
              <div style={{
                width: '380px', height: '240px', borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${hovIdx === i ? 'rgba(196,145,58,0.5)' : 'rgba(196,145,58,0.1)'}`,
                position: 'relative', transition: 'border-color 0.4s, transform 0.4s',
                transform: hovIdx === i ? 'translateY(-4px)' : 'none',
              }}>
                <img src={c.image} alt={c.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                  transform: hovIdx === i ? 'scale(1.06)' : 'scale(1)',
                }} />
                {/* Overlay gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,5,0.9) 0%, rgba(10,7,5,0.25) 50%, rgba(10,7,5,0.05) 100%)' }} />

                {/* Content overlay */}
                <div style={{ position: 'absolute', inset: 0, padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  {/* Logo */}
                  <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden', padding: '3px', marginBottom: '8px' }}>
                    <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '20px', color: '#F5EDD8', letterSpacing: '0.08em', marginBottom: '2px', lineHeight: 1.1 }}>
                    {c.name.toUpperCase()}
                  </h3>
                  <motion.div
                    animate={{ y: hovIdx === i ? 0 : 8, opacity: hovIdx === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#C4913A', fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', letterSpacing: '0.14em' }}>
                    VIEW PROJECT <ArrowUpRight size={10} />
                  </motion.div>
                </div>

                {/* Corner indicator on hover */}
                {hovIdx === i && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ position: 'absolute', top: '12px', right: '12px', width: '26px', height: '26px', borderRadius: '50%', background: '#C4913A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={12} color="#0A0705" />
                  </motion.div>
                )}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Scrolling project showcase — Row 2 (right to left, slower) */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #0F0C09, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #0F0C09, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 42, ease: 'linear', repeat: Infinity }}
          style={{ display: 'flex', gap: '14px', width: 'max-content' }}
        >
          {[...doubled].reverse().map((c: any, i: number) => (
            <Link key={`row2-${i}`} to={c.link} style={{ textDecoration: 'none', flexShrink: 0 }}
              onMouseEnter={() => setHovIdx(100 + i)} onMouseLeave={() => setHovIdx(null)}>
              <div style={{
                width: '340px', height: '200px', borderRadius: '12px', overflow: 'hidden',
                border: `1px solid ${hovIdx === 100 + i ? 'rgba(196,145,58,0.5)' : 'rgba(196,145,58,0.1)'}`,
                position: 'relative', transition: 'border-color 0.4s, transform 0.4s',
                transform: hovIdx === 100 + i ? 'translateY(-4px)' : 'none',
              }}>
                <img src={c.image} alt={c.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                  transform: hovIdx === 100 + i ? 'scale(1.06)' : 'scale(1)',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,5,0.9) 0%, rgba(10,7,5,0.25) 50%, rgba(10,7,5,0.05) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden', padding: '3px', marginBottom: '6px' }}>
                    <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '17px', color: '#F5EDD8', letterSpacing: '0.08em', marginBottom: '2px', lineHeight: 1.1 }}>
                    {c.name.toUpperCase()}
                  </h3>
                  <motion.div
                    animate={{ y: hovIdx === 100 + i ? 0 : 8, opacity: hovIdx === 100 + i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#C4913A', fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', letterSpacing: '0.14em' }}>
                    VIEW PROJECT <ArrowUpRight size={10} />
                  </motion.div>
                </div>
                {hovIdx === 100 + i && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderRadius: '50%', background: '#C4913A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowUpRight size={11} color="#0A0705" />
                  </motion.div>
                )}
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DummyProjects;