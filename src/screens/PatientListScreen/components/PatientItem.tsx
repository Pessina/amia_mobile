import React from 'react';
import styled from 'styled-components/native';

import { Pressable } from 'react-native';
import { Text } from '../../../components/Text/Text';

interface Props {
  id: string;
  name: string;
  onPress: () => void;
}

export const PatientItem: React.FC<Props> = ({ id, name, onPress }) => {
  return (
    <PatientContainer onPress={onPress}>
      <Text>{name}</Text>
      <Text>{id}</Text>
    </PatientContainer>
  );
};

const PatientContainer = styled(Pressable)`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.text.dark};
  padding: ${({ theme }) => theme.space[2]}px;
  gap: ${({ theme }) => theme.space[2]}px;
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;
