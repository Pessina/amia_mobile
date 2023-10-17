import { GestureResponderEvent, Pressable } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import styled, { useTheme } from 'styled-components/native';
import { Theme } from '../../providers/StyledComponentsThemeProvider';

type IconProps = {
  name: string;
  padding?: number;
  colorCode?: keyof Theme['colors'];
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
  colorCode = 'textBlack06',
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
        color={theme.colors[colorCode]}
      />
    </Pressable>
  );
};
