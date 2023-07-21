import { useMutation } from '@tanstack/react-query';
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

export const useProcessVisitRecording = () => {
  return useMutation<AxiosResponse<string>, AppAxiosError, FormData>(
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
