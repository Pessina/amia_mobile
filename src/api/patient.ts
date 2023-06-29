import { REACT_APP_BASE_URL } from '@env';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

type Patient = {
  name: string;
  assignedId?: string;
};

export const useCreatePatient = () => {
  return useMutation(
    (data: Patient) => axios.post<Patient>(`${REACT_APP_BASE_URL}/patient`, data),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data?.data);
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
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data?.data);
      },
    }
  );
};
