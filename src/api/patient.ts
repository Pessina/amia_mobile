import Config from 'react-native-config';
import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { isNil, isEmpty } from 'lodash';
import qs from 'qs';

const BASE_URL = Config.REACT_APP_API_URL;

export type Patient = {
  name: string;
  assignedId?: string;
};

export enum PatientQueryStrings {
  PATIENTS = 'PATIENTS',
}

export const useCreatePatient = (queryClient: QueryClient) => {
  return useMutation((data: Patient) => axios.post<Patient>(`${BASE_URL}/patient`, data), {
    onError: (error) => {
      console.error(JSON.stringify(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries([PatientQueryStrings.PATIENTS]);
    },
  });
};

export const useSearchPatients = (id?: string, name?: string) => {
  const ENDPOINT = '/patient/search';

  return useQuery(
    [PatientQueryStrings.PATIENTS, id, name],
    () => {
      const params = qs.stringify({
        id: !isNil(id) && !isEmpty(id) ? encodeURIComponent(id) : undefined,
        name: !isNil(name) && !isEmpty(name) ? encodeURIComponent(name) : undefined,
      });

      return axios.get<Patient[]>(`${BASE_URL}${ENDPOINT}?${params}`);
    },
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
    }
  );
};
