import { View } from 'react-native';
import { useFloating, Placement, offset, autoPlacement } from '@floating-ui/react-native';
import { ReactNode } from 'react';
import styled from 'styled-components/native';

// TODO: remove min-width and use the content width
const FloatingWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.space[2]}px;
  z-index: ${({ theme }) => theme.zIndex[29]};
  min-width: 70px;
` as unknown as typeof View;

type FloatingProps = {
  floating: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  placement?: Placement;
  floatingOffset?: number;
};

export const Floating: React.FC<FloatingProps> = ({
  children,
  floating,
  isOpen,
  placement = 'bottom-start',
  floatingOffset = 4,
}) => {
  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [offset(floatingOffset), autoPlacement()],
  });

  return (
    <View>
      <View
        ref={refs.setReference}
        collapsable={false}
      >
        {children}
      </View>
      {isOpen && (
        <FloatingWrapper
          ref={refs.setFloating}
          collapsable={false}
          style={floatingStyles}
        >
          {floating}
        </FloatingWrapper>
      )}
    </View>
  );
};
