import { ReactNode } from 'react';
import styled from 'styled-components/native';

// TODO: re-check the z-index
const HeaderStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  padding: ${({ theme }) => theme.space[1]}px;
  z-index: ${({ theme }) => theme.zIndex[1]};
`;

const LeftWrapper = styled.View`
  align-self: flex-start;
`;

const CenterWrapper = styled.View`
  align-self: center;
`;

const RightWrapper = styled.View`
  align-self: flex-end;
`;

type HeaderProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ left, center, right }) => {
  return (
    <HeaderStyled>
      <LeftWrapper>{left}</LeftWrapper>
      <CenterWrapper>{center}</CenterWrapper>
      <RightWrapper>{right}</RightWrapper>
    </HeaderStyled>
  );
};
