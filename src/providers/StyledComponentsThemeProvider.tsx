import { ThemeProvider } from 'styled-components';

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
    body: number;
    subheading: number;
    heading: number;
  };
  lineHeights: {
    body: number;
    heading: number;
  };
  fontWeights: {
    regular: number;
    medium: number;
    semiBold: number;
    bold: number;
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
    body: 14,
    subheading: 16,
    heading: 20,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50px',
  },

  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints: ['40em', '52em', '64em'],
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const StyledComponentsThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
