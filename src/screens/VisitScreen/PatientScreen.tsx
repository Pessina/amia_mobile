import { SafeArea } from '../../components/Containers/SafeArea';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon/Icon';
import { RootStackParamList, StackNavigation } from '../../routes';
import { useGetPatient } from '../../api/patient';
import { Text } from '../../components/Text/Text';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button';
import { VisitBottomSheet } from './components/VisitBottomSheet';
import { useCreateVisit, useGetAllVisitsForPatient } from '../../api/visit';
import { VisitList } from './components/VisitList';
import FlexContainer from '../../components/FlexContainer/FlexContainer';

interface PatientScreenProps {
  route: RouteProp<RootStackParamList, 'Patient'>;
}

export const PatientScreen: React.FC<PatientScreenProps> = ({ route }) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patient' });
  const { patientId } = route.params;
  const navigate = useNavigation<StackNavigation>();
  const [isVisitBottomSheetOpen, setIsMicrophoneBottomVisible] = useState(false);
  const patientQuery = useGetPatient(patientId);
  const visitsQuery = useGetAllVisitsForPatient(patientId);
  const createVisitMutation = useCreateVisit();

  return (
    <SafeArea>
      <FlexContainer
        gap={8}
        padding={4}
      >
        <FlexContainer
          gap={5}
          grow={0}
        >
          <Icon
            name="arrow-left-s-line"
            onPress={() => navigate.navigate('PatientList')}
          />
          <Text
            size="4xl"
            fontWeight="bold"
          >
            {patientQuery.data?.data.name}
          </Text>
        </FlexContainer>
        <VisitList visits={visitsQuery.data?.data ?? []} />
        <Button
          alignment="flex-end"
          left={
            <Icon
              name="ri-add-line"
              colorCode="white"
            />
          }
          title={t('newVisit')}
          onPress={() => setIsMicrophoneBottomVisible(true)}
        />
        <VisitBottomSheet
          visible={isVisitBottomSheetOpen}
          onRequestClose={() => setIsMicrophoneBottomVisible(false)}
          onProcessAudioSuccess={() => {
            createVisitMutation.mutate({ patientId, timestamp: new Date().toISOString() });
          }}
        />
      </FlexContainer>
    </SafeArea>
  );
};
