import styled from 'styled-components/native';

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text.dark};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
