import React from 'react';
import styled from 'styled-components/native';
import { FontSize } from '../../providers/StyledComponentsThemeProvider';

interface InputProps {
  label?: string;
  value?: string;
  fontSize?: FontSize;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
}

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space[4]}px;
  width: 100%;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;

const FieldContainer = styled.View<{ error?: string }>`
  flex-direction: row;
  align-items: center;
  border-color: ${({ error, theme }) => (error ? theme.colors.error : theme.colors.text.light)};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.space[3]}px;
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
`;

const StyledInput = styled.TextInput<InputProps>`
  flex: 1;
  font-size: ${({ theme, fontSize = 'base' }) => theme.fontSizes[fontSize]}px;
  line-height: ${({ theme, fontSize = 'base' }) => theme.lineHeights[fontSize]}px;
  padding: 0;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.text.DEFAULT};
`;

const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-top: ${({ theme }) => theme.space[2]}px;
`;

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,

  secureTextEntry,
}) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <FieldContainer error={error}>
        <StyledInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
      </FieldContainer>
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default Input;
