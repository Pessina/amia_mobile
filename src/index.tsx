import React from 'react';
import 'intl-pluralrules';
import './api/axios.config';

import './assets/translations/i18n.config';

import { StyledComponentsThemeProvider } from './providers/StyledComponentsThemeProvider';
import { Routes } from './routes';
import { AppQueryClientProvider } from './providers/QueryClientProvider';

const App = (): JSX.Element => {
  return (
    <StyledComponentsThemeProvider>
      <AppQueryClientProvider>
        <Routes />
      </AppQueryClientProvider>
    </StyledComponentsThemeProvider>
  );
};

export default App;
