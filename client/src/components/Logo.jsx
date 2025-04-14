import React from 'react';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} ${className} text-blue-600 dark:text-blue-400 whitespace-nowrap`}>
      Remote Work Management System
    </div>
  );
};

export default Logo; 