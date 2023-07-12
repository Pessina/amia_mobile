import React from 'react';
import 'intl-pluralrules';
import './api/axios.config';

import './assets/translations/i18n.config';

import { StyledComponentsThemeProvider } from './providers/StyledComponentsThemeProvider';
import { Routes } from './routes';
import { AppQueryClientProvider } from './providers/QueryClientProvider';
import { AuthProvider } from './providers/AuthProvider';
import { NavigationProvider } from './providers/NavigationProvider';
import { StatusBar } from 'react-native';

const App = (): JSX.Element => {
  return (
    <NavigationProvider>
      <AppQueryClientProvider>
        <AuthProvider>
          <StyledComponentsThemeProvider>
            <StatusBar barStyle="dark-content" />
            <Routes />
          </StyledComponentsThemeProvider>
        </AuthProvider>
      </AppQueryClientProvider>
    </NavigationProvider>
  );
};

export default App;
