import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

const StyledActivityIndicator = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => {
  const theme = useTheme();

  return (
    <StyledActivityIndicator
      size="large"
      color={theme.colors.secondary.DEFAULT}
    />
  );
};
