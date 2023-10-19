import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Loader } from '../Loader/Loader';

type ButtonStyle = 'primary' | 'transparent' | 'outlined' | 'link' | 'danger';

export type ButtonProps = {
  buttonStyle?: ButtonStyle;
  title?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  alignment?: 'stretch' | 'flex-start' | 'flex-end';
  right?: ReactNode;
  left?: ReactNode;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const StyledPressable = styled.TouchableOpacity<ButtonProps>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `${theme.space[3]}px ${theme.space[6]}px`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, buttonStyle }) =>
    buttonStyle === 'primary'
      ? theme.colors.primary
      : buttonStyle === 'outlined'
      ? theme.colors.white
      : buttonStyle === 'link'
      ? 'transparent'
      : buttonStyle === 'danger'
      ? theme.colors.error
      : 'transparent'};
  border: ${({ buttonStyle, theme }) =>
    buttonStyle === 'outlined' ? `1px solid ${theme.colors.grayCCC}` : 'none'};
  align-self: ${({ alignment }) => alignment};
  gap: ${({ theme }) => theme.space[2]}px;
`;

const StyledText = styled.Text<{ buttonStyle: ButtonStyle }>`
  color: ${({ theme, buttonStyle }) =>
    buttonStyle === 'primary'
      ? theme.colors.white
      : buttonStyle === 'outlined'
      ? theme.colors.black
      : buttonStyle === 'danger'
      ? theme.colors.white
      : theme.colors.black};
  font-weight: ${({ theme, buttonStyle }) =>
    buttonStyle === 'link' ? theme.fontWeights.normal : theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
`;

export const Button: React.FC<ButtonProps> = ({
  buttonStyle = 'primary',
  title,
  onPress,
  alignment = 'stretch',
  left,
  right,
  isLoading,
  style,
  ...props
}) => {
  return (
    <StyledPressable
      {...props}
      buttonStyle={buttonStyle}
      onPress={onPress}
      alignment={alignment}
      style={style}
    >
      {isLoading ? <Loader /> : left}
      <StyledText buttonStyle={buttonStyle}>{title}</StyledText>
      {right}
    </StyledPressable>
  );
};
