/**
 * Animation Utilities - ADKO-Inspired
 * Reusable animation variants and configurations for consistent animations across the site
 */

import { Variants } from "framer-motion";

// Easing curves
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1], // Smooth, natural easing
  easeInOut: [0.43, 0.13, 0.23, 0.96],
  spring: { type: "spring", stiffness: 500, damping: 28 }
} as const;

// Timing
export const DURATION = {
  fast: 0.2,      // Buttons, links
  medium: 0.4,    // Cards, images
  slow: 0.6,      // Sections, reveals
  counter: 2      // Number counters
} as const;

// Fade in + slide up (most common animation)
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING.easeOut 
    }
  }
};

// Fade in only
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: DURATION.medium, 
      ease: EASING.easeOut 
    }
  }
};

// Stagger container for multiple children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stagger container with faster timing
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Scale on hover (for cards)
export const scaleOnHover = {
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  transition: { 
    duration: DURATION.fast, 
    ease: EASING.easeOut 
  }
};

// Scale on hover (for buttons)
export const buttonHover = {
  scale: 1.05,
  transition: { 
    duration: DURATION.fast, 
    ease: EASING.easeOut 
  }
};

// Image zoom on hover
export const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: DURATION.medium, 
      ease: EASING.easeOut 
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING.easeOut 
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: DURATION.slow, 
      ease: EASING.easeOut 
    }
  }
};

// Viewport settings for scroll-triggered animations
export const viewportSettings = {
  once: true,           // Only animate once
  margin: "-100px",     // Trigger 100px before element enters viewport
  amount: 0.3           // Trigger when 30% of element is visible
};

// Viewport settings for immediate trigger
export const viewportImmediate = {
  once: true,
  margin: "0px",
  amount: 0.1
};
