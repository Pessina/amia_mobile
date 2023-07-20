import Config from 'react-native-config';
import axios, { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isNil, isEmpty } from 'lodash';
import qs from 'qs';
import { AppAxiosError } from './axios.config';

const BASE_URL = Config.REACT_APP_API_URL;

export type Patient = {
  id: string;
  name: string;
  assignedId?: string;
};

export enum PatientQueryStrings {
  PATIENTS = 'PATIENTS',
  PATIENT = 'PATIENT',
}

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<Patient>, AppAxiosError, Omit<Patient, 'id'>>(
    (data) => axios.post(`${BASE_URL}/patient`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PatientQueryStrings.PATIENTS]);
      },
    }
  );
};

export const useSearchPatients = (id?: string, name?: string) => {
  return useQuery<AxiosResponse<Patient[]>, AppAxiosError>(
    [PatientQueryStrings.PATIENTS, id, name],
    () => {
      const params = qs.stringify({
        assignedId: !isNil(id) && !isEmpty(id) ? encodeURIComponent(id) : undefined,
        name: !isNil(name) && !isEmpty(name) ? encodeURIComponent(name) : undefined,
      });

      return axios.get(`${BASE_URL}/patient/search?${params}`);
    },
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
    }
  );
};

export const useGetPatient = (id?: string) => {
  return useQuery(
    [PatientQueryStrings.PATIENT, id],
    () => axios.get<Patient>(`${BASE_URL}/patient/${id}`),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
    }
  );
};
