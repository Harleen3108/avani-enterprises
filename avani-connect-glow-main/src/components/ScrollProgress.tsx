import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const DummyScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--accent-primary)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
      }}
    />
  );
};

export default DummyScrollProgress;
