import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { AppAxiosError } from './axios.config';

const BASE_URL = Config.REACT_APP_API_URL;

export const createAudioFileFormData = (uri: string): FormData => {
  const formData = new FormData();

  const type = uri.substring(uri.lastIndexOf('.') + 1);

  formData.append('audio', {
    uri,
    type: `audio/${type}`,
    name: `audio.${type}`,
  });

  return formData;
};

export type ProcessVisitRecordingResponse = {
  transcription: string;
  medicalRecord: {
    topics: { title: string; content: string }[];
  };
};

export const useProcessVisitRecording = () => {
  return useMutation<AxiosResponse<ProcessVisitRecordingResponse>, AppAxiosError, FormData>(
    (formData) =>
      axios.post(`${BASE_URL}/visit/process-visit-recording`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
      retry: 3,
    }
  );
};

export type VisitResponse = {
  id: number;
  visitDate: string;
  patientId: number;
};

export type VisitPayload = {
  patientId: string;
  requestTimestamp: string;
};

export const useCreateVisit = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<VisitResponse>, AppAxiosError, VisitPayload>(
    ({ patientId, requestTimestamp }) =>
      axios.post(`${BASE_URL}/visit`, {
        patientId,
        requestTimestamp,
      }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['visits', variables.patientId]);
      },
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
      retry: 3,
    }
  );
};

export const useGetAllVisitsForPatient = (patientId: string) => {
  return useQuery<AxiosResponse<VisitResponse[]>, AppAxiosError>(
    ['visits', patientId],
    () => axios.get(`${BASE_URL}/visit/patient/${patientId}`),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
      retry: 3,
    }
  );
};
