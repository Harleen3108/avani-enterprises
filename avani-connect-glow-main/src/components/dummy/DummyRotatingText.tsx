import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface DummyRotatingTextProps {
  words: string[];
  interval?: number;
}

const DummyRotatingText: React.FC<DummyRotatingTextProps> = ({ words, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span style={{ display: 'inline-block', position: 'relative', overflow: 'hidden', minWidth: '320px', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-block',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(52px, 6vw, 88px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#C4913A',
            fontStyle: 'italic',
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default DummyRotatingText;
