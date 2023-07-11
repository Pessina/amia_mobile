import styled from 'styled-components/native';

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-top: ${({ theme }) => theme.space[2]}px;
`;
