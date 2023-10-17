import styled from 'styled-components/native';

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
