import { REACT_APP_BASE_URL } from '@env';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export type Doctor = { name: string; email: string; cpf: string; crm: string; specialty: string };

export const useCreateDoctor = () =>
  useMutation((data: Doctor) => axios.post<Doctor>(`${REACT_APP_BASE_URL}/doctor`, data), {
    onSuccess: (doctor) => console.log(doctor.data),
    onError: (error) => console.error(JSON.stringify(error)),
  });
