import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { RegisterScreen } from '../screens/RegisterScreen/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { PatientListScreen } from '../screens/PatientListScreen/PatientListScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  PatientList: undefined;
};
export type StackNavigation = StackNavigationProp<RootStackParamList>;

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientList"
        component={PatientListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
