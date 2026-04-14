import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Mail, Play, MapPin, Star } from 'lucide-react';
import DummyAnimatedCounter from './DummyAnimatedCounter';
import { API_BASE_URL } from '../../utils/api';

const words = ['Websites', 'Products', 'Solutions', 'Experiences'];

const DummyHero = ({ newsletters, loadingNewsletters, clientLogos }: any) => {
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -60]);
  const heroBgScale = useTransform(scrollY, [0, 600], [1, 1.06]);

  useEffect(() => {
    const t = setInterval(() => setWordIndex(p => (p + 1) % words.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', background: '#0A0705' }}>
      {/* Parallax BG */}
      <motion.div style={{ scale: heroBgScale, position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,7,5,0.93) 0%, rgba(10,7,5,0.78) 50%, rgba(10,7,5,0.60) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,5,1) 0%, transparent 45%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 38%, rgba(196,145,58,0.13) 0%, transparent 55%)' }} />
      </motion.div>

      {/* Grain */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.055, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

      {/* Gold top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, #C4913A 25%, #F0C97A 50%, #C4913A 75%, transparent)', zIndex: 10 }} />

      {/* Rotating rings */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '12%', right: '6%', width: '220px', height: '220px', border: '1px solid rgba(196,145,58,0.07)', borderRadius: '50%', zIndex: 2, pointerEvents: 'none' }} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '16%', right: '8%', width: '160px', height: '160px', border: '1px solid rgba(196,145,58,0.11)', borderRadius: '50%', zIndex: 2, pointerEvents: 'none' }} />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '20%', right: '10%', width: '100px', height: '100px', border: '1px solid rgba(196,145,58,0.18)', borderRadius: '50%', zIndex: 2, pointerEvents: 'none' }} />

      {/* Content */}
      <motion.div style={{ y: heroY, width: '100%', position: 'relative', zIndex: 5 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 48px 48px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center' }} className="dummy-hero-grid">

          {/* LEFT */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', border: '1px solid rgba(196,145,58,0.3)', borderRadius: '100px', background: 'rgba(196,145,58,0.07)', backdropFilter: 'blur(10px)', marginBottom: '24px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C4913A', boxShadow: '0 0 8px #C4913A, 0 0 16px rgba(196,145,58,0.5)' }} />
              <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: '#E8B96A' }}>ONE STOP SOLUTION FOR BUSINESS · EST. 2016</span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <h1 style={{ fontFamily: "'Bebas Neue', Impact, 'Arial Black', sans-serif", fontSize: 'clamp(48px, 6.5vw, 88px)', fontWeight: 400, lineHeight: 0.92, color: '#F5EDD8', letterSpacing: '0.01em', margin: 0 }}>
                BUILD<br />
                <span style={{ color: '#C4913A' }}>HIGH‑</span>PERFORMING
              </h1>

              {/* Animated outline word */}
              <div style={{ overflow: 'hidden', height: 'clamp(44px, 6vw, 82px)', margin: '2px 0' }}>
                <motion.div key={wordIndex} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: "'Bebas Neue', Impact, 'Arial Black', sans-serif", fontSize: 'clamp(48px, 6.5vw, 88px)', fontWeight: 400, lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '2px #C4913A', letterSpacing: '0.01em', display: 'block' }}>
                  {words[wordIndex]}
                </motion.div>
              </div>

              <h1 style={{ fontFamily: "'Bebas Neue', Impact, 'Arial Black', sans-serif", fontSize: 'clamp(48px, 6.5vw, 88px)', fontWeight: 400, lineHeight: 0.92, color: '#F5EDD8', letterSpacing: '0.01em', marginBottom: '24px' }}>
                & ACCELERATE <span style={{ color: '#C4913A' }}>GROWTH</span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
              style={{ fontFamily: "'Outfit', Poppins, sans-serif", fontSize: '14px', lineHeight: 1.7, color: 'rgba(245,237,216,0.6)', maxWidth: '440px', marginBottom: '16px', fontWeight: 300 }}>
              We're more than just a digital agency. We build stories, share passions, and deliver results that leave competitors far behind.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
              <MapPin size={11} color="#C4913A" />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(196,145,58,0.75)', letterSpacing: '0.04em' }}>
                Expanding Globally · Gurgaon · Mumbai · Rohtak · Australia
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.8 }}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <Link to="/get-consultation" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                background: 'linear-gradient(135deg, #C4913A, #E8B96A)', color: '#0A0705', borderRadius: '5px',
                textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.16em',
                boxShadow: '0 6px 24px rgba(196,145,58,0.35)', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(196,145,58,0.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(196,145,58,0.35)'; }}
              >
                GET CONSULTATION <ArrowRight size={13} />
              </Link>
              <a href="#project-showcase" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px',
                background: 'rgba(245,237,216,0.05)', color: '#F5EDD8', border: '1px solid rgba(245,237,216,0.18)',
                borderRadius: '5px', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px',
                letterSpacing: '0.16em', backdropFilter: 'blur(10px)', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4913A'; (e.currentTarget as HTMLElement).style.color = '#C4913A'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,237,216,0.18)'; (e.currentTarget as HTMLElement).style.color = '#F5EDD8'; }}
              >
                <Play size={12} fill="currentColor" /> EXPLORE WORK
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{ display: 'flex', borderTop: '1px solid rgba(245,237,216,0.08)', paddingTop: '24px', gap: '0' }}>
              {[{ target: 150, suffix: '+', label: 'Happy Clients' }, { target: 300, suffix: '+', label: 'Projects Done' }, { target: 85, suffix: '%', label: 'Growth Rate' }, { target: 8, suffix: '+', label: 'Years Active' }].map((s, i) => (
                <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? '16px' : 0, paddingRight: i < 3 ? '16px' : 0, borderRight: i < 3 ? '1px solid rgba(245,237,216,0.08)' : 'none' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', color: '#C4913A', lineHeight: 1 }}>
                    <DummyAnimatedCounter target={s.target} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '9px', color: 'rgba(245,237,216,0.38)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: newsletter */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }} className="dummy-right-col">
            {/* Trusted pill */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.6 }}
              style={{ position: 'absolute', top: '-28px', left: '-14px', padding: '8px 14px', background: 'rgba(196,145,58,0.10)', backdropFilter: 'blur(16px)', border: '1px solid rgba(196,145,58,0.28)', borderRadius: '10px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex' }}>
                {[0, 1, 5, 3].map((idx, i) => (
                  <div key={i} style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid rgba(10,7,5,0.8)', background: '#fff', overflow: 'hidden', marginLeft: i > 0 ? '-6px' : 0 }}>
                    <img src={clientLogos[idx]?.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '11px', color: '#E8B96A', letterSpacing: '0.1em' }}>150+ TRUSTED</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '8px', color: 'rgba(245,237,216,0.45)', letterSpacing: '0.08em' }}>Companies Worldwide</div>
              </div>
            </motion.div>

            {/* Rating pill bottom-left */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{ position: 'absolute', bottom: '-12px', left: '-12px', padding: '8px 14px', background: 'rgba(10,7,5,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(196,145,58,0.22)', borderRadius: '10px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={9} fill="#C4913A" color="#C4913A" />)}</div>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'rgba(245,237,216,0.7)' }}>5.0 · 300+ Projects</span>
            </motion.div>

            {/* Avatar */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: '-10px', right: '-8px', width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(10,7,5,0.9)', boxShadow: '0 16px 40px rgba(0,0,0,0.6)', zIndex: 20 }}>
              <img src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?q=80&w=400" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Newsletter Card */}
            <div style={{ background: 'rgba(12,9,7,0.78)', backdropFilter: 'blur(28px)', border: '1px solid rgba(196,145,58,0.18)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(196,145,58,0.1)' }}>
              <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(196,145,58,0.09)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.16em', color: '#F5EDD8' }}>NEWS & UPDATES</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '9px', color: 'rgba(196,145,58,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Latest from Avani</div>
                </div>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(196,145,58,0.12)', border: '1px solid rgba(196,145,58,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={13} color="#C4913A" />
                </div>
              </div>
              <div>
                {loadingNewsletters ? (
                  <div style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '22px', height: '22px', border: '2px solid rgba(196,145,58,0.2)', borderTopColor: '#C4913A', borderRadius: '50%', animation: 'dummy-spin 0.8s linear infinite' }} />
                  </div>
                ) : newsletters.length === 0 ? (
                  <p style={{ padding: '18px 20px', fontFamily: "'Outfit', sans-serif", color: 'rgba(245,237,216,0.3)', fontSize: '12px' }}>Updates coming soon…</p>
                ) : newsletters.slice(0, 3).map((n: any) => {
                  const date = new Date(n.publishedAt || n.createdAt);
                  const isRecent = (Date.now() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
                  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                  const day = date.getDate().toString().padStart(2, '0');
                  return (
                    <Link key={n._id} to={`/newsletters/${n.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderBottom: '1px solid rgba(196,145,58,0.06)', textDecoration: 'none', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(196,145,58,0.06)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <div style={{ flexShrink: 0 }}>
                        {n.imageUrl ? (
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(196,145,58,0.12)' }}>
                            <img src={n.imageUrl.startsWith('http') ? n.imageUrl : `${API_BASE_URL}${n.imageUrl.startsWith('/') ? '' : '/'}${n.imageUrl}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => e.target.src = 'https://placehold.co/36x36?text=N'} />
                          </div>
                        ) : (
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(196,145,58,0.07)', border: '1px solid rgba(196,145,58,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '7px', color: '#C4913A', letterSpacing: '0.1em' }}>{month}</span>
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#F5EDD8', lineHeight: 1 }}>{day}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '12px', fontWeight: 500, color: '#F5EDD8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>{n.title}</div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '10px', color: 'rgba(245,237,216,0.3)' }}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          {isRecent && <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '8px', color: '#C4913A', background: 'rgba(196,145,58,0.1)', padding: '1px 6px', borderRadius: '100px', border: '1px solid rgba(196,145,58,0.18)', letterSpacing: '0.08em' }}>NEW</span>}
                        </div>
                      </div>
                      <ChevronRight size={11} color="rgba(196,145,58,0.35)" />
                    </Link>
                  );
                })}
              </div>
              {!loadingNewsletters && newsletters.length > 0 && (
                <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(196,145,58,0.07)' }}>
                  <Link to="/newsletters" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', border: '1px solid rgba(196,145,58,0.18)', borderRadius: '8px', color: 'rgba(196,145,58,0.65)', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif", fontSize: '10px', letterSpacing: '0.2em', transition: 'all 0.25s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C4913A'; (e.currentTarget as HTMLElement).style.color = '#C4913A'; (e.currentTarget as HTMLElement).style.background = 'rgba(196,145,58,0.06)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,145,58,0.18)'; (e.currentTarget as HTMLElement).style.color = 'rgba(196,145,58,0.65)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
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
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(196,145,58,0.45)' }}>SCROLL</span>
        <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, rgba(196,145,58,0.5), transparent)' }} />
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        @keyframes dummy-spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .dummy-right-col { display: none !important; } }
        @media (max-width: 768px) { .dummy-hero-grid { grid-template-columns: 1fr !important; padding: 90px 20px 40px !important; } }
      `}</style>
    </section>
  );
};

export default DummyHero;