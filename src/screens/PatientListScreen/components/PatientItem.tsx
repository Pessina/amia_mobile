import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text } from '../../../components/Text/Text';
import { Icon } from '../../../components/Icon/Icon';
import { useDeletePatient } from '../../../api/patient';
import { View } from 'react-native';
import Card from '../../../components/Card/Card';
import { Loader } from '../../../components/Loader/Loader';
import { ConfirmDeletePatientModal } from './ConfirmDeletePatientModal';

const CardContainer = styled(Card)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  id: string;
  assignedId: string;
  name: string;
  onPress: () => void;
}

export const PatientItem: React.FC<Props> = ({ id, assignedId, name, onPress }) => {
  const deleteMutation = useDeletePatient();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeletePatient = () => {
    setIsModalVisible(false);
    deleteMutation.mutate(id);
  };

  return (
    <>
      <ConfirmDeletePatientModal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onConfirm={handleDeletePatient}
      />
      <CardContainer
        variant="outline"
        onPress={onPress}
      >
        <View>
          <Text>{name}</Text>
          <Text
            size="sm"
            color="black60"
          >
            {assignedId}
          </Text>
        </View>
        {deleteMutation.isLoading ? (
          <Loader />
        ) : (
          <Icon
            name="ri-delete-bin-line"
            onPress={() => setIsModalVisible(true)}
            colorCode="black60"
          />
        )}
      </CardContainer>
    </>
  );
};
