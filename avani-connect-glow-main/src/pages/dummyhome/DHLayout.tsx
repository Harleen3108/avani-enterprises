import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import DummyNavbar from '../../components/dummy/DummyNavbar';
import DummyFooter from '../../components/dummy/DummyFooter';
import DummyScrollProgress from '../../components/dummy/DummyScrollProgress';
import Chatbot from '../../components/Chatbot';
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

        {/* Theme Toggle Button */}
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{
            position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999,
            width: '50px', height: '50px', borderRadius: '50%',
            background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-light)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
          }}
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <Sun size={22} color="var(--accent-primary)" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Moon size={22} color="var(--accent-primary)" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default DHLayout;
