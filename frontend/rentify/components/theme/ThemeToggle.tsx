'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, actualTheme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleThemeChange('light')}
        className={`p-2 rounded-lg transition-colors ${
          theme === 'light'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
        title="Light mode"
      >
        ☀️
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        className={`p-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
        title="Dark mode"
      >
        🌙
      </button>

      <button
        onClick={() => handleThemeChange('system')}
        className={`p-2 rounded-lg transition-colors ${
          theme === 'system'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
        title="Follow system"
      >
        💻
      </button>
    </div>
  );
}
