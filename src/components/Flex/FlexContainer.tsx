import styled from 'styled-components/native';

type FlexContainerProps = {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  padding?: number;
  gap?: number;
};

export const FlexContainer = styled.View<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ flexDirection = 'row' }) => flexDirection};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'stretch' }) => alignItems};
  flex-wrap: ${({ flexWrap = 'nowrap' }) => flexWrap};
  padding: ${({ theme, padding = theme.space[4] }) => `${padding}px`};
  gap: ${({ theme, gap = theme.space[2] }) => `${gap}px`};
`;
