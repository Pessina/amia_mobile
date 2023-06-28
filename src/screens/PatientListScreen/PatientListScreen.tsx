import { View } from 'react-native';
import { Text } from '../../components/Text/Text';
import { Button } from '../../components/Button/Button';
import { logout } from '../../auth/logout';
import { SafeArea } from '../../components/Containers/SafeArea';

export const PatientListScreen: React.FC = () => {
  return (
    <SafeArea>
      <View style={{ padding: 10 }}>
        <Text size="3xl">Patient List</Text>
        <Button
          onPress={() => {
            logout();
            console.log('User logged out successfully.');
          }}
          title="Logout"
        />
      </View>
    </SafeArea>
  );
};
