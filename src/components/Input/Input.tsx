import React from 'react';
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
  hint?: string; // This is your new prop
}

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space[4]}px;
  width: 100%;
  gap: ${({ theme }) => theme.space[2]}px;
`;

const FieldContainer = styled.View<{ error?: string }>`
  flex-direction: row;
  align-items: center;
  border-color: ${({ error, theme }) => (error ? theme.colors.error : theme.colors.secondary.dark)};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.space[3]}px;
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  width: 100%;
`;

const StyledInput = styled.TextInput<InputProps>`
  flex: 1;
  font-size: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize]}px;
  height: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize] * 1.5}px;
  padding: 0;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.text.DEFAULT};
`;

const Input: React.FC<InputProps> = ({ label, error, hint, ...rest }) => {
  const theme = useTheme();

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <FieldContainer error={error}>
        <StyledInput
          {...rest}
          placeholderTextColor={theme.colors.text.DEFAULT}
        />
      </FieldContainer>
      {error ? <Error>{error}</Error> : hint && <Text>{hint}</Text>}
    </InputContainer>
  );
};

export default Input;
