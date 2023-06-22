// @ts-nocheck

import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native';

export const LoginScreen = (): JSX.Element => {
  const { navigate } = useNavigation();

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
