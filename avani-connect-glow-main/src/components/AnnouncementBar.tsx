import React from 'react';
import { motion } from 'framer-motion';

interface AnnouncementBarProps {
  text?: string;
  speed?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ 
  text = "We are tech partner of Institute of Home economics Du",
  speed = "30s"
}) => {
  const content = (
    <div className="flex items-center gap-6 px-12">
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="relative">
          <img src="/logo0.jpg" alt="Avani Logo" className="h-7 w-7 rounded-lg shadow-lg object-cover ring-2 ring-white/20" />
          <motion.div 
            className="absolute -inset-1 bg-white/20 blur-sm rounded-lg -z-10"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="text-sm font-bold text-white/60">x</span>
        <div className="relative">
          <img src="/hilogo.png" alt="IHE Logo" className="h-7 w-auto object-contain filter drop-shadow-md" />
          <motion.div 
            className="absolute -inset-1 bg-white/10 blur-sm rounded-lg -z-10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>
      <motion.span 
        className="text-lg md:text-xl font-normal tracking-wider whitespace-nowrap italic text-white font-cursive"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </div>
  );

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white h-[var(--announcement-bar-height)] flex items-center overflow-hidden border-b border-white/10"
      style={{ '--duration': speed } as React.CSSProperties}
    >
      <div className="marquee-container">
        <div className="marquee-content items-center">
          {content}
          {content}
          {content}
        </div>
        <div className="marquee-content items-center" aria-hidden="true">
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
