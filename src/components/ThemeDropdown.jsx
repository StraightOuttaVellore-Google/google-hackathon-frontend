import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, Sun, Moon, Square } from 'lucide-react';

const ThemeDropdown = () => {
  const { theme, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, description: 'Light mode' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Dark mode with stars' },
    { id: 'black', name: 'Black', icon: Square, description: 'Pure black mode' }
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[1];
  const Icon = currentTheme.icon;

  const handleThemeChange = (themeId) => {
    setThemeMode(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neumorphic-dropdown-button flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2"
      >
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="neumorphic-dropdown-options-scrollable neumorphic-scrollbar absolute top-full left-0 right-0 mt-2 z-50">
          {themes.map((themeOption) => {
            const ThemeIcon = themeOption.icon;
            return (
              <button
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`neumorphic-dropdown-option flex items-center gap-3 w-full ${
                  theme === themeOption.id ? 'bg-white/10' : ''
                }`}
              >
                <ThemeIcon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">{themeOption.name}</div>
                  <div className="text-xs opacity-70">{themeOption.description}</div>
                </div>
                {theme === themeOption.id && (
                  <div className="ml-auto w-2 h-2 bg-current rounded-full opacity-70"></div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
