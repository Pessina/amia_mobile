import styled from 'styled-components/native';
import RNFS from 'react-native-fs';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../../../utils/time';
import { useAudioRecording } from '../hooks/useAudioRecording';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';
import { createAudioFileFormData, useProcessVisitRecording } from '../../../api/visit';
import { RecordButton } from './RecordButton';
import { AuthContext } from '../../../providers/AuthProvider';
import { Icon } from '../../../components/Icon/Icon';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes';

const MicrophoneContainer = styled.View`
  padding-top: ${({ theme }) => theme.space[8]}px;
  justify-content: flex-start;
  align-items: center;
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
  onProcessAudioSuccess: (text: string) => void;
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
  const processVisitRecording = useProcessVisitRecording();
  const user = useContext(AuthContext);
  const route = useRoute<RouteProp<RootStackParamList, 'Patient'>>();
  const { patientId } = route.params;

  const { buttonAction, buttonLabel } = useMemo(() => {
    if (hasStartedRecording) {
      if (isRecording) {
        return {
          buttonAction: pauseRecording,
          buttonLabel: t('pauseRecord'),
        };
      } else {
        return {
          buttonAction: resumeRecording,
          buttonLabel: t('resumeRecord'),
        };
      }
    } else {
      return {
        buttonAction: startRecording,
        buttonLabel: t('startRecord'),
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
      formData.append('requestTimestamp', new Date().toISOString());
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

  const onPressCTA = useCallback(async () => {
    setIsLoading(true);
    const uri = fileUri ?? (await stopRecording());
    setFileUri(uri);
    onProcessVisitRecording(uri);
  }, [fileUri, onProcessVisitRecording, stopRecording]);

  return (
    <BottomSheet
      title={title}
      visible={visible}
      onRequestClose={onClose}
    >
      <Content>
        <MicrophoneContainer>
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
                onPress={buttonAction}
                isRecording={isRecording}
              />
              <Text
                fontWeight="medium"
                size="sm"
              >
                {buttonLabel}
              </Text>
            </>
          )}
          {(hasStartedRecording || isLoading || hasError) && (
            <Button
              isLoading={isLoading}
              left={hasError && <Icon name="ri-error-warning-fill" />}
              title={isLoading ? t('loading') : hasError ? t('retry') : t('finishVisit')}
              buttonStyle="outlined"
              onPress={onPressCTA}
            />
          )}
        </MicrophoneContainer>
      </Content>
    </BottomSheet>
  );
};
