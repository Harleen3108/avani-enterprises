import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

/**
 * Animated Counter Component - ADKO-Inspired
 * Counts from 0 to target number when element enters viewport
 */
const AnimatedCounter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
  decimals = 0
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    // If user prefers reduced motion, jump to target immediately
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, duration, shouldReduceMotion]);

  const displayValue = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count);

  return (
    <div ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </div>
  );
};

export default AnimatedCounter;