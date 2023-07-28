import React from 'react';

import styled from 'styled-components/native';
import { Text } from '../../../components/Text/Text';
import { Icon } from '../../../components/Icon/Icon';
import { useDeletePatient } from '../../../api/patient';
import { View } from 'react-native';
import Card from '../../../components/Card/Card';

const CardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DeleteIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.error};
`;

interface Props {
  id: string;
  assignedId: string;
  name: string;
  onPress: () => void;
}

export const PatientItem: React.FC<Props> = ({ id, assignedId, name, onPress }) => {
  const deleteMutation = useDeletePatient();

  const handleDeletePatient = () => {
    deleteMutation.mutate(id);
  };

  return (
    <Card
      variant="outline"
      onPress={onPress}
    >
      <CardContainer>
        <View>
          <Text>{name}</Text>
          <Text>{assignedId}</Text>
        </View>
        <DeleteIcon
          name="ri-delete-bin-line"
          onPress={handleDeletePatient}
        />
      </CardContainer>
    </Card>
  );
};
