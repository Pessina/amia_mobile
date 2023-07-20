import { SafeArea } from '../../components/Containers/SafeArea';
import { PatientMainContainer } from './components/PatientScreenMainContainer';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon/Icon';
import { RootStackParamList, StackNavigation } from '../../routes';
import { useGetPatient } from '../../api/patient';
import { Text } from '../../components/Text/Text';
import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { styles } from '../../styles/styles';
import { MicrophoneBottomSheet } from './components/MicrophoneBottomSheet';

interface PatientScreenProps {
  route: RouteProp<RootStackParamList, 'Patient'>;
}

export const PatientScreen: React.FC<PatientScreenProps> = ({ route }) => {
  const { patientId } = route.params;
  const navigate = useNavigation<StackNavigation>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation('', { keyPrefix: 'screen.patient' });
  const [audioText, setAudioText] = useState<string | undefined>(undefined);

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
        <ScrollView contentContainerStyle={styles.full}>
          {audioText && <Text>{audioText}</Text>}
        </ScrollView>
        <Button
          alignment="flex-end"
          left={
            <Icon
              name="ri-add-line"
              colorCode="light"
            />
          }
          title={t('newVisit')}
          onPress={() => setIsModalVisible(true)}
        />
        <MicrophoneBottomSheet
          patientName={patientQuery.data?.data.name}
          title={t('newVisit')}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          onProcessAudioSuccess={(text) => {
            setAudioText(text);
          }}
        />
      </PatientMainContainer>
    </SafeArea>
  );
};
