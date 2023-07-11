import styled from 'styled-components/native';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { Microphone } from './Microphone';
import { processAudio } from '../../../api/visit';

export type MicrophoneModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
};

export const MicrophoneModal: React.FC<MicrophoneModalProps> = ({
  visible,
  onRequestClose,
  title,
}) => {
  const onStopRecording = async (uri: string) => {
    const text = await processAudio(uri);
    console.log(text);
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
