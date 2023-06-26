import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const IconButton = styled(FeatherIcon.Button)`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
`;
