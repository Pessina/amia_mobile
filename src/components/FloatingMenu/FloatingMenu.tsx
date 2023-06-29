import { styled } from 'styled-components/native';
import { IconButton } from '../Icon/IconButton';
import { Text } from '../Text/Text';

// FloatingMenu component
const FloatingMenuContainer = styled.View`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background.DEFAULT};
  padding: ${({ theme }) => theme.space[2]}px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const MenuItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]}px;
`;

type FloatingMenuProps = {
  options: { label: string; icon: string; onPress: () => void }[];
};

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ options }) => {
  return (
    <FloatingMenuContainer>
      {options.map((option) => (
        <MenuItem
          onPress={option.onPress}
          key={option.label}
        >
          {option.icon && <IconButton name={option.icon} />}
          <Text>{option.label}</Text>
        </MenuItem>
      ))}
    </FloatingMenuContainer>
  );
};
