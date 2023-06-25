import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // or any other icon library you are using

interface InputProps {
  label?: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  rightIcon?: string;
  leftIcon?: string;
}

const StyledIcon = styled.Pressable`
  width: 24px;
  height: 24px;
  margin: 0 10px;
`;

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

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.base}px;
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
  isPassword = false,
  rightIcon,
  leftIcon,
}) => {
  const [secure, setSecure] = useState(isPassword);

  const EyeIcon = secure ? FaEyeSlash : FaEye;

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <FieldContainer error={error}>
        {leftIcon && <StyledIcon>{leftIcon}</StyledIcon>}
        <StyledInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure}
        />
        {isPassword && (
          <StyledIcon onPress={() => setSecure(!secure)}>
            <EyeIcon size={24} />
          </StyledIcon>
        )}
        {rightIcon && <StyledIcon>{rightIcon}</StyledIcon>}
      </FieldContainer>
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default Input;
