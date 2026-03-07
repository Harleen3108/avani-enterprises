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
  const blurVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  const xVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.6,
      transition: { delay: 0.4, duration: 0.5 }
    }
  };

  const content = (
    <div className="flex items-center gap-6 px-12">
      <div className="flex items-center gap-3">
        {/* Avani Logo */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={blurVariants}
          custom={0}
          className="relative"
        >
          <img src="/logo0.jpg" alt="Avani Logo" className="h-7 w-7 rounded-lg shadow-lg object-cover ring-2 ring-white/20" />
          <motion.div 
            className="absolute -inset-1 bg-white/20 blur-sm rounded-lg -z-10"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* 'x' Separator */}
        <motion.span 
          initial="hidden"
          animate="visible"
          variants={xVariants}
          className="text-sm font-bold text-white"
        >
          x
        </motion.span>
        
        {/* IHE Logo */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={blurVariants}
          custom={0.8}
          className="relative"
        >
          <img src="/hilogo.png" alt="IHE Logo" className="h-7 w-auto object-contain filter drop-shadow-md" />
          <motion.div 
            className="absolute -inset-1 bg-white/10 blur-sm rounded-lg -z-10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </div>
      
      {/* Announcement Text */}
      <motion.span 
        initial="hidden"
        animate="visible"
        variants={blurVariants}
        custom={1.6}
        className="text-lg md:text-xl font-normal tracking-wider whitespace-nowrap italic text-white font-cursive"
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
