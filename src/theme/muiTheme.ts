import { createTheme, alpha } from '@mui/material/styles';

// Glassmorphism color palette matching our design system
const colors = {
  background: { h: 230, s: 35, l: 7 },
  foreground: { h: 210, s: 40, l: 98 },
  primary: { h: 199, s: 89, l: 48 },
  secondary: { h: 270, s: 50, l: 40 },
  accent: { h: 330, s: 80, l: 60 },
  muted: { h: 230, s: 25, l: 20 },
  mutedForeground: { h: 215, s: 20, l: 65 },
  success: { h: 142, s: 70, l: 45 },
  destructive: { h: 0, s: 72, l: 51 },
  border: { h: 230, s: 20, l: 30 },
  card: { h: 230, s: 30, l: 15 },
};

const hsl = (color: { h: number; s: number; l: number }) =>
  `hsl(${color.h}, ${color.s}%, ${color.l}%)`;

const hsla = (color: { h: number; s: number; l: number }, a: number) =>
  `hsla(${color.h}, ${color.s}%, ${color.l}%, ${a})`;

export const glassTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: hsl(colors.primary),
      contrastText: hsl(colors.background),
    },
    secondary: {
      main: hsl(colors.secondary),
      contrastText: hsl(colors.foreground),
    },
    error: {
      main: hsl(colors.destructive),
    },
    success: {
      main: hsl(colors.success),
    },
    background: {
      default: hsl(colors.background),
      paper: hsla(colors.card, 0.6),
    },
    text: {
      primary: hsl(colors.foreground),
      secondary: hsl(colors.mutedForeground),
    },
    divider: hsla(colors.foreground, 0.1),
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `linear-gradient(135deg, ${hsl(colors.background)} 0%, hsl(250, 40%, 12%) 50%, hsl(230, 35%, 10%) 100%)`,
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9375rem',
        },
        contained: {
          background: `linear-gradient(135deg, ${hsl(colors.primary)} 0%, ${hsl(colors.secondary)} 100%)`,
          boxShadow: `0 4px 20px ${hsla(colors.primary, 0.4)}`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 30px ${hsla(colors.primary, 0.5)}`,
          },
        },
        outlined: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.25)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: hsl(colors.primary),
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        filled: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(30, 30, 50, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(14, 165, 233, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(14, 165, 233, 0.3)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(30, 30, 50, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 8,
        },
      },
    },
  },
});

// CSS variables for gradients and effects (to use with sx prop)
export const glassStyles = {
  gradientText: {
    background: `linear-gradient(135deg, ${hsl(colors.primary)} 0%, ${hsl(colors.accent)} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    borderRadius: 2,
  },
  glassCardHover: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    },
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  gradientButton: {
    background: `linear-gradient(135deg, ${hsl(colors.primary)} 0%, ${hsl(colors.secondary)} 100%)`,
    boxShadow: `0 4px 20px ${hsla(colors.primary, 0.4)}`,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 30px ${hsla(colors.primary, 0.5)}`,
    },
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  orbPrimary: {
    background: hsla(colors.primary, 0.4),
  },
  orbSecondary: {
    background: hsla(colors.secondary, 0.4),
  },
  orbAccent: {
    background: hsla(colors.accent, 0.3),
  },
};

export default glassTheme;
