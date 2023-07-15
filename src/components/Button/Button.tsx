import React, { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
import { Loader } from '../Loader/Loader';
type ButtonStyle = 'primary' | 'transparent' | 'outlined';

export type ButtonProps = {
  buttonStyle?: ButtonStyle;
  title?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  alignment?: 'stretch' | 'flex-start' | 'flex-end';
  right?: ReactNode;
  left?: ReactNode;
  isLoading?: boolean;
};

const StyledPressable = styled.TouchableOpacity<ButtonProps>`
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
  alignment = 'stretch',
  left,
  right,
  isLoading,
}) => {
  return (
    <StyledPressable
      buttonStyle={buttonStyle}
      onPress={onPress}
      alignment={alignment}
    >
      {isLoading ? <Loader /> : left}
      <StyledText buttonStyle={buttonStyle}>{title}</StyledText>
      {right}
    </StyledPressable>
  );
};
