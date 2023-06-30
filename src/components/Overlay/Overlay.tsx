import { Dimensions, PressableProps } from 'react-native';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// TODO: overlay it's not taking the full screen
export interface OverlayProps extends PressableProps {
  color: 'overlay' | 'transparent';
}

export const Overlay = styled.TouchableOpacity<OverlayProps>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  z-index: ${({ theme }) => theme.zIndex[theme.zIndex.length - 1]};
`;
