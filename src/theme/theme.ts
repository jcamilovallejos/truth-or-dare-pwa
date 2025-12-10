import { createTheme, Theme } from '@mui/material/styles';
import { GameMode } from '../types';
import { getColorPalette } from './colors';

// Función que crea un tema de Material-UI basado en el modo de juego
export const createGameTheme = (mode: GameMode): Theme => {
  const palette = getColorPalette(mode);
  
  // Determinar si el tema es oscuro (solo para modo HOT)
  const isDark = mode === 'hot';

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: palette.primary,
        contrastText: isDark ? '#FFFFFF' : '#000000',
      },
      secondary: {
        main: palette.secondary,
        contrastText: isDark ? '#FFFFFF' : '#000000',
      },
      background: {
        default: palette.background,
        paper: palette.surface,
      },
      text: {
        primary: palette.text,
        secondary: palette.textSecondary,
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '12px 24px',
            fontSize: '1rem',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });
};

// Tema por defecto (soft)
export const defaultTheme = createGameTheme('soft');
