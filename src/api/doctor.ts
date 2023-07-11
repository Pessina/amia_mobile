import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { deleteUser } from '../auth/deleteUser';

interface BaseDoctor {
  email: string;
  cpf: string;
  crm: string;
}
export interface Doctor extends BaseDoctor {
  firebaseUserUID: string;
  name: string;
  specialty: string;
}

const BASE_URL = Config.REACT_APP_API_URL;

export enum DoctorQueryStrings {
  VALIDATE = 'VALIDATE',
}

export const useCreateDoctor = () =>
  useMutation((data: Doctor) => axios.post<Doctor>(`${BASE_URL}/doctor`, data), {
    onError: (error) => {
      console.error(JSON.stringify(error));
      deleteUser();
    },
  });

export const existDoctor = (doctor: BaseDoctor) =>
  axios.post<boolean>(`${BASE_URL}/doctor/exist`, doctor);
