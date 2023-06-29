import { useState } from 'react';
import { FloatingMenu } from '../FloatingMenu/FloatingMenu';
import { IconButton } from '../Icon/IconButton';
import { View } from 'react-native';
import { logout } from '../../auth/logout';

export const Menu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <IconButton
        name="more-vertical"
        onPress={() => setIsVisible((prev) => !prev)}
      />
      {isVisible && (
        <FloatingMenu options={[{ label: 'Logout', icon: 'logout', onPress: logout }]} />
      )}
    </View>
  );
};
