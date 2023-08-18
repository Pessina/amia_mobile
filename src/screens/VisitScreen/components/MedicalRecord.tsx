import { FlatList } from 'react-native';
import { BottomSheet } from '../../../components/BottomSheet/BottomSheet';
import Card from '../../../components/Card/Card';
import { Text } from '../../../components/Text/Text';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import Spacing from '../../../components/Spacing/Spacing';

const ItemSeparatorComponent = () => <Spacing size={4} />;

const TopicCardContainer = styled.View`
  gap: ${({ theme }) => theme.space[2]}px;
`;

const TopicCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <TopicCardContainer>
    <Text
      fontWeight="bold"
      size="lg"
    >
      {title}
    </Text>
    <Card bgColor="dark">
      <Text>{content}</Text>
    </Card>
  </TopicCardContainer>
);

const Container = styled.View`
  padding-bottom: ${({ theme }) => theme.space[16]}px;
`;

type MedicalRecordProps = {
  medicalRecord: {
    topics: { title: string; content: string }[];
  };
  visible: boolean;
  onRequestClose: () => void;
};

export const MedicalRecord: React.FC<MedicalRecordProps> = ({
  medicalRecord,
  visible,
  onRequestClose,
}) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patient.medicalRecordBottomSheet' });

  return (
    <BottomSheet
      visible={visible}
      onRequestClose={onRequestClose}
      title={t('title')}
    >
      <Container>
        <FlatList
          data={[...medicalRecord.topics]}
          keyExtractor={(item) => item.title}
          renderItem={({ item: { title, content } }) => (
            <TopicCard
              title={title}
              content={content}
            />
          )}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </Container>
    </BottomSheet>
  );
};
