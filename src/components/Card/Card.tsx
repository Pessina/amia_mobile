import React from 'react';
import styled from 'styled-components/native';

interface CardContainerProps {
  bgColor?: 'light' | 'DEFAULT' | 'dark';
}

const CardContainer = styled.View<CardContainerProps>`
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors.background[bgColor] : theme.colors.white};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

interface CardProps extends CardContainerProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, bgColor = 'dark' }) => {
  return <CardContainer bgColor={bgColor}>{children}</CardContainer>;
};

export default Card;
