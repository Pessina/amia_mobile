import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { deleteUser } from '../auth/deleteUser';

export type Doctor = { name: string; email: string; cpf: string; crm: string; specialty: string };

export const useCreateDoctor = () =>
  useMutation((data: Doctor) => axios.post<Doctor>(`${Config.REACT_APP_API_URL}/doctor`, data), {
    onError: (error) => {
      console.error(JSON.stringify(error));
      deleteUser();
    },
  });
