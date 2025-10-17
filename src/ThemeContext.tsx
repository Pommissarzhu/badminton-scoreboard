import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';
import { PaletteMode } from '@mui/material';

type ThemeSetting = 'system' | 'light' | 'dark';

export const ThemeContext = createContext({
  setThemeMode: (setting: ThemeSetting) => {},
});

const bsuTheme = {
  primary: {
    main: '#BE1619',
    contrastText: '#fff',
  },
  secondary: {
    main: '#f44336',
    contrastText: '#fff',
  },
  tertiary: {
    main: '#005bac',
    contrastText: '#fff',
  },
  accent: {
    main: '#ffc107',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
  text: {
    primary: '#212121',
  },
};

const bsuDarkTheme = {
  primary: {
    main: '#BE1619',
    contrastText: '#fff',
  },
  secondary: {
    main: '#f3d4a0',
    contrastText: '#333',
  },
  tertiary: {
    main: '#005bac',
    contrastText: '#fff',
  },
  accent: {
    main: '#ffc107',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#fff',
  },
};

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeSetting, setThemeSetting] = useState<ThemeSetting>('system');
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    if (themeSetting === 'system') {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode, themeSetting]);

  const setThemeMode = (setting: ThemeSetting) => {
    setThemeSetting(setting);
    if (setting === 'system') {
      setMode(prefersDarkMode ? 'dark' : 'light');
    } else {
      setMode(setting);
    }
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? bsuTheme : bsuDarkTheme),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ setThemeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};