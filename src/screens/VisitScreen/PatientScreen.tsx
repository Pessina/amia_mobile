import { SafeArea } from '../../components/Containers/SafeArea';
import { PatientMainContainer } from './components/PatientScreenMainContainer';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon/Icon';
import { RootStackParamList, StackNavigation } from '../../routes';
import { useGetPatient } from '../../api/patient';
import { Text } from '../../components/Text/Text';
import { View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { MicrophoneBottomSheet } from './components/MicrophoneBottomSheet';
import { MedicalRecord } from './components/MedicalRecord';
import { useCreateVisit, useGetAllVisitsForPatient } from '../../api/visit';
import { VisitList } from './components/VisitList';

interface PatientScreenProps {
  route: RouteProp<RootStackParamList, 'Patient'>;
}

export const PatientScreen: React.FC<PatientScreenProps> = ({ route }) => {
  const { patientId } = route.params;
  const navigate = useNavigation<StackNavigation>();
  const [isMicrophoneBottomSheetOpen, setIsMicrophoneBottomVisible] = useState(false);
  const [isVisitSummaryBottomSheetOpen, setIsVisitSummaryBottomVisible] = useState(false);
  const { t } = useTranslation('', { keyPrefix: 'screen.patient' });
  const [audioData, setAudioData] = useState<
    | {
        transcription: string;
        medicalRecord: {
          topics: { title: string; content: string }[];
        };
      }
    | undefined
  >(undefined);

  const patientQuery = useGetPatient(patientId);
  const visitsQuery = useGetAllVisitsForPatient(patientId);
  const createVisitMutation = useCreateVisit();

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
        <VisitList visits={visitsQuery.data?.data ?? []} />
        <Button
          alignment="flex-end"
          left={
            <Icon
              name="ri-add-line"
              colorCode="light"
            />
          }
          title={t('newVisit')}
          onPress={() => setIsMicrophoneBottomVisible(true)}
        />
        <MicrophoneBottomSheet
          title={t('newVisit')}
          visible={isMicrophoneBottomSheetOpen}
          onRequestClose={() => setIsMicrophoneBottomVisible(false)}
          onProcessAudioSuccess={(data) => {
            setAudioData(data);
            setIsVisitSummaryBottomVisible(true);
            createVisitMutation.mutate({ patientId, requestTimestamp: new Date().toISOString() });
          }}
        />
        {audioData && (
          <MedicalRecord
            visible={isVisitSummaryBottomSheetOpen}
            onRequestClose={() => setIsVisitSummaryBottomVisible(false)}
            transcription={audioData.transcription}
            medicalRecord={audioData.medicalRecord}
          />
        )}
      </PatientMainContainer>
    </SafeArea>
  );
};
