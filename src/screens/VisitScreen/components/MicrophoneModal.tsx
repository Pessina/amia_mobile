import styled from 'styled-components/native';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import { Microphone } from './Microphone';

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
  return (
    <BottomSheet
      title={title}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Content>
        <Microphone />
      </Content>
    </BottomSheet>
  );
};

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
