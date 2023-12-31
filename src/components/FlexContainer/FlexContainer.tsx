import styled from 'styled-components/native';

interface FlexContainerProps {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  grow?: number;
  gap?: number;
  padding?: number;
  margin?: number;
}

const FlexContainer = styled.View<FlexContainerProps>`
  flex-grow: ${({ grow = 1 }) => grow};
  flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
  gap: ${({ theme, gap = 0 }) => theme.space[gap]}px;
  padding: ${({ theme, padding = 0 }) => theme.space[padding]}px;
  margin: ${({ theme, margin = 0 }) => theme.space[margin]}px;
`;

export default FlexContainer;
