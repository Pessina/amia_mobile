import React from 'react';
import 'intl-pluralrules';

import './assets/translations/i18n.config';

import { StyledComponentsThemeProvider } from './providers/StyledComponentsThemeProvider';
import { Routes } from './routes';

const App = (): JSX.Element => {
  return (
    <StyledComponentsThemeProvider>
      <Routes />
    </StyledComponentsThemeProvider>
  );
};

export default App;
