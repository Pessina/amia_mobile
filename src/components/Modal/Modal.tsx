import React from 'react';
import {
  Modal as NativeModal,
  ModalProps as NativeModalProps,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeArea } from '../Containers/SafeArea';
import styled from 'styled-components/native';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { styles } from '../../styles/styles';

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.full}
      >
        <Overlay>
          <ScrollView contentContainerStyle={styles.fullCenter}>
            <Content>
              <Header>
                <Text size="2xl">{title}</Text>
                <Icon
                  name="close-circle-fill"
                  onPress={props.onRequestClose}
                />
              </Header>
              {children}
            </Content>
          </ScrollView>
        </Overlay>
      </KeyboardAvoidingView>
    </NativeModal>
  );
};

const Overlay = styled(SafeArea)`
  background-color: ${({ theme }) => theme.colors.overlay};
  flex: 1;
`;

const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  padding: ${({ theme }) => theme.space[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 80%;
  max-height: 70%;
  min-width: 200px;
  align-self: center;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;
