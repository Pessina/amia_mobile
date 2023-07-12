import styled from 'styled-components/native';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { Microphone } from './Microphone';
import { processAudio } from '../../../api/visit';

export type MicrophoneModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
  onFinishProcessingAudio: (text: string) => void;
};

export const MicrophoneModal: React.FC<MicrophoneModalProps> = ({
  visible,
  onRequestClose,
  title,
  onFinishProcessingAudio,
}) => {
  const onStopRecording = async (uri: string) => {
    // TODO: Implement re-try mechanism in case it fails
    try {
      const text = await processAudio(uri);
      onFinishProcessingAudio(text ?? '');
      onRequestClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BottomSheet
      title={title}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Content>
        <Microphone onStopRecording={onStopRecording} />
      </Content>
    </BottomSheet>
  );
};

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
