import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'HOME', path: '/dummyhome' },
  { label: 'ABOUT', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'CASE STUDIES', path: '/case-studies' },
  { label: 'BLOG', path: '/blog' },
  { label: 'CONTACT', path: '/contact' },
];

const DummyNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '10px 0' : '14px 0',
        background: scrolled ? 'rgba(10,7,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,145,58,0.1)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/dummyhome" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
              <img src="/logo0.jpg" alt="Avani" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '0.18em', color: '#F5EDD8', lineHeight: 1 }}>AVANI</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(196,145,58,0.65)', marginTop: '1px' }}>ENTERPRISES</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="dummy-nav-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '13px', letterSpacing: '0.16em',
                    color: isActive ? '#C4913A' : 'rgba(245,237,216,0.6)',
                    textDecoration: 'none', position: 'relative', padding: '4px 0',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#F5EDD8'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,216,0.6)'; }}
                >
                  {link.label}
                  {isActive && <motion.div layoutId="dummy-nav-indicator" style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: '2px', background: '#C4913A', borderRadius: '1px' }} transition={{ duration: 0.3 }} />}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/get-consultation" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px',
              background: 'linear-gradient(135deg, #C4913A, #E8B96A)', color: '#0A0705',
              borderRadius: '5px', textDecoration: 'none', fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '12px', letterSpacing: '0.15em',
              boxShadow: '0 4px 16px rgba(196,145,58,0.25)', transition: 'all 0.3s',
            }} className="dummy-nav-cta"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(196,145,58,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(196,145,58,0.25)'; }}
            >
              GET STARTED <ArrowRight size={12} />
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="dummy-nav-burger"
              style={{ display: 'none', background: 'none', border: '1px solid rgba(196,145,58,0.3)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#F5EDD8' }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: '52px', left: 0, right: 0, bottom: 0, zIndex: 999,
              background: 'rgba(10,7,5,0.97)', backdropFilter: 'blur(20px)',
              padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={link.path} onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '14px 0', borderBottom: '1px solid rgba(196,145,58,0.08)',
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.15em',
                    color: location.pathname === link.path ? '#C4913A' : 'rgba(245,237,216,0.7)',
                    textDecoration: 'none',
                  }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/get-consultation" onClick={() => setMobileOpen(false)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px',
              padding: '12px 28px', background: 'linear-gradient(135deg, #C4913A, #E8B96A)',
              color: '#0A0705', borderRadius: '6px', textDecoration: 'none',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.15em',
              alignSelf: 'flex-start',
            }}>
              GET CONSULTATION <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .dummy-nav-links { display: none !important; }
          .dummy-nav-burger { display: flex !important; }
          .dummy-nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default DummyNavbar;
