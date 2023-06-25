import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Icon = styled(FeatherIcon)`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
`;
