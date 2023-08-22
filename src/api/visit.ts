import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { AppAxiosError } from './axios.config';
import { SSEOptions, SSEClient } from './SSEClient';

const BASE_URL = Config.REACT_APP_API_URL;

export enum VisitQueryStrings {
  VISITS = 'VISITS',
}

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

type SSEProcessVisitRecordingData = {
  type: 'success' | 'error';
  data: ProcessVisitRecordingResponse;
};

export const sseProcessVisitRecording = async (
  url: string,
  options: SSEOptions<SSEProcessVisitRecordingData>
): Promise<ProcessVisitRecordingResponse> => {
  return new Promise((resolve, reject) => {
    const sseClient = new SSEClient<SSEProcessVisitRecordingData>(url, {
      ...options,
      onMessage: (msg) => {
        if (msg.data.type === 'success') {
          resolve(msg.data.data);
          sseClient.close();
        }
      },
      onError: (error) => {
        reject(error);
      },
    });

    sseClient.connect();
  });
};

export const useProcessVisitRecording = () => {
  const mutation = useMutation<
    ProcessVisitRecordingResponse,
    ProcessVisitRecordingError,
    ProcessVisitRecordingFormData
  >(
    async ({ patientId, timestamp, timezone, fileUri }) => {
      const url = `${BASE_URL}/visit/process-visit-recording`;

      const body = new FormData();
      const type = fileUri.substring(fileUri.lastIndexOf('.') + 1);
      body.append('patientId', patientId);
      body.append('timestamp', timestamp);
      body.append('timezone', timezone);
      body.append('audio', {
        uri: fileUri,
        type: `audio/${type}`,
        name: `audio.${type}`,
      });

      return await sseProcessVisitRecording(url, {
        method: 'POST',
        body,
      });
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
