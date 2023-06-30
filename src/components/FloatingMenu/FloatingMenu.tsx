import { styled } from 'styled-components/native';
import { IconButton } from '../Icon/IconButton';
import { Text } from '../Text/Text';
import { Floating } from '../Floating/Floating';
import { useState } from 'react';

const MenuItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
`;

type FloatingMenuProps = {
  options: { label: string; icon: string; onPress: () => void }[];
  children?: never;
};

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ options }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Floating
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      floating={options.map((option) => (
        <MenuItem
          onPress={option.onPress}
          key={option.label}
        >
          {option.icon && <IconButton name={option.icon} />}
          <Text>{option.label}</Text>
        </MenuItem>
      ))}
    >
      <IconButton
        name="more-horizontal"
        onPress={() => setIsMenuOpen((prev) => !prev)}
      />
    </Floating>
  );
};
