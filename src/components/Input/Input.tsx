import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { FontSize } from '../../providers/StyledComponentsThemeProvider';
import { Error } from '../Error/Error';
import { Label } from '../Label/Label';
import { Text } from '../Text/Text';

export interface InputProps extends TextInputProps {
  label?: string;
  fontSize?: FontSize;
  error?: string;
  hint?: string;
}

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space[4]}px;
  width: 100%;
  gap: ${({ theme }) => theme.space[2]}px;
`;

const FieldContainer = styled.View<{ error?: string; isFocused?: boolean }>`
  flex-direction: row;
  align-items: center;
  border-color: ${({ error, isFocused, theme }) => {
    if (error) {
      return theme.colors.error;
    }
    if (isFocused) {
      return theme.colors.primary;
    }
    return theme.colors.borderGray;
  }};
  border-width: ${({ isFocused }) => (isFocused ? '2.5px' : '1px')};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space[3]}px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

const StyledInput = styled.TextInput<InputProps>`
  flex: 1;
  font-size: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize]}px;
  height: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize] * 1.5}px;
  padding: 0;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black};
`;

const Input: React.FC<InputProps> = ({ label, error, hint, ...rest }) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <FieldContainer
        error={error}
        isFocused={isFocused}
      >
        <StyledInput
          {...rest}
          placeholderTextColor={theme.colors.textBlack06}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </FieldContainer>
      {error ? <Error>{error}</Error> : hint && <Text>{hint}</Text>}
    </InputContainer>
  );
};

export default Input;
