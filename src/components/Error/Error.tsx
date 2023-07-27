import styled from 'styled-components/native';

type ErrorProps = {
  textAlign?: 'left' | 'center' | 'right';
};

export const Error = styled.Text<ErrorProps>`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: ${({ textAlign }) => textAlign || 'left'};
`;
