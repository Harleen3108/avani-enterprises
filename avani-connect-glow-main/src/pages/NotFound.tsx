import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Phone, Mail, Search } from 'lucide-react';

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Soft 404 signal for logs only (no user-facing console noise)
    if (import.meta.env.DEV) console.warn("404 — path not found:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/blog?q=${encodeURIComponent(q)}`);
  };

  const services = [
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Business OS', href: '/business-os' },
    { label: 'Social Sync', href: '/social-sync' },
    { label: 'Google SEO Services', href: '/services/seo-content-marketing' },
  ];

  const quickLinks = [
    { label: 'Return Home', href: '/' },
    { label: 'Our Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Read Our Blog', href: '/blog' },
  ];

  return (
    <div style={{ background: '#0A0705', color: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Satoshi', 'Inter', sans-serif", position: 'relative', overflow: 'hidden', padding: '80px 24px' }}>
      <Helmet>
        <title>Page Not Found (404) | Avani Enterprises</title>
        <meta name="description" content="Oops! The page you are looking for does not exist. Explore our high-performance web development, SEO, and digital marketing services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Decorative Blur Blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '350px', height: '350px', background: 'var(--accent-primary, #C4913A)', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: '#e11d48', opacity: 0.03, filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '680px', width: '100%', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        
        {/* Animated Error Code */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: 900, margin: 0, lineHeight: 1.1, background: 'linear-gradient(135deg, #FFF 30%, var(--accent-primary, #C4913A) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Page Not Found
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 700, margin: '16px 0 24px 0', letterSpacing: '-0.02em', color: '#fff' }}
        >
          Lost in Space? Let's get you back.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ color: '#a0a0a0', fontSize: '1rem', lineHeight: 1.7, margin: '0 auto 40px auto', maxWidth: '500px' }}
        >
          The page you requested might have been moved, renamed, or is temporarily unavailable. Search our site or use the links below to find what you need.
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{ display: 'flex', gap: '10px', maxWidth: '460px', margin: '0 auto 44px auto' }}
          role="search"
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search our site…"
              aria-label="Search the site"
              style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.92rem', outline: 'none' }}
            />
          </div>
          <button type="submit" style={{ padding: '13px 24px', borderRadius: '10px', background: 'var(--accent-primary, #C4913A)', color: '#000', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
            Search
          </button>
        </motion.form>

        {/* Categories Link Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'left', marginBottom: '48px' }}
          className="dh-responsive-grid"
        >
          {/* Service Links */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--accent-primary, #C4913A)', margin: '0 0 16px 0', textTransform: 'uppercase' }}>Our Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map((item) => (
                <Link key={item.href} to={item.href} style={{ color: '#cccccc', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                  <ArrowRight size={12} color="var(--accent-primary, #C4913A)" /> {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--accent-primary, #C4913A)', margin: '0 0 16px 0', textTransform: 'uppercase' }}>Useful Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((item) => (
                <Link key={item.href} to={item.href} style={{ color: '#cccccc', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                  <ArrowRight size={12} color="var(--accent-primary, #C4913A)" /> {item.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <Link to="/" className="dh-btn-fill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'var(--accent-primary, #C4913A)', borderRadius: '10px', color: '#000', fontWeight: 700, fontSize: '0.9rem' }}>
            <Home size={15} /> Return Home
          </Link>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary, #C4913A)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}>
            Talk to an Expert <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Direct Contact details */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ marginTop: '40px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', color: '#777777' }}
        >
          <a href="tel:+91 84487 63134" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary, #C4913A)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
            <Phone size={13} color="var(--accent-primary, #C4913A)" /> +91 84487 63134
          </a>
          <a href="mailto:kp@avanienterprises.in" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary, #C4913A)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
            <Mail size={13} color="var(--accent-primary, #C4913A)" /> kp@avanienterprises.in
          </a>
        </motion.div>

      </div>
    </div>
  );
}
