import { styled } from 'styled-components/native';
import { Icon } from '../../../components/Icon/Icon';

const MicrophoneButton = styled.TouchableOpacity<{ isRecording: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isRecording }) =>
    isRecording ? theme.colors.black : theme.colors.blue};
  shadow-color: ${({ theme, isRecording }) =>
    isRecording ? theme.colors.blue : theme.colors.black};
  shadow-offset: 0px 16px;
  shadow-opacity: 0.24;
  shadow-radius: 40px;
  elevation: 8;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
`;

type RecordButtonProps = {
  isRecording: boolean;
  onPress: () => void;
};

export const RecordButton: React.FC<RecordButtonProps> = ({ onPress, isRecording }) => {
  return (
    <MicrophoneButton
      isRecording={isRecording}
      onPress={onPress}
    >
      <IconContainer pointerEvents="none">
        {isRecording ? (
          <Icon
            name="ri-pause-line"
            colorCode="white"
            size={40}
          />
        ) : (
          <Icon
            name="ri-mic-fill"
            colorCode="white"
            size={40}
          />
        )}
      </IconContainer>
    </MicrophoneButton>
  );
};
