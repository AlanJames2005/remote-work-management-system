import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SettingsPanel from './SettingsPanel';

const Layout = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { layoutSettings } = useTheme();

  const contentWidthClasses = {
    full: 'max-w-full',
    contained: 'max-w-7xl',
    narrow: 'max-w-4xl'
  };

  return (
    <div className={`min-h-screen ${layoutSettings.sidebarPosition === 'right' ? 'flex flex-row-reverse' : 'flex flex-row'}`}>
      {/* Sidebar */}
      <aside className={`w-64 bg-white dark:bg-gray-800 shadow-lg ${layoutSettings.sidebarPosition === 'right' ? 'order-2' : 'order-1'}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Work Manager</h2>
          <nav className="mt-4 space-y-2">
            <a href="/tasks" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Tasks
            </a>
            <a href="/time" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Time Tracking
            </a>
            <a href="/chat" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Team Chat
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${layoutSettings.sidebarPosition === 'right' ? 'order-1' : 'order-2'}`}>
        {/* Header */}
        <header className={`bg-white dark:bg-gray-800 shadow-lg ${layoutSettings.headerFixed ? 'fixed top-0 w-full z-10' : ''}`}>
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543.94 1.543 2.58 0 3.52a1.724 1.724 0 00-1.066 2.573c.94 1.543.94 2.58 0 3.52a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543-.94-1.543-2.58 0-3.52a1.724 1.724 0 001.066-2.573c-.94-1.543-.94-2.58 0-3.52a1.724 1.724 0 012.573-1.066z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className={`mx-auto px-4 py-6 ${contentWidthClasses[layoutSettings.contentWidth]} ${layoutSettings.headerFixed ? 'mt-16' : ''}`}>
          {children}
        </div>
      </main>

      {/* Settings Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Layout; 