import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button/Button';
import { Text } from '../../../components/Text/Text';
import styled from 'styled-components/native';
import { Modal } from '../../../components/Modal/Modal';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.space[4]}px;
`;

type ConfirmDeletePatientModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
};

export const ConfirmDeletePatientModal: React.FC<ConfirmDeletePatientModalProps> = ({
  visible,
  onRequestClose,
  onConfirm,
}) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patientList.patientItem.deleteModal' });

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      title={t('title')}
    >
      <Text>{t('description')}</Text>
      <Container>
        <Button
          buttonStyle="danger"
          onPress={onConfirm}
          title={t('confirm')}
        />
        <Button
          buttonStyle="outlined"
          onPress={onRequestClose}
          title={t('cancel')}
        />
      </Container>
    </Modal>
  );
};
