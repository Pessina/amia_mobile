import styled from 'styled-components/native';
import RNFS from 'react-native-fs';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../../../utils/time';
import { useAudioRecording } from '../hooks/useAudioRecording';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';
import {
  ProcessVisitRecordingResponse,
  createAudioFileFormData,
  useProcessVisitRecording,
} from '../../../api/visit';
import { RecordButton } from './RecordButton';
import { AuthContext } from '../../../providers/AuthProvider';
import { Icon } from '../../../components/Icon/Icon';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes';
import { ConfirmStopRecordingModal } from './ConfirmStopRecordingModal';

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

export type MicrophoneBottomSheetProps = {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
  onProcessAudioSuccess: (data: ProcessVisitRecordingResponse) => void;
};

export const MicrophoneBottomSheet: React.FC<MicrophoneBottomSheetProps> = ({
  visible,
  onRequestClose,
  title,
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
    setIsLoading(false);
    setHasError(false);
    setFileUri(undefined);
    onRequestClose();
  }, [isRecording, onRequestClose, stopRecording]);

  // TODO: Improve error handling, if the file can't be processed allow the user to download it
  const onProcessVisitRecording = useCallback(
    (uri: string) => {
      const formData = createAudioFileFormData(uri);
      formData.append('patientId', patientId ?? '');
      formData.append('timestamp', new Date().toISOString());
      // TODO: Consider including the timezone on all requests or set as a user property
      formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
      processVisitRecording.mutate(formData, {
        onSuccess: (res) => {
          onProcessAudioSuccess(res.data);
          RNFS.unlink(uri);
          onClose();
        },
        onSettled: () => {
          setIsLoading(false);
        },
        onError: () => {
          setHasError(true);
        },
      });
    },
    [onClose, onProcessAudioSuccess, patientId, processVisitRecording]
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

  return (
    <BottomSheet
      title={title}
      visible={visible}
      onRequestClose={hasStartedRecording ? undefined : onClose}
    >
      <Content>
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
      </Content>
      <ConfirmStopRecordingModal
        visible={isConfirmStopRecordingModalVisible}
        onConfirm={async () => {
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
