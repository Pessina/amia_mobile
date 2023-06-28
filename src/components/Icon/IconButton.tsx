import FeatherIcon from 'react-native-vector-icons/Feather';
import { IconButtonProps as VectorIconsButtonProps } from 'react-native-vector-icons/Icon';
import styled, { useTheme } from 'styled-components/native';

interface IconButtonProps extends VectorIconsButtonProps {
  padding?: number;
  colorCode?: 'light' | 'DEFAULT' | 'dark';
}

const IconButtonStyled = styled(FeatherIcon.Button)<IconButtonProps>`
  padding: ${({ theme, padding = 0 }) => theme.space[padding]}px;
`;

export const IconButton: React.FC<IconButtonProps> = ({
  backgroundColor = 'transparent',
  underlayColor = 'transparent',
  size = 24,
  colorCode = 'light',
  ...rest
}) => {
  const theme = useTheme();

  return (
    <IconButtonStyled
      {...rest}
      underlayColor={underlayColor}
      size={size}
      backgroundColor={backgroundColor}
      color={theme.colors.text[colorCode]}
    />
  );
};
