import React from 'react';
import logoImage from '../assets/logo.svg';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="Remote Work Management" 
        className={`${sizeClasses[size]} object-contain`} 
      />
      <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
        Remote Work
      </span>
    </div>
  );
};

export default Logo; 