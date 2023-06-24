import React from 'react';
import 'intl-pluralrules';

import './assets/translations/i18n.config';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyledComponentsThemeProvider } from './providers/StyledComponentsThemeProvider';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const App = (): JSX.Element => {
  return (
    <StyledComponentsThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StyledComponentsThemeProvider>
  );
};

export default App;
