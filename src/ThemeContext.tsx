import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';
import { PaletteMode } from '@mui/material';
import { cyan, indigo } from '@mui/material/colors';

type ThemeSetting = 'system' | 'light' | 'dark';

export const ThemeContext = createContext({
  setThemeMode: (setting: ThemeSetting) => {},
});

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
          ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: cyan,
                background: {
                  default: cyan[50],
                  paper: cyan[100],
                },
              }
            : {
                // palette values for dark mode
                primary: indigo,
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
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