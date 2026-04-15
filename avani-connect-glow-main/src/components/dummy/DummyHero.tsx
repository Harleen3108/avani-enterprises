import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, Play, MapPin, Star, X } from 'lucide-react';
import DummyAnimatedCounter from './DummyAnimatedCounter';
import { API_BASE_URL } from '../../utils/api';

const words = ['Websites', 'Products', 'Solutions', 'Experiences'];

// Ambient particles component
const AmbientParticles = () => {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -120, -240],
            x: [0, Math.random() * 40 - 20, Math.random() * 30 - 15],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            boxShadow: `0 0 ${p.size * 3}px var(--accent-hover)`,
          }}
        />
      ))}
    </div>
  );
};

const DummyHero = ({ newsletters, loadingNewsletters, clientLogos }: any) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [showReel, setShowReel] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -60]);
  const heroBgScale = useTransform(scrollY, [0, 600], [1, 1.06]);

  useEffect(() => {
    const t = setInterval(() => setWordIndex(p => (p + 1) % words.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Cursor glow effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (glowRef.current && heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
      glowRef.current.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', background: 'var(--bg-primary)' }}
      >
        {/* Cursor glow */}
        <div
          ref={glowRef}
          className="dummy-cursor-glow"
          style={{
            position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-hover) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 4, opacity: 0, transition: 'opacity 0.3s ease',
          }}
        />

        {/* Particles */}
        <AmbientParticles />

        {/* Parallax BG */}
        <motion.div style={{ scale: heroBgScale, position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--glass-bg) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, var(--border-light) 0%, transparent 55%)' }} />
        </motion.div>

        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.055, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

        {/* Gold top line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, var(--accent-primary) 25%, var(--accent-light) 50%, var(--accent-primary) 75%, transparent)', zIndex: 10 }} />

        {/* Rotating rings */}
        <div className="dummy-hero-rings">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '12%', right: '6%', width: '220px', height: '220px', border: '1px solid var(--border-faint)', borderRadius: '50%', zIndex: 2, pointerEvents: 'none' }} />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '16%', right: '8%', width: '160px', height: '160px', border: '1px solid var(--border-light)', borderRadius: '50%', zIndex: 2, pointerEvents: 'none' }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '20%', right: '10%', width: '100px', height: '100px', border: '1px solid var(--border-light)', borderRadius: '50%', zIndex: 2, pointerEvents: 'none' }} />
        </div>

        {/* Content */}
        <motion.div style={{ y: heroY, width: '100%', position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 48px 48px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }} className="dummy-hero-grid">

            {/* LEFT */}
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', border: '1px solid var(--border-light)', borderRadius: '100px', background: 'var(--accent-hover)', backdropFilter: 'blur(10px)', marginBottom: '24px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary), 0 0 16px var(--border-light)' }} />
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--accent-light)', fontWeight: 600 }}>ONE STOP SOLUTION FOR BUSINESS · EST. 2016</span>
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                <h1 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 10vw, 88px)', fontWeight: 700, lineHeight: 0.92, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                  BUILD<br />
                  <span style={{ color: 'var(--accent-primary)' }}>HIGH‑</span>PERFORMING
                </h1>

                {/* Animated outline word */}
                <div style={{ overflow: 'hidden', height: 'clamp(36px, 10vw, 82px)', margin: '2px 0' }}>
                  <motion.div key={wordIndex} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 10vw, 88px)', fontWeight: 700, lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '2px var(--accent-primary)', letterSpacing: '-0.01em', display: 'block' }}>
                    {words[wordIndex]}
                  </motion.div>
                </div>

                <h1 style={{ fontFamily: "'Clash Display', Impact, sans-serif", fontSize: 'clamp(36px, 10vw, 88px)', fontWeight: 700, lineHeight: 0.92, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: '24px' }}>
                  & ACCELERATE <span style={{ color: 'var(--accent-primary)' }}>GROWTH</span>
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
                style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '440px', marginBottom: '16px', fontWeight: 400 }}>
                We're more than just a digital agency. We build stories, share passions, and deliver results that leave competitors far behind.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
                <MapPin size={11} color="var(--accent-primary)" />
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '0.04em', fontWeight: 500 }}>
                  Expanding Globally · Gurgaon · Mumbai · Rohtak · Australia
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.8 }}
                style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }} className="dummy-hero-buttons">
                <Link to="/get-consultation" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))', color: 'var(--bg-primary)', borderRadius: '5px',
                  textDecoration: 'none', fontFamily: "'Clash Display', sans-serif", fontSize: '14px', letterSpacing: '0.12em', fontWeight: 600,
                  boxShadow: '0 6px 24px var(--border-light)', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px var(--border-light)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px var(--border-light)'; }}
                >
                  GET CONSULTATION <ArrowRight size={13} />
                </Link>

                {/* Watch Reel button */}
                <button onClick={() => setShowReel(true)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px',
                  background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-faint)',
                  borderRadius: '5px', cursor: 'pointer', fontFamily: "'Clash Display', sans-serif", fontSize: '14px',
                  letterSpacing: '0.12em', backdropFilter: 'blur(10px)', transition: 'all 0.3s', fontWeight: 600,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-faint)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--accent-hover)', border: '1px solid var(--border-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Play size={11} fill="var(--accent-primary)" color="var(--accent-primary)" />
                  </div>
                  WATCH REEL
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="dummy-hero-stats"
                style={{ display: 'flex', borderTop: '1px solid var(--border-faint)', paddingTop: '24px', gap: '0' }}>
                {[{ target: 150, suffix: '+', label: 'Happy Clients' }, { target: 300, suffix: '+', label: 'Projects Done' }, { target: 85, suffix: '%', label: 'Growth Rate' }, { target: 8, suffix: '+', label: 'Years Active' }].map((s, i) => (
                  <div key={i} className={`dummy-hero-stat-item dummy-hero-stat-${i}`} style={{ flex: 1, paddingLeft: i > 0 ? '16px' : 0, paddingRight: i < 3 ? '16px' : 0, borderRight: i < 3 ? '1px solid var(--border-faint)' : 'none' }}>
                    <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '32px', color: 'var(--accent-primary)', lineHeight: 1, fontWeight: 700 }}>
                      <DummyAnimatedCounter target={s.target} suffix={s.suffix} />
                    </div>
                    <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: newsletter */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }} className="dummy-right-col">
              {/* Trusted pill */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.6 }}
                style={{ position: 'absolute', top: '-28px', left: '-14px', padding: '8px 14px', background: 'var(--accent-hover)', backdropFilter: 'blur(16px)', border: '1px solid var(--border-light)', borderRadius: '10px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex' }}>
                  {[0, 1, 5, 3].map((idx, i) => (
                    <div key={i} style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid var(--glass-bg)', background: '#fff', overflow: 'hidden', marginLeft: i > 0 ? '-6px' : 0 }}>
                      <img src={clientLogos[idx]?.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '11px', color: 'var(--accent-light)', letterSpacing: '0.1em', fontWeight: 600 }}>150+ TRUSTED</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '8px', color: 'var(--text-tertiary)', letterSpacing: '0.08em', fontWeight: 500 }}>Companies Worldwide</div>
                </div>
              </motion.div>

              {/* Rating pill bottom-left */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                style={{ position: 'absolute', bottom: '-12px', left: '-12px', padding: '8px 14px', background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-light)', borderRadius: '10px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={9} fill="var(--accent-primary)" color="var(--accent-primary)" />)}</div>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>5.0 · 300+ Projects</span>
              </motion.div>

              {/* Avatar */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '-10px', right: '-8px', width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--glass-bg)', boxShadow: '0 16px 40px rgba(0,0,0,0.6)', zIndex: 20 }}>
                <img src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=400" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>

              {/* Newsletter Card */}
              <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(28px)', border: '1px solid var(--border-light)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '16px', letterSpacing: '0.12em', color: 'var(--text-primary)', fontWeight: 600 }}>NEWS & UPDATES</div>
                    <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '9px', color: 'var(--accent-primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px', fontWeight: 500 }}>Latest from Avani</div>
                  </div>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--accent-hover)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={13} color="var(--accent-primary)" />
                  </div>
                </div>
                <div>
                  {loadingNewsletters ? (
                    <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '22px', height: '22px', border: '2px solid var(--border-light)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'dummy-spin 0.8s linear infinite' }} />
                    </div>
                  ) : newsletters.length === 0 ? (
                    <p style={{ padding: '18px 20px', fontFamily: "'Satoshi', sans-serif", color: 'var(--text-tertiary)', fontSize: '12px' }}>Updates coming soon…</p>
                  ) : newsletters.slice(0, 3).map((n: any) => {
                    const date = new Date(n.publishedAt || n.createdAt);
                    const isRecent = (Date.now() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
                    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                    const day = date.getDate().toString().padStart(2, '0');
                    return (
                      <Link key={n._id} to={`/newsletters/${n.slug}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderBottom: '1px solid var(--border-faint)', textDecoration: 'none', transition: 'background 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        <div style={{ flexShrink: 0 }}>
                          {n.imageUrl ? (
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                              <img src={n.imageUrl.startsWith('http') ? n.imageUrl : `${API_BASE_URL}${n.imageUrl.startsWith('/') ? '' : '/'}${n.imageUrl}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => e.target.src = 'https://placehold.co/36x36?text=N'} />
                            </div>
                          ) : (
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-hover)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '7px', color: 'var(--accent-primary)', letterSpacing: '0.1em', fontWeight: 600 }}>{month}</span>
                              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1, fontWeight: 700 }}>{day}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>{n.title}</div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '10px', color: 'var(--text-tertiary)' }}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            {isRecent && <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '8px', color: 'var(--accent-primary)', background: 'var(--accent-hover)', padding: '1px 6px', borderRadius: '100px', border: '1px solid var(--border-light)', letterSpacing: '0.08em', fontWeight: 600 }}>NEW</span>}
                          </div>
                        </div>
                        <ChevronRight size={11} color="var(--accent-primary)" />
                      </Link>
                    );
                  })}
                </div>
                {!loadingNewsletters && newsletters.length > 0 && (
                  <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border-light)' }}>
                    <Link to="/newsletters" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--accent-light)', textDecoration: 'none', fontFamily: "'Clash Display', sans-serif", fontSize: '10px', letterSpacing: '0.2em', transition: 'all 0.25s', fontWeight: 600 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-primary)'; (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-light)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      VIEW ALL UPDATES <ArrowRight size={10} />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 10 }}>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: 'var(--text-tertiary)', fontWeight: 600 }}>SCROLL</span>
          <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, var(--accent-light), transparent)' }} />
        </motion.div>

        <style>{`
          @keyframes dummy-spin { to { transform: rotate(360deg); } }
          @media (max-width: 1024px) { .dummy-right-col { display: none !important; } .dummy-cursor-glow { display: none !important; } }
          @media (max-width: 768px) { 
            .dummy-hero-grid { grid-template-columns: 1fr !important; padding: 100px 24px 40px !important; } 
            .dummy-hero-buttons { flex-direction: column; width: 100%; align-items: stretch; }
            .dummy-hero-buttons > * { width: 100%; justify-content: center; }
            .dummy-hero-stats { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 24px 0 !important; }
            .dummy-hero-stat-item { padding: 0 !important; border-right: none !important; }
            .dummy-hero-rings { display: none !important; }
          }
        `}</style>
      </section>

      {/* Video Reel Modal */}
      <AnimatePresence>
        {showReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowReel(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ width: '90%', maxWidth: '900px', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)', position: 'relative', background: 'var(--bg-primary)' }}
            >
              {/* Close button */}
              <button onClick={() => setShowReel(false)} style={{
                position: 'absolute', top: '24px', right: '24px', width: '48px', height: '48px', borderRadius: '50%',
                background: 'var(--glass-bg)', border: '1px solid var(--border-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-primary)', backdropFilter: 'blur(10px)', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}
              >
                <X size={16} />
              </button>

              {/* Placeholder video content */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--card-bg) 100%)' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'var(--accent-hover)', border: '2px solid var(--border-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px', backdropFilter: 'blur(10px)',
                  }}
                >
                  <Play size={28} fill="var(--accent-primary)" color="var(--accent-primary)" />
                </motion.div>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '0.04em', fontWeight: 600 }}>Avani Showreel</div>
                <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '13px', color: 'var(--text-tertiary)' }}>Coming soon — our best work, one reel.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DummyHero;