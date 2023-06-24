import styled from 'styled-components/native';

type FlexItemProps = {
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  flex?: number;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
};

export const FlexItem = styled.View<FlexItemProps>`
  flex-grow: ${({ flexGrow = 0 }) => flexGrow};
  flex-shrink: ${({ flexShrink = 1 }) => flexShrink};
  flex-basis: ${({ flexBasis = 'auto' }) => flexBasis};
  flex: ${({ flex }) => flex};
  align-self: ${({ alignSelf = 'auto' }) => alignSelf};
`;
