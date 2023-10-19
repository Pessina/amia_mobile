import React from 'react';
import { Modal as NativeModal, ModalProps as NativeModalProps } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

interface BottomSheetProps extends NativeModalProps {
  title?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ children, title, ...props }) => {
  return (
    <NativeModal
      animationType="fade"
      transparent={true}
      {...props}
    >
      <Overlay>
        <Content>
          <Header>
            <IconPlaceholder />
            <Title
              size="lg"
              fontWeight="bold"
            >
              {title}
            </Title>
            {props.onRequestClose ? (
              <Icon
                name="close-circle-fill"
                onPress={props.onRequestClose}
                size={24}
              />
            ) : (
              <IconPlaceholder />
            )}
          </Header>
          {children}
        </Content>
      </Overlay>
    </NativeModal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
  justify-content: flex-end;
  align-items: center;
`;

const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[4]}px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  max-height: 90%;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]}px;
`;

const Title = styled(Text)`
  text-align: center;
`;

const IconPlaceholder = styled.View`
  width: 24px;
`;
