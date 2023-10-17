import React, { useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { FontSize } from '../../providers/StyledComponentsThemeProvider';
import { Error } from '../Error/Error';
import { Label } from '../Label/Label';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

export interface InputProps extends TextInputProps {
  label?: string;
  fontSize?: FontSize;
  error?: string;
  hint?: string;
  leftIcon?: string;
  variant?: 'primary' | 'secondary';
}

const InputContainer = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.space[2]}px;
`;

const FieldContainer = styled.View<{
  error?: string;
  isFocused?: boolean;
  variant?: 'primary' | 'secondary';
}>`
  flex-direction: row;
  align-items: center;
  border-color: ${({ error, isFocused, variant, theme }) => {
    if (error) {
      return theme.colors.error;
    }
    if (isFocused && variant === 'primary') {
      return theme.colors.primary;
    }
    return theme.colors.gray666;
  }};
  border-width: ${({ isFocused, variant }) => {
    if (variant === 'secondary') {
      return '0px';
    }
    return '1px';
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space[3]}px;
  background-color: ${({ theme, variant }) => {
    if (variant === 'secondary') {
      return theme.colors.black06;
    } else {
      return theme.colors.white;
    }
  }};
  width: 100%;
  gap: ${({ theme }) => theme.space[2]}px;
`;

const StyledInput = styled.TextInput<InputProps>`
  flex: 1;
  align-items: center;
  font-size: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize]}px;
  height: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize] * 1.5}px;
  padding: 0;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black};
`;

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  variant = 'primary',
  ...rest
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <FieldContainer
        error={error}
        isFocused={isFocused}
        variant={variant}
      >
        {leftIcon && <Icon name={leftIcon} />}
        <StyledInput
          {...rest}
          placeholderTextColor={
            variant === 'secondary' ? theme.colors.gray666 : theme.colors.black06
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </FieldContainer>
      {error ? <Error>{error}</Error> : hint && <Text color="gray666">{hint}</Text>}
    </InputContainer>
  );
};

export default Input;
