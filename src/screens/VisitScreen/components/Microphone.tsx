// components/Microphone.tsx
import React from 'react';
import { useAudioRecording } from '../hooks/useAudioRecording';
import styled from 'styled-components/native';
import { Icon } from '../../../components/Icon/Icon';
import { formatTime } from '../../../utils/time';
import { Text } from '../../../components/Text/Text';

const Button = styled.TouchableOpacity<{ isRecording: boolean }>`
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
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Microphone: React.FC = () => {
  const { isRecording, startRecording, stopRecording, recordingTime } = useAudioRecording();

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <MicrophoneContainer>
      <Text
        fontWeight="medium"
        size="lg"
      >
        {formatTime(recordingTime)}
      </Text>
      <Button
        isRecording={isRecording}
        onPress={handlePress}
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
      </Button>
    </MicrophoneContainer>
  );
};
