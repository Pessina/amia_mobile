import React from 'react';
import { Modal as NativeModal, ModalProps as NativeModalProps, ScrollView } from 'react-native';
import { SafeArea } from '../Containers/SafeArea';
import styled from 'styled-components/native';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { KeyboardAvoidingView } from '../KeyboardAvoidingView/KeyboardAvoidingView';

interface Props extends NativeModalProps {
  title?: string;
  width?: string;
}

export const Modal: React.FC<Props> = ({ children, title, width, ...props }) => {
  return (
    <NativeModal
      animationType="fade"
      transparent={false}
      {...props}
    >
      <Overlay>
        <KeyboardAvoidingView>
          <Content width={width}>
            <ScrollView>
              <Header>
                <Text size="2xl">{title}</Text>
                {props.onRequestClose && (
                  <Icon
                    name="close-circle-fill"
                    onPress={props.onRequestClose}
                  />
                )}
              </Header>
              {children}
            </ScrollView>
          </Content>
        </KeyboardAvoidingView>
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

const Content = styled.View<{ width?: string }>`
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  padding: ${({ theme }) => theme.space[4]}px;
  margin: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 90%;
  max-height: 90%;
  width: ${({ width }) => width || '100%'};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;
