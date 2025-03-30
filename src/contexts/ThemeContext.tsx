
import React from 'react';

// This is now just a simple wrapper with no theme functionality
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// This is a stub that returns default values and does nothing
export const useTheme = () => {
  return {
    theme: 'light',
    toggleTheme: () => {}
  };
};
