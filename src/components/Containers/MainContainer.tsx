import { styled } from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[4]}px;
`;
