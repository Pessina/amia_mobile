import React from 'react';
import { Modal as NativeModal, ModalProps as NativeModalProps, ScrollView } from 'react-native';
import { SafeArea } from '../Containers/SafeArea';
import styled from 'styled-components/native';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { AppKeyboardAvoidingView } from '../AppKeyboardAvoidingView/AppKeyboardAvoidingView';

interface Props extends NativeModalProps {
  title?: string;
}

export const Modal: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <NativeModal
      animationType="fade"
      transparent={false}
      {...props}
    >
      <Overlay>
        <AppKeyboardAvoidingView>
          <Content>
            <ScrollView>
              <Header>
                <Text size="2xl">{title}</Text>
                <Icon
                  name="close-circle-fill"
                  onPress={props.onRequestClose}
                />
              </Header>
              {children}
            </ScrollView>
          </Content>
        </AppKeyboardAvoidingView>
      </Overlay>
    </NativeModal>
  );
};

const Overlay = styled(SafeArea)`
  background-color: ${({ theme }) => theme.colors.overlay};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  padding: ${({ theme }) => theme.space[4]}px;
  margin: ${({ theme }) => theme.space[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-width: 200px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;
