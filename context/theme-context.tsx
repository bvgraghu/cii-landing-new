"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'green' | 'blue' | 'teal' | 'slate' | 'indigo' | 'forest';

interface ThemeColors {
  primary: string;
  accent: string;
  mid: string;
  light: string;
}

const themePalettes: Record<ThemeType, ThemeColors> = {
  green: {
    primary: "#10b981", // Emerald 500
    accent: "#065f46",  // Emerald 800
    mid: "#a7f3d0",     // Emerald 200
    light: "#f0fdf4",   // Emerald 50
  },
  blue: {
    primary: "#3b82f6", // Blue 500
    accent: "#1e40af",  // Blue 800
    mid: "#bfdbfe",     // Blue 200
    light: "#eff6ff",   // Blue 50
  },
  teal: {
    primary: "#14b8a6", // Teal 500
    accent: "#0f766e",  // Teal 700
    mid: "#99f6e4",     // Teal 200
    light: "#f0fdfa",   // Teal 50
  },
  slate: {
    primary: "#475569", // Slate 600
    accent: "#0f172a",  // Slate 900
    mid: "#e2e8f0",     // Slate 200
    light: "#f8faff",   // Slate 50 w/ blue tint
  },
  indigo: {
    primary: "#4f46e5", // Indigo 600
    accent: "#312e81",  // Indigo 900
    mid: "#e0e7ff",     // Indigo 100
    light: "#f5f7ff",   // Indigo 50
  },
  forest: {
    primary: "#15803d", // Green 700
    accent: "#064e3b",  // Green 950
    mid: "#bbf7d0",     // Green 200
    light: "#f0fdf4",   // Green 50
  }
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('green');

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
