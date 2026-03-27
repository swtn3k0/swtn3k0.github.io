import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings } from '../types';

interface SettingsContextType {
  settings: AppSettings;
  toggleTheme: () => void;
  toggleEffects: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('celestial-settings');
    return saved ? JSON.parse(saved) : { theme: 'dark', effectsEnabled: true };
  });

  useEffect(() => {
    localStorage.setItem('celestial-settings', JSON.stringify(settings));
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const toggleEffects = () => {
    setSettings(prev => ({ ...prev, effectsEnabled: !prev.effectsEnabled }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleTheme, toggleEffects }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
