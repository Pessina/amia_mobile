import styled from 'styled-components/native';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from '../../../utils/time';
import { useAudioRecording } from '../hooks/useAudioRecording';
import { Text } from '../../../components/Text/Text';
import { Button } from '../../../components/Button/Button';
import { createAudioFileFormData, useProcessAudio } from '../../../api/visit';
import { RecordButton } from './RecordButton';
import { AuthContext } from '../../../providers/AuthProvider';

const MicrophoneContainer = styled.View`
  flex: 1;
  padding-top: ${({ theme }) => theme.space[8]}px;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
`;

const Content = styled.View`
  flex: 1;
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
  const [hasFinished, setHasFinished] = useState(false);
  const processAudio = useProcessAudio();
  const user = useContext(AuthContext);

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

  const onClose = () => {
    if (isRecording) {
      stopRecording();
    }
    setIsLoading(false);
    setHasFinished(false);
    onRequestClose();
  };

  return (
    <BottomSheet
      title={title}
      visible={visible}
      onRequestClose={onClose}
    >
      <Content>
        <MicrophoneContainer>
          {hasFinished ? (
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
          <Button
            isLoading={isLoading}
            title={t('finishVisit')}
            buttonStyle="outlined"
            onPress={async () => {
              setIsLoading(true);
              setHasFinished(true);
              const uri = await stopRecording();
              // TODO: Implement re-try mechanism in case of failure
              processAudio.mutate(createAudioFileFormData(uri), {
                onSuccess: (res) => {
                  onProcessAudioSuccess(res.data);
                },
                onSettled: () => {
                  setIsLoading(false);
                },
              });
            }}
          />
        </MicrophoneContainer>
      </Content>
    </BottomSheet>
  );
};
