import React from 'react';

import { Text } from '../../../components/Text/Text';
import Card from '../../../components/Card/Card';

interface Props {
  id: string;
  name: string;
  onPress: () => void;
}

export const PatientItem: React.FC<Props> = ({ id, name, onPress }) => {
  return (
    <Card
      variant="outline"
      onPress={onPress}
    >
      <Text>{name}</Text>
      <Text>{id}</Text>
    </Card>
  );
};
