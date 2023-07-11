import { styled } from 'styled-components/native';

export const Form = styled.View`
  flex-grow: 1;
  gap: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;
`;
