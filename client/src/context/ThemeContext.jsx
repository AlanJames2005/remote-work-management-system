import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const defaultTheme = {
  primary: 'blue',
  secondary: 'indigo',
  accent: 'purple',
  fontSize: 'medium',
  spacing: 'comfortable',
  borderRadius: 'medium',
  animationSpeed: 'normal'
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [themeSettings, setThemeSettings] = useState(() => {
    const savedSettings = localStorage.getItem('themeSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultTheme;
  });

  const [layoutSettings, setLayoutSettings] = useState(() => {
    const savedLayout = localStorage.getItem('layoutSettings');
    return savedLayout ? JSON.parse(savedLayout) : {
      sidebarPosition: 'left',
      sidebarCollapsed: false,
      headerFixed: true,
      contentWidth: 'full'
    };
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
    // Apply theme settings to CSS variables
    Object.entries(themeSettings).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--theme-${key}`, value);
    });
  }, [themeSettings]);

  useEffect(() => {
    localStorage.setItem('layoutSettings', JSON.stringify(layoutSettings));
  }, [layoutSettings]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateThemeSettings = (newSettings) => {
    setThemeSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateLayoutSettings = (newSettings) => {
    setLayoutSettings(prev => ({ ...prev, ...newSettings }));
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    themeSettings,
    updateThemeSettings,
    layoutSettings,
    updateLayoutSettings
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 