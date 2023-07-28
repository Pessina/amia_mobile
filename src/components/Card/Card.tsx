import React from 'react';
import styled from 'styled-components/native';
import { Pressable } from 'react-native';

interface CardContainerProps {
  bgColor?: 'light' | 'DEFAULT' | 'dark';
  variant?: 'default' | 'outline';
}

const CardContainer = styled(Pressable)<CardContainerProps>`
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors.background[bgColor] : theme.colors.background.DEFAULT};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: ${({ theme, variant }) =>
    variant === 'outline' ? `1px solid ${theme.colors.text.dark}` : 'none'};
  padding: ${({ theme }) => theme.space[2]}px;
`;

interface CardProps extends CardContainerProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  bgColor = 'DEFAULT',
  variant = 'default',
  onPress,
  ...props
}) => {
  return (
    <CardContainer
      {...props}
      bgColor={bgColor}
      variant={variant}
      onPress={onPress}
    >
      {children}
    </CardContainer>
  );
};

export default Card;
