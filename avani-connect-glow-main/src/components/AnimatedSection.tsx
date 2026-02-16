import React, { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ 
  children, 
  className = "", 
  animation = "fadeInUp", 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700 ease-out";
    
    switch (animation) {
      case "fadeInUp":
        return `${baseClasses} transform ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        }`;
      case "fadeInLeft":
        return `${baseClasses} transform ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-8"
        }`;
      case "fadeInRight":
        return `${baseClasses} transform ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-8"
        }`;
      case "fadeIn":
        return `${baseClasses} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`;
      case "scaleIn":
        return `${baseClasses} transform ${
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95"
        }`;
      case "slideUp":
        return `${baseClasses} transform ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-12"
        }`;
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: `${delay * 100}ms`,
        transitionDuration: `${duration * 1000}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 