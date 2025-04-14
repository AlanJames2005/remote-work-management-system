import React from 'react';
import { Monitor } from 'lucide-react';

const Logo = ({ size = 'medium', layout = 'horizontal', className = '' }) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  const iconSizes = {
    small: 20,
    medium: 24,
    large: 32
  };

  const layoutClasses = {
    horizontal: 'flex items-center space-x-2',
    vertical: 'flex flex-col items-center space-y-1'
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      <Monitor 
        size={iconSizes[size]} 
        className="text-indigo-600 dark:text-indigo-400" 
      />
      <div className={`font-bold text-indigo-600 dark:text-indigo-400 ${sizeClasses[size]}`}>
        RemoteWork
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Management System
      </div>
    </div>
  );
};

export default Logo; 