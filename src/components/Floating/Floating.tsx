import { View } from 'react-native';
import { useFloating, Placement, offset, autoPlacement } from '@floating-ui/react-native';
import { ReactNode } from 'react';
import { Overlay } from '../Overlay/Overlay';
import styled from 'styled-components/native';

// TODO: re-check the z-index
const Wrapper = styled.View`
  z-index: ${({ theme }) => theme.zIndex[1]};
`;

const FloatingWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.space[2]}px;
  z-index: ${({ theme }) => theme.zIndex[29]};
` as unknown as typeof View;

type FloatingProps = {
  floating: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  placement?: Placement;
  floatingOffset?: number;
};

export const Floating: React.FC<FloatingProps> = ({
  children,
  floating,
  isOpen,
  onClose,
  placement = 'bottom-start',
  floatingOffset = 4,
}) => {
  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [offset(floatingOffset), autoPlacement()],
  });

  return (
    <Wrapper>
      <View
        ref={refs.setReference}
        collapsable={false}
      >
        {children}
      </View>
      {isOpen && (
        <Overlay
          color="transparent"
          onPress={() => (isOpen ? onClose() : undefined)}
        >
          <FloatingWrapper
            ref={refs.setFloating}
            collapsable={false}
            style={floatingStyles}
          >
            {floating}
          </FloatingWrapper>
        </Overlay>
      )}
    </Wrapper>
  );
};
