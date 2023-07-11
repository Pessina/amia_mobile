import styled from 'styled-components/native';

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text.DEFAULT};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;
