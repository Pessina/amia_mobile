import React from 'react';
import styled from 'styled-components/native';
import { Text } from '../../../components/Text/Text';
import { useTranslation } from 'react-i18next';
import { utcToZonedTime, format } from 'date-fns-tz';
import { FlatList } from 'react-native';
import { styles } from '../../../styles/styles';
import Card from '../../../components/Card/Card';
import Space from '../../../components/Space/Space';
import FlexContainer from '../../../components/FlexContainer/FlexContainer';

const ItemSeparatorComponent = () => <Space size={2} />;

interface VisitListProps {
  visits: { visitDate: string; id: number }[];
}

const VisitItem: React.FC<{ visitDate: string }> = ({ visitDate }) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateInUserTimezone = utcToZonedTime(visitDate, timeZone);
  const formattedDate = format(dateInUserTimezone, 'dd/MM/yyyy - HH:mm', { timeZone });

  return (
    <Card variant="outline">
      <Text>{formattedDate}</Text>
    </Card>
  );
};

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledFlatList = styled(FlatList)`
  flex: 1;
` as unknown as typeof FlatList;

export const VisitList: React.FC<VisitListProps> = ({ visits }) => {
  const { t } = useTranslation('', { keyPrefix: 'screen.patient' });

  return (
    <FlexContainer gap={4}>
      <Text
        size="sm"
        fontWeight="bold"
      >
        {t('visitListTitle')}
      </Text>
      <StyledFlatList
        data={visits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: visit }) => <VisitItem visitDate={visit.visitDate} />}
        ListEmptyComponent={
          <EmptyContainer>
            <Text color="gray666">{t('noVisitsYet')}</Text>
          </EmptyContainer>
        }
        contentContainerStyle={visits.length === 0 ? styles.full : {}}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </FlexContainer>
  );
};
