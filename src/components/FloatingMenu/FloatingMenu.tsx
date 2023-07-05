import { styled } from 'styled-components/native';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { Floating } from '../Floating/Floating';
import { useState } from 'react';

const MenuItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

type FloatingMenuProps = {
  options: { label: string; icon?: string; onPress: () => void }[];
  children?: never;
};

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ options }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Floating
      isOpen={isMenuOpen}
      floating={options.map((option) => (
        <MenuItem
          onPress={() => {
            setIsMenuOpen(false);
            option.onPress();
          }}
          key={option.label}
        >
          {option.icon && <Icon name={option.icon} />}
          <Text>{option.label}</Text>
        </MenuItem>
      ))}
    >
      <Icon
        name="more-line"
        onPress={() => setIsMenuOpen((prev) => !prev)}
      />
    </Floating>
  );
};
