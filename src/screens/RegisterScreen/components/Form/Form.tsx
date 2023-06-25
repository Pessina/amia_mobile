import { ReactNode } from 'react';
import { StyledForm } from './styles';

export type FormProps = {
  children: ReactNode;
};

export const Form: React.FC<FormProps> = ({ children }) => {
  return <StyledForm>{children}</StyledForm>;
};
