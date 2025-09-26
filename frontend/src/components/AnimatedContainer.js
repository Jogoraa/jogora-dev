import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AnimatedContainer = ({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.1,
  triggerOnce = true 
}) => {
  const [ref, isVisible] = useScrollAnimation({ 
    threshold, 
    triggerOnce,
    rootMargin: '0px 0px -50px 0px'
  });

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in'
  };

  const baseClasses = isVisible 
    ? `${animationClasses[animation] || 'animate-fade-in-up'} opacity-100` 
    : 'opacity-0';

  const style = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div 
      ref={ref}
      className={`${baseClasses} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;