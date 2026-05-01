import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DH2Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById('dh2-mobile-menu');
      if (nav && !nav.contains(e.target as Node)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); setOpenDropdown(null); }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/dummyhome2' },
    { name: 'About', path: '/dummyhome2/about' },
    { name: 'Services', path: '/dummyhome2/services' },
    {
      name: 'Our Products',
      path: '/dummyhome2/our-products',
      subItems: [
        { name: 'HR Portal', path: '/dummyhome2/our-products', external: 'https://hrportal.avanienterprises.in/' },
        { name: 'School Management', path: '/dummyhome2/our-products', external: 'https://indus-school-page.vercel.app/admission' },
        { name: 'Project CRM', path: '/dummyhome2/our-products', external: 'https://team-lead-gamma.vercel.app/' },
        { name: 'Custom E-commerce', path: '/dummyhome2/our-products', external: 'https://shoes-ecommerce-iota.vercel.app/' },
      ]
    },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Blog', path: '/dummyhome2/blog' },
        { name: 'Newsletters', path: '/dummyhome2/newsletters' },
        { name: 'Courses', path: '/courses' },
        { name: 'Case Studies', path: '/dummyhome2/case-studies' },
      ]
    },
    { name: 'Careers', path: '/dummyhome2/careers' },
    { name: 'Global Presence', path: '/dummyhome2/global-presence' },
    { name: 'Contact', path: '/dummyhome2/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (items: { path: string }[]) => items.some(i => location.pathname === i.path);

  return (
    <nav className={`dh2-nav ${scrolled ? 'dh2-nav--scrolled' : ''}`}>
      <Link to="/dummyhome2" className="dh2-logo">AVANI.</Link>

      {/* Desktop Links */}
      <div className="dh2-nav-links" ref={dropdownRef}>
        {navItems.map(item => {
          // Sub-items (Our Products style)
          if ('subItems' in item && item.subItems) {
            return (
              <div key={item.name} className="dh2-nav-dropdown-wrap">
                <Link to={item.path} className={`dh2-nav-link ${isActive(item.path) ? 'active' : ''}`}>
                  {item.name}
                </Link>
                <div className="dh2-nav-mega">
                  {item.subItems.map(sub => (
                    <div key={sub.name} className="dh2-nav-mega-item">
                      <Link to={sub.path} className="dh2-nav-mega-link">{sub.name}</Link>
                      {sub.external && (
                        <a href={sub.external} target="_blank" rel="noopener noreferrer" className="dh2-nav-mega-ext">
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Dropdown (Resources style)
          if ('dropdown' in item && item.dropdown) {
            const active = isDropdownActive(item.dropdown);
            return (
              <div key={item.name} className="dh2-nav-dropdown-wrap">
                <button
                  className={`dh2-nav-link ${active || openDropdown === item.name ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                >
                  {item.name} <ChevronDown size={12} style={{ marginLeft: 3, transition: 'transform .3s', transform: openDropdown === item.name ? 'rotate(180deg)' : 'none' }} />
                </button>
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div className="dh2-nav-dropdown" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      {item.dropdown.map(sub => (
                        <Link key={sub.path} to={sub.path} className="dh2-nav-dropdown-link" onClick={() => setOpenDropdown(null)}>{sub.name}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          // Simple link
          return (
            <Link key={item.name} to={item.path!} className={`dh2-nav-link ${isActive(item.path!) ? 'active' : ''}`}>
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Desktop CTA */}
      <div className="dh2-nav-actions">
        <a href="tel:+919253625099" className="dh2-nav-phone"><Phone size={14} /></a>
        <Link to="/dummyhome2/get-consultation" className="dh2-nav-cta">Get Started</Link>
      </div>

      {/* Mobile Toggle */}
      <button className="dh2-nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="dh2-mobile-menu"
            className="dh2-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .25 }}
          >
            {navItems.map(item => {
              if ('subItems' in item && item.subItems) {
                return (
                  <div key={item.name}>
                    <Link to={item.path} className={`dh2-mobile-link ${isActive(item.path) ? 'active' : ''}`}>{item.name}</Link>
                    <div className="dh2-mobile-sub">
                      {item.subItems.map(sub => (
                        <div key={sub.name} className="dh2-mobile-sub-row">
                          <Link to={sub.path} className="dh2-mobile-sub-link">{sub.name}</Link>
                          {sub.external && <a href={sub.external} target="_blank" rel="noopener noreferrer" className="dh2-mobile-sub-ext"><ExternalLink size={12} /></a>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if ('dropdown' in item && item.dropdown) {
                return (
                  <div key={item.name}>
                    <button className={`dh2-mobile-link dh2-mobile-link--dd ${openDropdown === item.name ? 'active' : ''}`} onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}>
                      {item.name} <ChevronDown size={14} style={{ transition: 'transform .3s', transform: openDropdown === item.name ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div className="dh2-mobile-sub" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                          {item.dropdown.map(sub => (
                            <Link key={sub.path} to={sub.path} className="dh2-mobile-sub-link">{sub.name}</Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return <Link key={item.name} to={item.path!} className={`dh2-mobile-link ${isActive(item.path!) ? 'active' : ''}`}>{item.name}</Link>;
            })}
            <div className="dh2-mobile-cta-wrap">
              <a href="tel:+919253625099" className="dh2-mobile-phone"><Phone size={14} /> Talk to Experts</a>
              <Link to="/dummyhome2/get-consultation" className="dh2-mobile-cta">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DH2Navbar;
