import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

const offices = [
  {
    city: 'Rohtak', country: 'India', label: 'Headquarters', tagline: 'Where it all began',
    description: 'Our founding office and operational hub: 106, First Floor, Agro Mall, Rohtak.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', color: '#f59e0b',
  },
  {
    city: 'Gurgaon', country: 'India', label: 'NCR Office', tagline: 'Corporate powerhouse',
    description: "Strategic presence in India's corporate capital serving enterprise clients.",
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', color: '#fb923c',
  },
  {
    city: 'Mumbai', country: 'India', label: 'West India Office', tagline: 'Financial nerve center',
    description: "Our western hub: Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Andheri East, Mumbai, 400069.",
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop', color: '#C4913A',
  },
  {
    city: 'Australia', country: 'Australia', label: 'APAC Office', tagline: 'Crossing oceans',
    description: 'Serving clients across the Asia-Pacific region from Australia.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop', color: '#E8B96A',
  },
];

const DummyGlobalPresence = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const activeOffice = offices[activeIndex];

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return offices.length - 1;
      if (next >= offices.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => { const t = setInterval(() => navigate(1), 5000); return () => clearInterval(t); }, [navigate]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') navigate(1); if (e.key === 'ArrowLeft') navigate(-1); };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => { const delta = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1); };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 240 : -240, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -240 : 240, opacity: 0, scale: 0.96 }),
  };

  return (
    <section style={{ padding: '72px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(var(--accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-global-container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 18px', background: 'var(--accent-hover)', border: '1px solid var(--border-light)', borderRadius: '100px', marginBottom: '20px' }}>
            <div style={{ width: '7px', height: '7px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-primary)', animation: 'dummy-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--accent-primary)', fontWeight: 600 }}>OUR GLOBAL FOOTPRINT</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '10px' }}>
            FROM ROOTS <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)' }}>TO REACH</span>
          </h2>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', fontWeight: 400, lineHeight: 1.6 }}>
            Explore our journey across continents — tap or swipe to discover each location
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '28px', alignItems: 'center', marginBottom: '32px' }} className="dummy-global-main">
          {/* Map */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '2/1', minHeight: '280px', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%)', border: '1px solid var(--border-faint)', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '35px 35px' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 65% 50%, var(--accent-hover) 0%, transparent 70%)' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
              <img src="/global2.png" alt="Global Network" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'screen', pointerEvents: 'none' }} />

              <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                style={{ position: 'absolute', left: activeIndex === 0 ? '64%' : activeIndex === 1 ? '67%' : activeIndex === 2 ? '63%' : '82%', top: activeIndex === 0 ? '40%' : activeIndex === 1 ? '44%' : activeIndex === 2 ? '50%' : '72%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                <motion.div animate={{ scale: [1, 2.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: `2px solid ${activeOffice.color}` }} />
                <motion.div animate={{ scale: [1, 1.8], opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} style={{ position: 'absolute', inset: '-5px', borderRadius: '50%', border: `1px solid ${activeOffice.color}` }} />
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: activeOffice.color, border: '2px solid var(--text-primary)', boxShadow: `0 0 20px ${activeOffice.color}` }} />
              </motion.div>

              {offices.map((o, i) => i !== activeIndex && (
                <div key={i} style={{ position: 'absolute', left: i === 0 ? '64%' : i === 1 ? '67%' : i === 2 ? '63%' : '82%', top: i === 0 ? '40%' : i === 1 ? '44%' : i === 2 ? '50%' : '72%', transform: 'translate(-50%,-50%)', zIndex: 5 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-hover)', border: '1px solid var(--border-light)' }} />
                </div>
              ))}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(to top, var(--bg-secondary), transparent)', pointerEvents: 'none', zIndex: 20 }} />
            </div>
          </motion.div>

          {/* Placard */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', minHeight: '340px' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={activeIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img src={activeOffice.image} alt={activeOffice.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, var(--glass-bg) 50%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', top: '14px', left: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '5px 12px', borderRadius: '100px', border: '1px solid var(--border-light)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeOffice.color, boxShadow: `0 0 8px ${activeOffice.color}` }} />
                        <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.2em', fontWeight: 600 }}>{activeOffice.tagline.toUpperCase()}</span>
                      </div>
                    </div>
                    <div style={{ position: 'absolute', top: '14px', right: '16px' }}>
                      <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.1em', fontWeight: 600 }}>
                        {String(activeIndex + 1).padStart(2, '0')}/{String(offices.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '14px', left: '16px' }}>
                      <h3 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '32px', color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '2px', fontWeight: 700 }}>{activeOffice.city}</h3>
                      <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>{activeOffice.country}</span>
                    </div>
                  </div>
                  <div style={{ padding: '20px', background: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${activeOffice.color}15` }}>
                        <MapPin size={14} style={{ color: activeOffice.color }} />
                      </div>
                      <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.2em', fontWeight: 600 }}>{activeOffice.label.toUpperCase()}</span>
                    </div>
                    <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', lineHeight: 1.65, color: 'var(--text-tertiary)', fontWeight: 400, marginBottom: '16px' }}>{activeOffice.description}</p>
                    <div style={{ height: '3px', borderRadius: '2px', background: 'var(--border-light)', overflow: 'hidden' }}>
                      <motion.div key={activeIndex} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 4.5, ease: 'linear' }} style={{ height: '100%', borderRadius: '2px', background: activeOffice.color }} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
              <button onClick={() => navigate(-1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', color: 'var(--accent-primary)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}>
                <ChevronLeft size={16} color="var(--accent-primary)" />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {offices.map((o, i) => (
                  <button key={i} onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                    style={{ height: '3px', width: i === activeIndex ? '24px' : '10px', background: i === activeIndex ? o.color : 'var(--border-light)', border: 'none', borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
                ))}
              </div>
              <button onClick={() => navigate(1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}>
                <ChevronRight size={16} color="var(--accent-primary)" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Location Cards */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '28px' }} className="dummy-global-cards">
          {offices.map((office, i) => {
            const isActive = i === activeIndex;
            return (
              <button key={office.city} onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                style={{ textAlign: 'left', padding: '16px', borderRadius: '12px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.3s', background: isActive ? 'var(--accent-hover)' : 'var(--card-bg)', border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-faint)'}`, transform: isActive ? 'translateY(-2px)' : 'none', boxShadow: isActive ? '0 8px 24px rgba(0,0,0,0.3)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: office.color, boxShadow: isActive ? `0 0 10px ${office.color}` : 'none', transition: 'all 0.3s' }} />
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '9px', color: isActive ? 'var(--text-secondary)' : 'var(--text-tertiary)', letterSpacing: '0.2em', fontWeight: 600 }}>{office.label.toUpperCase()}</span>
                </div>
                <div style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '18px', color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)', letterSpacing: '0.04em', transition: 'color 0.3s', fontWeight: 700 }}>{office.city.toUpperCase()}</div>
                <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '10px', color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)', marginTop: '2px', fontWeight: 500, transition: 'color 0.3s' }}>{office.tagline}</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: office.color, width: isActive ? '100%' : '0%', transition: 'width 0.5s ease' }} />
              </button>
            );
          })}
        </motion.div>

        {/* Stats + CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', padding: '20px 28px', background: 'var(--card-bg)', border: '1px solid var(--border-faint)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[{ value: '04', label: 'Hubs' }, { value: '02', label: 'Continents' }, { value: '∞', label: 'Reach' }].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: '26px', color: 'var(--text-primary)', lineHeight: 1, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '9px', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginTop: '2px', fontWeight: 600 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <Link to="/global-presence" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px',
            background: 'var(--accent-primary)', color: 'var(--bg-primary)',
            borderRadius: '100px', textDecoration: 'none', fontFamily: "'Clash Display', sans-serif",
            fontSize: '11px', letterSpacing: '0.12em', fontWeight: 600, boxShadow: '0 4px 16px var(--accent-hover)', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px var(--accent-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px var(--accent-hover)'; }}>
            EXPLORE NETWORK <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @keyframes dummy-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 1024px) { .dummy-global-main { grid-template-columns: 1fr !important; } .dummy-global-cards { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .dummy-global-container { padding: 0 24px !important; } }
        @media (max-width: 560px) { .dummy-global-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default DummyGlobalPresence;