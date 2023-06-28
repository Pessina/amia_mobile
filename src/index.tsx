import React from 'react';
import 'intl-pluralrules';
import './api/axios.config';

import './assets/translations/i18n.config';

import { StyledComponentsThemeProvider } from './providers/StyledComponentsThemeProvider';
import { Routes } from './routes';
import { AppQueryClientProvider } from './providers/QueryClientProvider';
import { AuthProvider } from './providers/AuthProvider';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <StyledComponentsThemeProvider>
        <AppQueryClientProvider>
          <Routes />
        </AppQueryClientProvider>
      </StyledComponentsThemeProvider>
    </AuthProvider>
  );
};

export default App;
