import React from 'react';
import styled from 'styled-components/native';

interface SpaceProps {
  size: number;
}

const StyledSpace = styled.View<SpaceProps>`
  height: ${({ theme, size }) => theme.space[size]}px;
`;

const Space: React.FC<SpaceProps> = ({ size }) => {
  return <StyledSpace size={size} />;
};

export default Space;
