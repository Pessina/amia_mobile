import Config from 'react-native-config';
import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

export type Patient = {
  name: string;
  assignedId?: string;
};

export const useCreatePatient = (queryClient: QueryClient) => {
  return useMutation(
    (data: Patient) => axios.post<Patient>(`${Config.REACT_APP_API_URL}/patient`, data),
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
    () => axios.get<Patient[]>(`${Config.REACT_APP_API_URL}/patient/search?&id=${id}&name=${name}`),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
    }
  );
};
