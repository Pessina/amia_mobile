import { Animated } from 'react-native';
import { useSpinAnimation } from '../../styles/animations/useSpinAnimation';
import { Icon } from '../Icon/Icon';

export const Loader = () => {
  const spinStyle = useSpinAnimation();

  return (
    <Animated.View style={spinStyle}>
      <Icon name="ri-loader-4-line" />
    </Animated.View>
  );
};
