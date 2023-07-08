import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';
import { processAudio } from '../../../api/visit';
import { useRequestAudioPermissionAndroid } from '../../../permissions/android/permissions';

export const useAudioRecording = () => {
  const { AudioModule } = NativeModules;
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const { requestAudioPermissionAndroid } = useRequestAudioPermissionAndroid();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      if (await requestAudioPermissionAndroid()) {
        setIsRecording(true);
        AudioModule.startRecording();
      }
    } catch (e) {
      console.error('startRecordingError', e);
    }
  };

  const stopRecording = async () => {
    try {
      const uri = await AudioModule.stopRecording();
      setIsRecording(false);
      const text = await processAudio(uri);
      console.log(text);
    } catch (e) {
      console.error('stopRecordingError', e);
    }
  };

  return { isRecording, recordingTime, startRecording, stopRecording };
};
