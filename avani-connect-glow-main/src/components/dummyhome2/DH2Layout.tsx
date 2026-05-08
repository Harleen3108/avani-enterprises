import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import DH2Navbar from './DH2Navbar';
import Chatbot from '../Chatbot';
import { FluidHeroBackground } from './FluidHeroBackground';
import '../../components/dummyhome2/DummyHome2.css';

const footerLinks = {
  company: [
    { label: 'About Us', path: '/dummyhome2/about' },
    { label: 'Our Team', path: '/dummyhome2/team' },
    { label: 'Careers', path: '/dummyhome2/careers' },
    { label: 'Case Studies', path: '/dummyhome2/case-studies' },
    { label: 'Blog', path: '/dummyhome2/blog' },
  ],
  services: [
    { label: 'Ready Products', path: '/dummyhome2/our-products' },
    { label: 'Expertise', path: '/dummyhome2/services' },
    { label: 'Newsletters', path: '/dummyhome2/newsletters' },
    { label: 'Global Network', path: '/dummyhome2/global-presence' },
    { label: 'Contact', path: '/dummyhome2/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/dummyhome2/privacy-policy' },
    { label: 'Terms & Conditions', path: '/dummyhome2/terms-and-conditions' },
  ],
};

const DH2Footer = () => (
  <footer className="dh2-footer">
    <div className="dh2-footer-grid">
      <div>
        <div className="dh2-footer-brand">AVANI.</div>
        <p className="dh2-footer-desc">One stop solution for business. We build stories, share passions, and deliver results that leave competitors far behind.</p>
      </div>
      <div>
        <div className="dh2-footer-heading">Company</div>
        {footerLinks.company.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
      </div>
      <div>
        <div className="dh2-footer-heading">Services</div>
        {footerLinks.services.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
      </div>
      <div>
        <div className="dh2-footer-heading">Legal</div>
        {footerLinks.legal.map((l, i) => <Link key={i} to={l.path} className="dh2-footer-link">{l.label}</Link>)}
      </div>
    </div>
    <div className="dh2-footer-bottom">
      <span>© 2016–2025 Avani Enterprises. All rights reserved.</span>
      <span>Expanding Globally · Gurgaon · Mumbai · Rohtak · Australia</span>
    </div>
  </footer>
);

const DH2Layout = () => {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  
  // Theme interpolation (same as DummyHome2)
  const scrollPoints = [0, 0.25, 0.28, 0.50, 0.53, 1];
  const bgDeep = useTransform(scrollYProgress, scrollPoints, ['#030303', '#030303', '#e8e4db', '#e8e4db', '#030303', '#030303']);
  const bgBase = useTransform(scrollYProgress, scrollPoints, ['#0a0a0a', '#0a0a0a', '#eeebe4', '#eeebe4', '#0a0a0a', '#0a0a0a']);
  const bgSurface = useTransform(scrollYProgress, scrollPoints, ['#111111', '#111111', '#f4f2ee', '#f4f2ee', '#111111', '#111111']);
  const textMain = useTransform(scrollYProgress, scrollPoints, ['#f0f0f0', '#f0f0f0', '#1a1a1a', '#1a1a1a', '#f0f0f0', '#f0f0f0']);
  const textMuted = useTransform(scrollYProgress, scrollPoints, ['#7a7a7a', '#7a7a7a', '#666666', '#666666', '#7a7a7a', '#7a7a7a']);
  const textDim = useTransform(scrollYProgress, scrollPoints, ['#3a3a3a', '#3a3a3a', '#999999', '#999999', '#3a3a3a', '#3a3a3a']);
  const borderS = useTransform(scrollYProgress, scrollPoints, ['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.07)', 'rgba(0,0,0,0.08)', 'rgba(0,0,0,0.08)', 'rgba(255,255,255,0.07)', 'rgba(255,255,255,0.07)']);
  const borderF = useTransform(scrollYProgress, scrollPoints, ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.15)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div 
      className="dh2-root"
      style={{
        '--bg-deep': bgDeep,
        '--bg-base': bgBase,
        '--bg-surface': bgSurface,
        '--text-main': textMain,
        '--text-muted': textMuted,
        '--text-dim': textDim,
        '--border-s': borderS,
        '--border-f': borderF,
      } as any}
    >
      <DH2Navbar />
      
      {/* Background elements */}
      <div className="dh2-hero-bg-wrapper" style={{ position: 'fixed', opacity: 0.4, zIndex: 0 }}>
        <FluidHeroBackground />
        <div className="dh2-hero-grain"/>
      </div>

      <main className="dh2-page" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Outlet />
      </main>

      <DH2Footer />
      <Chatbot />
    </motion.div>
  );
};

export default DH2Layout;
