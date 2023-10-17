import { styled } from 'styled-components/native';
import { Text } from '../Text/Text';

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export type EmptyStateProps = {
  text: React.ReactNode;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <EmptyStateContainer>
      <Text color="gray666">{text}</Text>
    </EmptyStateContainer>
  );
};
