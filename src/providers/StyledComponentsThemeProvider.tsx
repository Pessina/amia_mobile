import { ThemeProvider } from 'styled-components';
import { generateArray } from '../utils/array';

export type FontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

interface Color {
  light: string;
  DEFAULT: string;
  dark: string;
}

export interface Theme {
  colors: {
    primary: Color;
    secondary: Color;
    background: Color;
    text: Color;
    error: string;
    warning: string;
    success: string;
    overlay: string;
    transparent: string;
    white: string;
  };
  fontSizes: {
    [key in FontSize]: number;
  };
  lineHeights: {
    [key in FontSize]: number;
  };
  fontWeights: {
    [key in FontWeight]: number;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  space: number[];
  zIndex: number[];
  breakpoints: string[];
}

const theme: Theme = {
  colors: {
    primary: {
      light: '#8fe7e2',
      DEFAULT: '#30cfc0',
      dark: '#23a3a0',
    },
    secondary: {
      light: '#FFFFFF',
      DEFAULT: '#C0C0C0',
      dark: '#808080',
    },
    background: {
      light: '#ffffff',
      DEFAULT: '#f8f8f8',
      dark: '#e1e5e9',
    },
    text: {
      light: '#767676',
      DEFAULT: '#4a4a4a',
      dark: '#1a1a1a',
    },
    error: '#FF0000',
    warning: '#FFA500',
    success: '#008000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    transparent: 'rgba(0, 0, 0, 0)',
    white: '#FFFFFF',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50px',
  },
  // TODO: Replace with lodash
  space: generateArray(30, 4, 0),
  zIndex: generateArray(30, 1, 1),
  breakpoints: ['40em', '52em', '64em'],
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const StyledComponentsThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
