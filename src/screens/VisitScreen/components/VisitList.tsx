import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../../components/Text/Text';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface VisitListProps {
  visits: { visitDate: string; id: number }[];
}

interface VisitItemProps {
  visitDate: string;
}

export const VisitItem: React.FC<VisitItemProps> = ({ visitDate }) => {
  const formattedDate = format(new Date(visitDate), 'dd/MM/yyyy HH:mm');

  return (
    <VisitContainer>
      <Text>{formattedDate}</Text>
    </VisitContainer>
  );
};

const VisitContainer = styled.View`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.text.dark};
  padding: ${({ theme }) => theme.space[2]}px;
  gap: ${({ theme }) => theme.space[2]}px;
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledFlatList = styled(FlatList)`
  flex: 1;
` as unknown as typeof FlatList;

const Container = styled.View`
  flex: 1;
`;

const TitleText = styled(Text)`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;

export const VisitList: React.FC<VisitListProps> = ({ visits }) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patient' });

  return (
    <Container>
      <TitleText size="2xl">{t('visitListTitle')}</TitleText>
      {visits.length > 0 ? (
        <StyledFlatList
          data={visits}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: visit }) => <VisitItem visitDate={visit.visitDate} />}
        />
      ) : (
        <EmptyContainer>
          <Text>{t('noVisitsYet')}</Text>
        </EmptyContainer>
      )}
    </Container>
  );
};
