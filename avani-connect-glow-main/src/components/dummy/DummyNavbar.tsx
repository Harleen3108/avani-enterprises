import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown, Phone } from 'lucide-react';

const navLinks = [
  { label: 'HOME', path: '/dummyhome' },
  { label: 'ABOUT', path: '/dummyhome/about' },
  { label: 'SERVICES', path: '/dummyhome/services' },
  { label: 'PROJECTS', path: '/dummyhome/projects' },
  { 
    label: 'RESOURCES', 
    dropdown: [
      { label: 'BLOG', path: '/dummyhome/blog' },
      { label: 'NEWSLETTERS', path: '/dummyhome/newsletters' },
      { label: 'COURSES', path: '/dummyhome/courses' },
      { label: 'CASE STUDIES', path: '/dummyhome/case-studies' },
    ] 
  },
  { label: 'JOIN US', path: '/dummyhome/careers' },
  { label: 'GLOBAL PRESENCE', path: '/dummyhome/global-presence' },
  { label: 'CONTACT', path: '/dummyhome/contact' },
];

const DummyNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { 
    setMobileOpen(false); 
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '10px 0' : '14px 0',
        background: scrolled ? 'var(--nav-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="dummy-nav-container">
          {/* Logo */}
          <Link to="/dummyhome" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', background: '#fff', padding: '2px' }}>
              <img src="/logo0.jpg" alt="Avani" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', letterSpacing: '0.14em', color: 'var(--text-primary)', lineHeight: 1, fontWeight: 700 }}>AVANI</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginTop: '1px', fontWeight: 500 }}>ENTERPRISES</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="dummy-nav-links">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isActive = link.dropdown.some(sub => location.pathname === sub.path);
                return (
                  <div key={link.label} style={{ position: 'relative' }}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: '13px', letterSpacing: '0.12em', fontWeight: 600,
                        color: isActive || openDropdown === link.label ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        textDecoration: 'none', position: 'relative', padding: '4px 0',
                        display: 'flex', alignItems: 'center', gap: '4px',
                        transition: 'color 0.25s',
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14} style={{ transform: openDropdown === link.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                      {isActive && <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: '2px', background: 'var(--accent-primary)', borderRadius: '1px' }} />}
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                            background: '#1A1512', backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            padding: '12px 0', minWidth: '180px', zIndex: 100,
                            marginTop: '8px'
                          }}
                        >
                          {link.dropdown.map(sub => (
                            <Link key={sub.path} to={sub.path}
                              style={{
                                display: 'block', padding: '8px 20px',
                                fontFamily: "'Outfit', sans-serif", fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600,
                                color: location.pathname === sub.path ? 'var(--accent-primary)' : 'rgba(255,255,255,0.7)',
                                textDecoration: 'none', transition: 'all 0.2s',
                              }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = location.pathname === sub.path ? 'var(--accent-primary)' : 'rgba(255,255,255,0.7)'; }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: '13px', letterSpacing: '0.12em', fontWeight: 600,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none', position: 'relative', padding: '4px 0',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  {link.label}
                  {isActive && <motion.div layoutId="dummy-nav-indicator" style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: '2px', background: 'var(--accent-primary)', borderRadius: '1px' }} transition={{ duration: 0.3 }} />}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="tel:+919253625099" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
              background: 'none', border: '1px solid var(--border-light)', color: 'var(--text-primary)',
              borderRadius: '5px', textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
              fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600,
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
            >
              <Phone size={12} style={{ color: 'var(--accent-primary)' }} /> CALL NOW
            </a>
             <a href="/dummyhome/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))', color: 'var(--bg-primary)',
              borderRadius: '5px', textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
              fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600,
              boxShadow: '0 4px 16px var(--accent-hover)', transition: 'all 0.3s',
            }} className="dummy-nav-cta"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px var(--border-light)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px var(--accent-hover)'; }}
            >
              GET STARTED <ArrowRight size={12} />
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="dummy-nav-burger"
              style={{ display: 'none', background: 'none', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: 'var(--text-primary)' }}>
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
              background: 'var(--nav-scrolled)', backdropFilter: 'blur(20px)',
              padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '4px',
              overflowY: 'auto'
            }} className="dummy-nav-mobile-container"
          >
            {navLinks.map((link, i) => {
              if (link.dropdown) {
                const isActive = link.dropdown.some(sub => location.pathname === sub.path);
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                        padding: '14px 0', borderBottom: '1px solid var(--border-faint)',
                        fontFamily: "'Outfit', sans-serif", fontSize: '20px', letterSpacing: '0.12em', fontWeight: 600,
                        color: isActive || openDropdown === link.label ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        background: 'none', border: 'none', cursor: 'pointer', outline: 'none'
                      }}
                    >
                      <span style={{ flex: 1, textAlign: 'left' }}>{link.label}</span>
                      <ChevronDown size={18} style={{ transform: openDropdown === link.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden', paddingLeft: '16px' }}
                        >
                          {link.dropdown.map(sub => (
                            <Link key={sub.path} to={sub.path} onClick={() => setMobileOpen(false)}
                              style={{
                                display: 'block', padding: '10px 0',
                                fontFamily: "'Outfit', sans-serif", fontSize: '16px', letterSpacing: '0.08em', fontWeight: 600,
                                color: location.pathname === sub.path ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                                textDecoration: 'none',
                              }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={link.path} onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '14px 0', borderBottom: '1px solid var(--border-faint)',
                      fontFamily: "'Outfit', sans-serif", fontSize: '20px', letterSpacing: '0.12em', fontWeight: 600,
                      color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                    }}>
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <a href="/dummyhome/contact" onClick={() => setMobileOpen(false)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px',
              padding: '12px 28px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
              color: 'var(--bg-primary)', borderRadius: '6px', textDecoration: 'none',
              fontFamily: "'Outfit', sans-serif", fontSize: '14px', letterSpacing: '0.12em', fontWeight: 600,
              alignSelf: 'flex-start',
            }}>
              GET CONSULTATION <ArrowRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .dummy-nav-links { gap: 16px !important; }
        }
        @media (max-width: 900px) {
          .dummy-nav-links { display: none !important; }
          .dummy-nav-burger { display: flex !important; }
          .dummy-nav-cta { display: none !important; }
        }
        @media (max-width: 768px) {
          .dummy-nav-container { padding: 0 24px !important; }
          .dummy-nav-mobile-container { padding: 24px !important; }
        }
      `}</style>
    </>
  );
};

export default DummyNavbar;
