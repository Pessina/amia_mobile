import { GestureResponderEvent, Pressable } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import styled, { useTheme } from 'styled-components/native';

type IconProps = {
  name: string;
  padding?: number;
  colorCode?: 'light' | 'DEFAULT' | 'dark';
  size?: number;
  color?: string;
  onPress?: (e: GestureResponderEvent) => void;
};

const IconStyled = styled(RemixIcon)<IconProps>`
  padding: ${({ theme, padding = 0 }) => theme.space[padding]}px;
`;

export const Icon: React.FC<IconProps> = ({
  name,
  padding,
  colorCode = 'light',
  size = 24,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <IconStyled
        name={name}
        padding={padding}
        size={size}
        color={theme.colors.text[colorCode]}
      />
    </Pressable>
  );
};
