import { UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { AppAxiosError } from './axios.config';
import { fetchWithAuth } from './fetch.config';

const BASE_URL = Config.REACT_APP_API_URL;

export enum VisitQueryStrings {
  VISITS = 'VISITS',
}

export type ProcessVisitRecordingData = {
  medicalRecord: {
    topics: { title: string; content: string }[];
  };
};

export type ProcessVisitRecordingResponse = {
  medicalRecord: {
    topics: { title: string; content: string }[];
  };
};

type ProcessVisitRecordingError = {
  errorCode: string;
  errorMessage: string;
  errorDetails: {
    reason: string;
  };
};

type ProcessVisitRecordingFormData = {
  patientId: string;
  timestamp: string;
  timezone: string;
  fileUri: string;
};

const handleSseResponse = async (
  url: string,
  options: RequestInit
): Promise<ProcessVisitRecordingResponse> => {
  return new Promise((resolve, reject) => {
    fetchWithAuth(url, options).then(async (response) => {
      const text = await response.text();

      let eventName = '';
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.startsWith('event: ')) {
          eventName = line.slice(6).trim();
        } else if (line.startsWith('data: ')) {
          const eventData = JSON.parse(line.slice(6));
          switch (eventName) {
            case 'success':
              resolve(eventData);
              break;
            case 'error':
              reject(eventData);
              break;
            default:
              break;
          }
        }
      }
    });
  });
};

export const useProcessVisitRecording = (): UseMutationResult<
  ProcessVisitRecordingResponse,
  ProcessVisitRecordingError,
  ProcessVisitRecordingFormData
> => {
  const mutation = useMutation<
    ProcessVisitRecordingResponse,
    ProcessVisitRecordingError,
    ProcessVisitRecordingFormData
  >(
    async (formData: ProcessVisitRecordingFormData) => {
      const url = `${BASE_URL}/visit/process-visit-recording`;

      const headers = {
        Accept: 'text/event-stream',
      };

      const body = new FormData();
      const type = formData.fileUri.substring(formData.fileUri.lastIndexOf('.') + 1);
      body.append('patientId', formData.patientId);
      body.append('timestamp', formData.timestamp);
      body.append('timezone', formData.timezone);
      body.append('audio', {
        uri: formData.fileUri,
        type: `audio/${type}`,
        name: `audio.${type}`,
      });

      return await handleSseResponse(url, { method: 'POST', headers, body });
    },
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
      retry: 3,
    }
  );

  return mutation;
};

export type VisitResponse = {
  id: number;
  visitDate: string;
  patientId: number;
};

export type VisitPayload = {
  patientId: string;
  timestamp: string;
};

export const useCreateVisit = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<VisitResponse>, AppAxiosError, VisitPayload>(
    ({ patientId, timestamp }) =>
      axios.post(`${BASE_URL}/visit`, {
        patientId,
        timestamp,
      }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries([VisitQueryStrings.VISITS, variables.patientId]);
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
    [VisitQueryStrings.VISITS, patientId],
    () => axios.get(`${BASE_URL}/visit/patient/${patientId}`),
    {
      onError: (error) => {
        console.error(JSON.stringify(error));
      },
      retry: 3,
    }
  );
};
