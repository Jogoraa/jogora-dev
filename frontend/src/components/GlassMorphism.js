import React from 'react';
import { cn } from '../lib/utils';

const GlassMorphism = ({ 
  children, 
  className = '', 
  intensity = 'medium',
  tint = 'white',
  border = true,
  ...props 
}) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case 'light':
        return 'backdrop-blur-sm bg-opacity-10';
      case 'medium':
        return 'backdrop-blur-md bg-opacity-20';
      case 'heavy':
        return 'backdrop-blur-lg bg-opacity-30';
      case 'ultra':
        return 'backdrop-blur-xl bg-opacity-40';
      default:
        return 'backdrop-blur-md bg-opacity-20';
    }
  };

  const getTintClasses = () => {
    switch (tint) {
      case 'white':
        return 'bg-white';
      case 'black':
        return 'bg-black';
      case 'blue':
        return 'bg-blue-500';
      case 'purple':
        return 'bg-purple-500';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-blue-50';
      default:
        return 'bg-white';
    }
  };

  const borderClasses = border 
    ? 'border border-white border-opacity-20 shadow-lg' 
    : '';

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        getIntensityClasses(),
        getTintClasses(),
        borderClasses,
        className
      )}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassMorphism;
