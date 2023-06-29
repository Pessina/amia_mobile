import { REACT_APP_BASE_URL } from '@env';
import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

export type Patient = {
  name: string;
  assignedId?: string;
};

export const useCreatePatient = (queryClient: QueryClient) => {
  return useMutation(
    (data: Patient) => axios.post<Patient>(`${REACT_APP_BASE_URL}/patient`, data),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['patients']);
      },
    }
  );
};

export const useSearchPatients = (id: string, name: string) => {
  return useQuery(
    ['patients', id, name],
    () => axios.get<Patient[]>(`${REACT_APP_BASE_URL}/patient/search?&id=${id}&name=${name}`),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
    }
  );
};
