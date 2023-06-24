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
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 0}px;
  margin-left: ${({ marginLeft }) => marginLeft ?? 0}px;
  margin-right: ${({ marginRight }) => marginRight ?? 0}px;
  padding-top: ${({ paddingTop }) => paddingTop ?? 0}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom ?? 0}px;
  padding-left: ${({ paddingLeft }) => paddingLeft ?? 0}px;
  padding-right: ${({ paddingRight }) => paddingRight ?? 0}px;
`;
