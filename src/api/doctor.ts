import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { deleteUser } from '../auth/deleteUser';

export type Doctor = { name: string; email: string; cpf: string; crm: string; specialty: string };

const BASE_URL = Config.REACT_APP_API_URL;

export const useCreateDoctor = () =>
  useMutation((data: Doctor) => axios.post<Doctor>(`${BASE_URL}/doctor`, data), {
    onError: (error) => {
      console.error(JSON.stringify(error));
      deleteUser();
    },
  });
