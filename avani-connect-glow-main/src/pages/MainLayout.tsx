import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DummyScrollProgress from '../components/ScrollProgress';
import Chatbot from '../components/Chatbot';
import StickyConsultationButton from '../components/StickyConsultationButton';
import '../components/Home.css';

const MainLayout = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Apply theme to body bg to ensure scroll-bounces match
    document.body.style.backgroundColor = theme === 'dark' ? '#0A0705' : '#F0EAD6';
  }, [theme, pathname]);

  return (
    <div className={theme === 'dark' ? 'dummy-theme-dark' : 'dummy-theme-light'}>
      <div className="dh-root" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', transition: 'background 0.5s ease' }}>
        <DummyScrollProgress />

        {/* Navbar should be above everything (incl. the z-9999 sticky CTA) so the
            mobile menu overlay is never blocked by other fixed elements */}
        <div style={{ position: 'relative', zIndex: 100000 }}>
          <Navbar />
        </div>

        {/* Background Grain - below interactive elements */}
        <div className="dh-grain" style={{ zIndex: 5, pointerEvents: 'none' }} />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Outlet context={{ theme }} />
        </main>

        <Footer />
        <Chatbot />
        <StickyConsultationButton to="/contact" />
      </div>
    </div>
  );
};

export default MainLayout;
