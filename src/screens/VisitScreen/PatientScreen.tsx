import { SafeArea } from '../../components/Containers/SafeArea';
import { PatientMainContainer } from './components/PatientScreenMainContainer';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon/Icon';
import { RootStackParamList, StackNavigation } from '../../routes';
import { useGetPatient } from '../../api/patient';
import { Text } from '../../components/Text/Text';
import { View } from 'react-native';
import { MicrophoneModal } from './components/MicrophoneModal';
import { useState } from 'react';

interface PatientScreenProps {
  route: RouteProp<RootStackParamList, 'Patient'>;
}

export const PatientScreen: React.FC<PatientScreenProps> = ({ route }) => {
  const { patientId } = route.params;
  const navigate = useNavigation<StackNavigation>();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const patientQuery = useGetPatient(patientId);

  return (
    <SafeArea>
      <PatientMainContainer>
        <View>
          <Icon
            name="arrow-left-s-line"
            onPress={() => navigate.navigate('PatientList')}
          />
          <Text size="3xl">{patientQuery.data?.data.name}</Text>
        </View>
        <MicrophoneModal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        />
      </PatientMainContainer>
    </SafeArea>
  );
};
