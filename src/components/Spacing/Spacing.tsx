import React from 'react';
import styled from 'styled-components/native';

interface SpacingProps {
  size: number;
}

const StyledSpacing = styled.View<SpacingProps>`
  height: ${({ theme, size }) => theme.space[size]}px;
`;

const Spacing: React.FC<SpacingProps> = ({ size }) => {
  return <StyledSpacing size={size} />;
};

export default Spacing;
