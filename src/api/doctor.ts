import { REACT_APP_BASE_URL } from '@env';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type Doctor = {};

export const useCreateDoctor = () => {
  return useMutation(() => axios.post(`${REACT_APP_BASE_URL}/doctors`, {}));
};
