import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import DummyNavbar from '../../components/dummy/DummyNavbar';
import DummyFooter from '../../components/dummy/DummyFooter';
import DummyScrollProgress from '../../components/dummy/DummyScrollProgress';
import Chatbot from '../../components/Chatbot';
import StickyConsultationButton from '../../components/StickyConsultationButton';
import '../../components/dummy/DummyHome.css';

const DHLayout = () => {
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

        {/* Navbar should be above everything */}
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <DummyNavbar />
        </div>

        {/* Background Grain - below interactive elements */}
        <div className="dh-grain" style={{ zIndex: 5, pointerEvents: 'none' }} />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Outlet context={{ theme }} />
        </main>

        <DummyFooter />
        <Chatbot />
        <StickyConsultationButton to="/dummyhome/get-consultation" />
      </div>
    </div>
  );
};

export default DHLayout;
