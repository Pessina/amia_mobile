import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

export type ButtonProps = {
  buttonStyle?: 'primary' | 'transparent' | 'outlined';
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const StyledPressable = styled.Pressable<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `${theme.space[3]}px`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, buttonStyle }) =>
    buttonStyle === 'primary'
      ? theme.colors.primary.DEFAULT
      : buttonStyle === 'outlined'
      ? theme.colors.background.light
      : 'transparent'};
  border: ${({ buttonStyle, theme }) =>
    buttonStyle === 'outlined' ? `1px solid ${theme.colors.text.DEFAULT}` : 'none'};
`;

const StyledText = styled.Text<ButtonProps>`
  color: ${({ theme, buttonStyle }) =>
    buttonStyle === 'primary'
      ? theme.colors.background.light
      : buttonStyle === 'outlined'
      ? theme.colors.text.dark
      : theme.colors.primary.DEFAULT};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Button: React.FC<ButtonProps> = ({ buttonStyle = 'primary', title, onPress }) => {
  return (
    <StyledPressable
      buttonStyle={buttonStyle}
      onPress={onPress}
    >
      <StyledText buttonStyle={buttonStyle}>{title}</StyledText>
    </StyledPressable>
  );
};
