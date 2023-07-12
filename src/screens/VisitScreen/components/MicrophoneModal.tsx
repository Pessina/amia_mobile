import styled from 'styled-components/native';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { Microphone } from './Microphone';

export type MicrophoneModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
  onStopRecording: (uri: string) => Promise<void>;
};

export const MicrophoneModal: React.FC<MicrophoneModalProps> = ({
  visible,
  onRequestClose,
  title,
  onStopRecording,
}) => {
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
