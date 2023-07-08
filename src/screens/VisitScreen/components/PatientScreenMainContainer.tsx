import styled from 'styled-components/native';
import { MainContainer } from '../../../components/Containers/MainContainer';

export const PatientMainContainer = styled(MainContainer)`
  flex: 1;
  gap: ${({ theme }) => theme.space[2]}px;
`;
