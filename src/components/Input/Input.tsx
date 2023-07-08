import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { FontSize } from '../../providers/StyledComponentsThemeProvider';

export interface InputProps extends TextInputProps {
  label?: string;
  fontSize?: FontSize;
  error?: string;
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

const Input: React.FC<InputProps> = ({ label, error, ...rest }) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <FieldContainer error={error}>
        <StyledInput {...rest} />
      </FieldContainer>
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default Input;
