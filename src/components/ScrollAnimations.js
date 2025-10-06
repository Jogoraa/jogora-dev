import React, { useEffect, useRef } from 'react';

const ScrollAnimations = ({ children, animation = 'fade-in-up', delay = 0, threshold = 0.1 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, threshold]);

  const getAnimationClasses = () => {
    const baseClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
    
    switch (animation) {
      case 'fade-in-up':
        return `${baseClasses} translate-y-8`;
      case 'fade-in-down':
        return `${baseClasses} -translate-y-8`;
      case 'fade-in-left':
        return `${baseClasses} -translate-x-8`;
      case 'fade-in-right':
        return `${baseClasses} translate-x-8`;
      case 'scale-in':
        return `${baseClasses} scale-95`;
      case 'rotate-in':
        return `${baseClasses} rotate-3`;
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={elementRef}
      className={getAnimationClasses()}
      style={{
        '--animate-delay': `${delay}ms`
      }}
    >
      {children}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translate(0) scale(1) rotate(0) !important;
        }
      `}</style>
    </div>
  );
};

export default ScrollAnimations;
