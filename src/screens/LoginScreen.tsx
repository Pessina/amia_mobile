import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native';
import { RootStackParamList } from '..';
import { StackNavigationProp } from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen = (): JSX.Element => {
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <>
      <Text className="text-2xl w-full text-center text-black">Login</Text>
      <Text>Login</Text>
      <Text>Login</Text>
      <Text>Login</Text>
      <Button
        onPress={() => {
          navigate('Register');
        }}
        title="aaaa"
      />
    </>
  );
};
