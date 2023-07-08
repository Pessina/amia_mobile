import React, { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
type ButtonStyle = 'primary' | 'transparent' | 'outlined';

export type ButtonProps = {
  buttonStyle?: ButtonStyle;
  title?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  width?: 'full' | 'auto';
  alignment?: 'stretch' | 'flex-start' | 'flex-end';
  right?: ReactNode;
  left?: ReactNode;
};

const StyledPressable = styled.Pressable<ButtonProps>`
  flex-direction: row;
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
  align-self: ${({ alignment }) => alignment};
  gap: ${({ theme }) => theme.space[2]}px;
`;

const StyledText = styled.Text<{ buttonStyle: ButtonStyle }>`
  color: ${({ theme, buttonStyle }) =>
    buttonStyle === 'primary'
      ? theme.colors.background.light
      : buttonStyle === 'outlined'
      ? theme.colors.text.dark
      : theme.colors.primary.DEFAULT};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Button: React.FC<ButtonProps> = ({
  buttonStyle = 'primary',
  title,
  onPress,
  width = 'auto',
  alignment = 'stretch',
  left,
  right,
}) => {
  return (
    <StyledPressable
      buttonStyle={buttonStyle}
      onPress={onPress}
      width={width}
      alignment={alignment}
    >
      {left}
      <StyledText buttonStyle={buttonStyle}>{title}</StyledText>
      {right}
    </StyledPressable>
  );
};
