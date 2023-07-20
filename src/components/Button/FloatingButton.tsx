import React from 'react';
import { Animated, Platform } from 'react-native';
import { useKeyboardOffset } from '../../hooks/useKeyboardOffset';
import { Button, ButtonProps } from './Button';

export type FloatingButtonProps = ButtonProps & {
  position?: {
    offsetRight: number;
    offsetBottom: number;
  };
};

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  position = {
    offsetRight: 10,
    offsetBottom: 0,
  },
  ...props
}) => {
  const { keyboardOffset, keyboardHeight } = useKeyboardOffset();

  return (
    <Animated.View
      style={{
        position: 'absolute',
        right: position.offsetRight,
        elevation: 1,
        bottom:
          Platform.OS === 'ios'
            ? keyboardOffset.interpolate({
                inputRange: [position.offsetBottom, keyboardHeight],
                outputRange: [position.offsetBottom, -20 + keyboardHeight],
              })
            : 10,
      }}
    >
      <Button {...props} />
    </Animated.View>
  );
};
