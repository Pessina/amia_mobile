import React from 'react';
import styled from 'styled-components/native';

import { View } from 'react-native';
import { Text } from '../../../components/Text/Text';

interface Props {
  id: string;
  name: string;
}

export const PatientItem: React.FC<Props> = ({ id, name }) => {
  return (
    <PatientContainer>
      <Text>{name}</Text>
      <Text>{id}</Text>
    </PatientContainer>
  );
};

const PatientContainer = styled(View)`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.text.dark};
  padding: ${({ theme }) => theme.space[2]}px;
  gap: ${({ theme }) => theme.space[2]}px;
`;
