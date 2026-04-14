import React, { useState, useEffect, useRef } from 'react';

const DummyAnimatedCounter = ({ target, suffix = '', duration = 2000 }: any) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true;
        const steps = 60;
        let cur = 0;
        const timer = setInterval(() => {
          cur++;
          setCount(Math.min(Math.floor((target / steps) * cur), target));
          if (cur >= steps) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default DummyAnimatedCounter;