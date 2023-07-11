// components/Microphone.tsx
import React, { useMemo } from 'react';
import { useAudioRecording } from '../hooks/useAudioRecording';
import styled from 'styled-components/native';
import { Icon } from '../../../components/Icon/Icon';
import { formatTime } from '../../../utils/time';
import { Text } from '../../../components/Text/Text';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button/Button';

const MicrophoneButton = styled.TouchableOpacity<{ isRecording: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isRecording }) => (isRecording ? 'black' : 'blue')};
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
`;

const MicrophoneContainer = styled.View`
  flex: 1;
  padding-top: ${({ theme }) => theme.space[8]}px;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]}px;
`;

export type MicrophoneProps = {
  onStopRecording: (uri: string) => Promise<void>;
};

export const Microphone: React.FC<MicrophoneProps> = ({ onStopRecording }) => {
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

  return (
    <MicrophoneContainer>
      <Text
        fontWeight="bold"
        size="xl"
      >
        {formatTime(recordingTime)}
      </Text>
      <MicrophoneButton
        isRecording={isRecording}
        onPress={buttonAction}
      >
        <IconContainer pointerEvents="none">
          {isRecording ? (
            <Icon
              name="ri-pause-line"
              colorCode="light"
              size={40}
            />
          ) : (
            <Icon
              name="ri-mic-fill"
              colorCode="light"
              size={40}
            />
          )}
        </IconContainer>
      </MicrophoneButton>
      <Text
        fontWeight="medium"
        size="sm"
      >
        {buttonLabel}
      </Text>
      {hasStartedRecording && (
        <Button
          title={t('finishVisit')}
          buttonStyle="outlined"
          onPress={async () => onStopRecording(await stopRecording())}
        />
      )}
    </MicrophoneContainer>
  );
};
