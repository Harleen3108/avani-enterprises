import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, ChevronRight, ChevronLeft, Globe2 } from 'lucide-react';

const offices = [
  {
    city: 'Rohtak', country: 'India', label: 'Headquarters', tagline: 'Where it all began',
    description: 'Our founding office and operational hub: 106, First Floor, Agro Mall, Rohtak.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', color: '#C4913A',
  },
  {
    city: 'Gurgaon', country: 'India', label: 'NCR Office', tagline: 'Corporate powerhouse',
    description: "Strategic presence in India's corporate capital serving enterprise clients.",
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop', color: '#f59e0b',
  },
  {
    city: 'Mumbai', country: 'India', label: 'West India Office', tagline: 'Financial nerve center',
    description: "Our western hub: Third Floor, Vasudev Chamber, Teli Galli Cross Rd, Andheri East, Mumbai.",
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop', color: '#fb923c',
  },
  {
    city: 'Australia', country: 'Australia', label: 'APAC Office', tagline: 'Crossing oceans',
    description: 'Serving clients across the Asia-Pacific region from Australia.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop', color: '#E8B96A',
  },
];

const GlobalPresenceComponent = () => {
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

  useEffect(() => { const t = setInterval(() => navigate(1), 6000); return () => clearInterval(t); }, [navigate]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') navigate(1); if (e.key === 'ArrowLeft') navigate(-1); };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => { const delta = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1); };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, rotateY: d > 0 ? 15 : -15, scale: 0.9 }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, rotateY: d > 0 ? -15 : 15, scale: 0.9 }),
  };

  return (
    <section className="theme-brown" style={{ padding: '100px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Themed abstract grid background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', top: '-20%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none', opacity: 0.5 }} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none', opacity: 0.5 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 5 }} className="dummy-global-container">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 24px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '100px', marginBottom: '24px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <Globe2 size={14} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', letterSpacing: '0.3em', color: 'var(--text-primary)', fontWeight: 600 }}>OUR GLOBAL FOOTPRINT</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Crossing Borders, <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-primary)', backgroundImage: `linear-gradient(90deg, var(--text-primary), var(--accent-primary))`, WebkitBackgroundClip: 'text' }}>Building Legacy.</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontWeight: 400, lineHeight: 1.6 }}>
            A worldwide network of excellence. Tap or swipe to explore our international hubs.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '48px', perspective: '1000px' }} className="dummy-global-main">
          {/* Enhanced Map */}
          <motion.div className="dummy-global-map" initial={{ opacity: 0, x: -40, rotateY: 10 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '2/1', minHeight: '280px', borderRadius: '24px', overflow: 'hidden', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(var(--text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--text-tertiary) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 20%, var(--bg-secondary) 100%)', pointerEvents: 'none', zIndex: 2 }} />
              
              <img src="/global2.png" alt="Global Network" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, mixBlendMode: 'screen', pointerEvents: 'none' }} />

              <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 15 }}
                style={{ position: 'absolute', left: activeIndex === 0 ? '66%' : activeIndex === 1 ? '68%' : activeIndex === 2 ? '64%' : '84%', top: activeIndex === 0 ? '42%' : activeIndex === 1 ? '45%' : activeIndex === 2 ? '52%' : '75%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                <motion.div animate={{ scale: [1, 3], opacity: [0.8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }} style={{ position: 'absolute', inset: '-15px', borderRadius: '50%', background: `radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)` }} />
                <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.7, ease: 'easeOut' }} style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: `1px solid var(--accent-primary)` }} />
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent-primary)', border: '3px solid var(--bg-primary)', boxShadow: `0 0 25px var(--accent-primary)` }} />
                
                {/* Floating tooltip on map */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -30 }} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', background: 'var(--text-primary)', padding: '6px 12px', borderRadius: '8px', border: `1px solid var(--accent-primary)`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'var(--bg-primary)', fontWeight: 600, letterSpacing: '0.1em' }}>{activeOffice.city.toUpperCase()}</span>
                </motion.div>
              </motion.div>

              {offices.map((o, i) => i !== activeIndex && (
                <div key={i} style={{ position: 'absolute', left: i === 0 ? '66%' : i === 1 ? '68%' : i === 2 ? '64%' : '84%', top: i === 0 ? '42%' : i === 1 ? '45%' : i === 2 ? '52%' : '75%', transform: 'translate(-50%,-50%)', zIndex: 5, opacity: 0.5, transition: 'all 0.3s' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Placard */}
          <motion.div initial={{ opacity: 0, x: 40, rotateY: -10 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} style={{ transformStyle: 'preserve-3d' }}>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', minHeight: '380px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={activeIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 5 }} src={activeOffice.image} alt={activeOffice.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--card-bg) 0%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${activeOffice.color}20 0%, transparent 100%)` }} />
                    
                    <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-bg)', backdropFilter: 'blur(12px)', padding: '6px 16px', borderRadius: '100px', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: `0 0 10px var(--accent-primary)` }} />
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'var(--text-primary)', letterSpacing: '0.2em', fontWeight: 600 }}>{activeOffice.tagline.toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                      <span style={{ fontFamily: "'Clash Display', 'Bebas Neue', 'Outfit', sans-serif", fontSize: '24px', color: 'var(--text-primary)', letterSpacing: '0.05em', fontWeight: 600, textShadow: '0 2px 10px var(--card-bg)' }}>
                        {String(activeIndex + 1).padStart(2, '0')}<span style={{ color: 'var(--text-tertiary)', fontSize: '16px' }}>/{String(offices.length).padStart(2, '0')}</span>
                      </span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '20px', left: '24px' }}>
                      <motion.h3 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontFamily: "'Outfit', sans-serif", fontSize: '32px', color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '4px', fontWeight: 800 }}>{activeOffice.city}</motion.h3>
                      <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--accent-primary)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>{activeOffice.country}</motion.span>
                    </div>
                  </div>

                  <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `var(--accent-hover)`, border: `1px solid var(--border-light)` }}>
                          <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
                        </div>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.2em', fontWeight: 600 }}>{activeOffice.label.toUpperCase()}</span>
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', fontWeight: 400 }}>{activeOffice.description}</p>
                    </div>
                    
                    <div style={{ height: '3px', borderRadius: '2px', background: 'var(--border-light)', overflow: 'hidden', marginTop: '24px' }}>
                      <motion.div key={activeIndex} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 6, ease: 'linear' }} style={{ height: '100%', borderRadius: '2px', background: 'var(--accent-primary)' }} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', padding: '0 10px' }}>
              <button onClick={() => navigate(-1)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', color: 'var(--accent-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--card-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'; }}>
                <ChevronLeft size={20} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {offices.map((o, i) => (
                  <button key={i} onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                    style={{ height: '4px', width: i === activeIndex ? '32px' : '12px', background: i === activeIndex ? 'var(--accent-primary)' : 'var(--border-light)', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: 0 }} />
                ))}
              </div>

              <button onClick={() => navigate(1)} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border-light)', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s', color: 'var(--accent-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--card-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'; }}>
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Location Cards (Glassmorphism) */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }} className="dummy-global-cards">
          {offices.map((office, i) => {
            const isActive = i === activeIndex;
            return (
              <button key={office.city} onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                style={{ textAlign: 'left', padding: '20px', borderRadius: '16px', cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', background: isActive ? 'var(--card-bg)' : 'var(--bg-secondary)', border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-faint)'}`, transform: isActive ? 'translateY(-8px)' : 'none', boxShadow: isActive ? `0 15px 30px rgba(0,0,0,0.1)` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <motion.div animate={isActive ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}} transition={{ duration: 2, repeat: Infinity }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: isActive ? `0 0 12px var(--accent-primary)` : 'none', transition: 'all 0.3s' }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: isActive ? 'var(--text-secondary)' : 'var(--text-tertiary)', letterSpacing: '0.2em', fontWeight: 600 }}>{office.label.toUpperCase()}</span>
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '0.04em', transition: 'color 0.3s', fontWeight: 700 }}>{office.city.toUpperCase()}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)', marginTop: '4px', fontWeight: 500, transition: 'color 0.3s' }}>{office.tagline}</div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: 'var(--accent-primary)', width: isActive ? '100%' : '0%', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </button>
            );
          })}
        </motion.div>

        {/* Sleek Stats Footer */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', padding: '24px 32px', background: 'var(--card-bg)', border: '1px solid var(--border-light)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            {[{ value: '04', label: 'Global Hubs' }, { value: '02', label: 'Continents' }, { value: '24/7', label: 'Operations' }].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Clash Display', 'Bebas Neue', 'Outfit', sans-serif", fontSize: '28px', color: 'var(--text-primary)', lineHeight: 1, fontWeight: 600, letterSpacing: '0.05em' }}>{s.value}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'var(--accent-primary)', letterSpacing: '0.2em', marginTop: '6px', fontWeight: 600 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <Link to="/global-presence" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 28px',
            background: 'var(--card-bg)', color: 'var(--text-primary)', border: `1px solid var(--border-light)`,
            borderRadius: '100px', textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
            fontSize: '12px', letterSpacing: '0.15em', fontWeight: 600, transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
            onMouseEnter={e => { 
              (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)'; 
              (e.currentTarget as HTMLElement).style.color = '#fff'; 
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={e => { 
              (e.currentTarget as HTMLElement).style.background = 'var(--card-bg)'; 
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)';
            }}>
            EXPLORE NETWORK <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { 
          .dummy-global-main { grid-template-columns: 1fr !important; } 
          .dummy-global-cards { grid-template-columns: repeat(2, 1fr) !important; } 
        }
        @media (max-width: 768px) { 
          .dummy-global-container { padding: 0 24px !important; } 
          .dummy-global-map { display: none !important; }
        }
        @media (max-width: 560px) { 
          .dummy-global-cards { grid-template-columns: 1fr !important; } 
        }
      `}</style>
    </section>
  );
};

export default GlobalPresenceComponent;