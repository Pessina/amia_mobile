import { NavigationContainer } from '@react-navigation/native';

type NavigationProviderProps = {
  children: React.ReactNode;
};

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};
