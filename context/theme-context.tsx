"use client";

import React, { createContext, useContext } from 'react';

interface ThemeColors {
  primary: string;
  accent: string;
  mid: string;
  light: string;
  sectionBg: string;
}

const INSTITUTIONAL_COLORS: ThemeColors = {
  primary: '#2A6B4F',
  accent: '#C8963C',
  mid: '#1A1F2E',
  light: '#F5F0E8',
  sectionBg: '#0F1724',
};

interface ThemeContextType {
  theme: string;
  setTheme: (theme: any) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{
      theme: 'institutional',
      setTheme: () => {},
      colors: INSTITUTIONAL_COLORS
    }}>
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
