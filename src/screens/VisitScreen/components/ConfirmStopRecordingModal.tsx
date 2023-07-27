import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import styled from 'styled-components/native';

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

type ConfirmStopRecordingModalProps = {
  onConfirm: () => void;
  visible: boolean;
  onRequestClose: () => void;
};

export const ConfirmStopRecordingModal: React.FC<ConfirmStopRecordingModalProps> = ({
  onConfirm,
  onRequestClose,
  visible,
}) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patient.confirmStopRecordingModal' });

  return (
    <Modal
      transparent
      visible={visible}
      title={t('text')}
      width="300px"
    >
      <ButtonsContainer>
        <Button
          title={t('confirm')}
          onPress={() => {
            onConfirm();
            onRequestClose();
          }}
        />
        <Button
          onPress={onRequestClose}
          title={t('cancel')}
          buttonStyle="outlined"
        />
      </ButtonsContainer>
    </Modal>
  );
};
