import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

export interface DimensionContainerProps extends ViewProps {
  width?: string;
  height?: string;
}

export const DimensionContainer = styled.View<DimensionContainerProps>`
  width: ${({ width = 'auto' }) => (width === 'full' ? '100%' : width)};
  height: ${({ height = 'auto' }) => (height === 'full' ? '100%' : height)};
`;
