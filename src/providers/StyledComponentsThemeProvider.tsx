import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: {
      light: '#8fe7e2',
      DEFAULT: '#30cfc0',
      dark: '#23a3a0',
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
  },
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const StyledComponentsThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
