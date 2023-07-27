import { ReactNode } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  width: 100%;
`;

type KeyboardAvoidingViewProps = {
  children: ReactNode;
};

export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({ children }) => {
  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={56}
    >
      {children}
    </StyledKeyboardAvoidingView>
  );
};
