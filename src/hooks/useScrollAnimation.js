import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (
  options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!options.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, isVisible];
};

export default useScrollAnimation;