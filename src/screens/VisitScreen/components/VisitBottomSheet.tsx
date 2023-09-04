import styled from 'styled-components/native';
import RNFS from 'react-native-fs';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../../../utils/time';
import { useAudioRecording } from '../hooks/useAudioRecording';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';
import { ProcessVisitRecordingResponse, useProcessVisitRecording } from '../../../api/visit';
import { RecordButton } from './RecordButton';
import { AuthContext } from '../../../providers/AuthProvider';
import { Icon } from '../../../components/Icon/Icon';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes';
import { ConfirmStopRecordingModal } from './ConfirmStopRecordingModal';
import Card from '../../../components/Card/Card';
import Spacing from '../../../components/Spacing/Spacing';
import { FlatList } from 'react-native';

const ItemSeparatorComponent = () => <Spacing size={4} />;

const TopicCardContainer = styled.View`
  gap: ${({ theme }) => theme.space[2]}px;
`;

const TopicCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <TopicCardContainer>
    <Text
      fontWeight="bold"
      size="lg"
    >
      {title}
    </Text>
    <Card bgColor="dark">
      <Text>{content}</Text>
    </Card>
  </TopicCardContainer>
);

const MedicalRecordContainer = styled.View`
  padding-bottom: ${({ theme }) => theme.space[16]}px;
`;

const MicrophoneContainer = styled.View<{ isRecordMode?: boolean }>`
  padding: ${({ theme }) => theme.space[4]}px;
  align-items: center;
  ${({ isRecordMode }) => (isRecordMode ? 'height: 340px' : '')};
  gap: ${({ theme }) => theme.space[8]}px;
`;

const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

export type VisitBottomSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
  onProcessAudioSuccess: (data: ProcessVisitRecordingResponse) => void;
};

export const VisitBottomSheet: React.FC<VisitBottomSheetProps> = ({
  visible,
  onRequestClose,
  onProcessAudioSuccess,
}) => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    recordingTime,
    pauseRecording,
    resumeRecording,
    hasStartedRecording,
  } = useAudioRecording();
  const { t } = useTranslation('', { keyPrefix: 'screen.patient' });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fileUri, setFileUri] = useState<string | undefined>(undefined);
  const [isConfirmStopRecordingModalVisible, setIsConfirmStopRecordingModalVisible] =
    useState(false);
  const processVisitRecording = useProcessVisitRecording();
  const user = useContext(AuthContext);
  const route = useRoute<RouteProp<RootStackParamList, 'Patient'>>();
  const { patientId } = route.params;
  const [audioProcessedData, setAudioProcessedData] = useState<
    ProcessVisitRecordingResponse | undefined
  >(undefined);

  const { recordButtonAction, recordButtonLabel } = useMemo(() => {
    if (hasStartedRecording) {
      if (isRecording) {
        return {
          recordButtonAction: pauseRecording,
          recordButtonLabel: t('pauseRecord'),
        };
      } else {
        return {
          recordButtonAction: resumeRecording,
          recordButtonLabel: t('resumeRecord'),
        };
      }
    } else {
      return {
        recordButtonAction: startRecording,
        recordButtonLabel: t('startRecord'),
      };
    }
  }, [hasStartedRecording, isRecording, pauseRecording, resumeRecording, startRecording, t]);

  const onClose = useCallback(() => {
    if (isRecording) {
      stopRecording();
    }
    setAudioProcessedData(undefined);
    setIsLoading(false);
    setHasError(false);
    setFileUri(undefined);
    onRequestClose();
  }, [isRecording, onRequestClose, stopRecording]);

  useEffect(() => {
    setAudioProcessedData(undefined);
  }, [visible]);

  // TODO: Improve error handling, if the file can't be processed allow the user to download it
  const onProcessVisitRecording = useCallback(
    (uri: string) => {
      processVisitRecording.mutate(
        {
          patientId,
          timestamp: new Date().toISOString(),
          // TODO: Consider including the timezone on all requests or set as a user property
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          fileUri: uri,
        },
        {
          onSuccess: (res) => {
            onProcessAudioSuccess(res);
            setAudioProcessedData(res);
            RNFS.unlink(uri);
          },
          onSettled: () => {
            setIsLoading(false);
          },
          onError: () => {
            setHasError(true);
          },
        }
      );
    },
    [onProcessAudioSuccess, patientId, processVisitRecording]
  );

  const { ctaButtonAction, ctaButtonLabel } = useMemo(() => {
    if (isLoading) {
      return {
        ctaButtonAction: undefined,
        ctaButtonLabel: t('loading'),
      };
    } else if (hasError && fileUri) {
      return {
        ctaButtonAction: () => {
          setIsLoading(true);
          onProcessVisitRecording(fileUri);
        },
        ctaButtonLabel: t('retry'),
      };
    } else {
      return {
        ctaButtonAction: () => {
          setIsConfirmStopRecordingModalVisible(true);
        },
        ctaButtonLabel: t('finishVisit'),
      };
    }
  }, [fileUri, hasError, isLoading, onProcessVisitRecording, t]);

  const isResultsVisible =
    audioProcessedData && !hasStartedRecording && !processVisitRecording.isLoading;

  return (
    <BottomSheet
      title={isResultsVisible ? t('medicalRecordBottomSheet.title') : t('newVisit')}
      visible={visible}
      onRequestClose={hasStartedRecording ? undefined : onClose}
    >
      <Content>
        {isResultsVisible ? (
          <MedicalRecordContainer>
            <FlatList
              data={[...audioProcessedData?.medicalRecord.topics]}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <TopicCard
                  title={item.title}
                  content={item.content}
                />
              )}
              ItemSeparatorComponent={ItemSeparatorComponent}
            />
          </MedicalRecordContainer>
        ) : (
          <MicrophoneContainer isRecordMode={!fileUri}>
            {fileUri ? (
              <>
                <Text textAlign="center">{t('processingMessage')}</Text>
                <Text fontWeight="bold">{user.user?.email}</Text>
              </>
            ) : (
              <>
                <Text
                  fontWeight="bold"
                  size="xl"
                >
                  {formatTime(recordingTime)}
                </Text>
                <RecordButton
                  onPress={recordButtonAction}
                  isRecording={isRecording}
                />
                <Text
                  fontWeight="medium"
                  size="sm"
                >
                  {recordButtonLabel}
                </Text>
              </>
            )}
            {(hasStartedRecording || isLoading || hasError) && (
              <Button
                isLoading={isLoading}
                left={hasError && <Icon name="ri-error-warning-fill" />}
                title={ctaButtonLabel}
                buttonStyle="outlined"
                onPress={ctaButtonAction}
              />
            )}
          </MicrophoneContainer>
        )}
      </Content>
      <ConfirmStopRecordingModal
        visible={isConfirmStopRecordingModalVisible}
        onConfirm={async () => {
          setAudioProcessedData(undefined);
          setIsLoading(true);
          const uri = await stopRecording();
          setFileUri(uri);
          onProcessVisitRecording(uri);
        }}
        onRequestClose={() => setIsConfirmStopRecordingModalVisible(false)}
      />
    </BottomSheet>
  );
};
