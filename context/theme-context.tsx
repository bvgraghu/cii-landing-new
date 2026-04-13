"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'midnight' | 'forest' | 'carbon';

interface ThemeColors {
  primary: string;
  accent: string;
  mid: string;
  light: string;
  sectionBg: string;
}

const themePalettes: Record<ThemeType, ThemeColors> = {
  midnight: {
    primary: "#6366f1", // Indigo 500
    accent: "#818cf8",  // Indigo 400 (lighter for readability)
    mid: "#1e1b4b",     // Indigo 950
    light: "#334155",   // Slate 700 (for secondary text)
    sectionBg: "#0c0d1e", // Deep Navy Black
  },
  forest: {
    primary: "#10b981", // Emerald 500
    accent: "#34d399",  // Emerald 400
    mid: "#064e3b",     // Green 950
    light: "#065f46",   // Green 800
    sectionBg: "#022c22", // Very dark forest green
  },
  carbon: {
    primary: "#ffffff", // High contrast white
    accent: "#10b981",  // Emerald 500 accent
    mid: "#27272a",     // Zinc 800
    light: "#52525b",   // Zinc 600
    sectionBg: "#09090b", // Absolute dark
  }
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('midnight');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as ThemeType;
    if (savedTheme && themePalettes[savedTheme]) {
      setThemeState(savedTheme);
      document.body.className = `min-h-full flex flex-col theme-${savedTheme}`;
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.body.className = `min-h-full flex flex-col theme-${newTheme}`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themePalettes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}
