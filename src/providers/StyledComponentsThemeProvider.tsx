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

export const fontWeightMap: Record<FontWeight, number> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

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
  };
  fontSizes: {
    [key in FontSize]: number;
  };
  lineHeights: {
    body: number;
    heading: number;
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
    body: 1.5,
    heading: 1.125,
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
  space: generateArray(30, 4, 0),
  breakpoints: ['40em', '52em', '64em'],
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const StyledComponentsThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
