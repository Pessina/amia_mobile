import React from 'react';
import styled from 'styled-components/native';

interface InputProps {
  label?: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
}

const InputContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space[4]}px;
  width: 100%;
  height: 100%;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[2]}px;
`;

const InputField = styled.TextInput<{ error?: string }>`
  border-color: ${({ error, theme }) => (error ? theme.colors.error : theme.colors.text.light)};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.space[3]}px;
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  color: ${({ theme }) => theme.colors.text.DEFAULT};
`;

const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-top: ${({ theme }) => theme.space[2]}px;
`;

const Input: React.FC<InputProps> = ({ label, value, onChangeText, placeholder, error }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputField
        error={error}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default Input;
