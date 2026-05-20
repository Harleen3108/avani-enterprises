import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const StickyConsultationButton = ({ to = "/dummyhome/get-consultation" }: { to?: string }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAtTop = scrollY < 120;

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <motion.div
        animate={{
          opacity: isAtTop ? 0 : 1,
          pointerEvents: isAtTop ? 'none' : 'auto',
          top: 'auto',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
          right: 'auto',
          left: '1.5rem',
          scale: isAtTop ? 0.95 : 1.05,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 18,
          mass: 0.8,
        }}
        style={{
          position: 'fixed',
          zIndex: 9999,
        }}
      >
        <div style={{ position: 'relative', cursor: 'pointer' }} className="group">
          {/* Pulsating background glow */}
          <span 
            className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"
            style={{ borderRadius: '100px' }}
          ></span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isAtTop ? '14px 28px' : '10px 20px',
              background: 'var(--bg-primary, #0A0705)',
              color: 'var(--text-primary, #F0EAD6)',
              borderRadius: '100px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: isAtTop ? '0.75rem' : '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              border: '2px solid var(--accent-primary, #D4AF37)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              transition: 'padding 0.3s, font-size 0.3s, border-color 0.3s',
              cursor: 'pointer'
            }}
          >
            <Calendar 
              size={isAtTop ? 16 : 13} 
              style={{ 
                color: 'var(--accent-primary, #D4AF37)', 
                marginRight: isAtTop ? '10px' : '6px' 
              }} 
            />
            <span>{isAtTop ? "GET FREE CONSULTATION" : "CONSULTATION"}</span>
            <Sparkles 
              size={12} 
              style={{ 
                color: 'var(--accent-light, #F5E0A0)', 
                marginLeft: '8px',
                display: isAtTop ? 'inline-block' : 'none'
              }} 
            />
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default StickyConsultationButton;
