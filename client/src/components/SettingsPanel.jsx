import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    themeSettings, 
    updateThemeSettings,
    layoutSettings,
    updateLayoutSettings 
  } = useTheme();

  if (!isOpen) return null;

  const colorOptions = ['blue', 'indigo', 'purple', 'green', 'red', 'yellow'];
  const sizeOptions = ['small', 'medium', 'large'];
  const spacingOptions = ['compact', 'comfortable', 'spacious'];
  const positionOptions = ['left', 'right'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Theme Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Color
                </label>
                <select
                  value={themeSettings.primary}
                  onChange={(e) => updateThemeSettings({ primary: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <select
                  value={themeSettings.fontSize}
                  onChange={(e) => updateThemeSettings({ fontSize: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Layout Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Layout Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sidebar Position
                </label>
                <select
                  value={layoutSettings.sidebarPosition}
                  onChange={(e) => updateLayoutSettings({ sidebarPosition: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {positionOptions.map((position) => (
                    <option key={position} value={position}>
                      {position.charAt(0).toUpperCase() + position.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Fixed Header</span>
                <button
                  onClick={() => updateLayoutSettings({ headerFixed: !layoutSettings.headerFixed })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    layoutSettings.headerFixed ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      layoutSettings.headerFixed ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Width
                </label>
                <select
                  value={layoutSettings.contentWidth}
                  onChange={(e) => updateLayoutSettings({ contentWidth: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="full">Full Width</option>
                  <option value="contained">Contained</option>
                  <option value="narrow">Narrow</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 