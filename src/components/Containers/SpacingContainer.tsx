import styled from 'styled-components/native';

interface SpacingContainerProps {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export const SpacingContainer = styled.View<SpacingContainerProps>`
  margin-top: ${({ marginTop = 2, theme }) => theme.space[marginTop]}px;
  margin-bottom: ${({ marginBottom = 2, theme }) => theme.space[marginBottom]}px;
  margin-left: ${({ marginLeft = 2, theme }) => theme.space[marginLeft]}px;
  margin-right: ${({ marginRight = 2, theme }) => theme.space[marginRight]}px;
  padding-top: ${({ paddingTop = 2, theme }) => theme.space[paddingTop]}px;
  padding-bottom: ${({ paddingBottom = 2, theme }) => theme.space[paddingBottom]}px;
  padding-left: ${({ paddingLeft = 2, theme }) => theme.space[paddingLeft]}px;
  padding-right: ${({ paddingRight = 2, theme }) => theme.space[paddingRight]}px;
`;
