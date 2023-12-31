import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';
import { useRequestAudioPermissionAndroid } from '../../../permissions/android/permissions';

// TODO: optimize file size after recording
export const useAudioRecording = () => {
  const { AudioModule } = NativeModules;
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasStartedRecording, setHasStartedRecording] = useState(false);
  const { requestAudioPermissionAndroid } = useRequestAudioPermissionAndroid();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
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
        setHasStartedRecording(true);
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
      setHasStartedRecording(false);
      setRecordingTime(0);
      return uri;
    } catch (e) {
      console.error('stopRecordingError', e);
    }
  };

  const pauseRecording = async () => {
    try {
      await AudioModule.pauseRecording();
      setIsRecording(false);
    } catch (e) {
      console.error('pauseRecordingError', e);
    }
  };

  const resumeRecording = async () => {
    try {
      await AudioModule.resumeRecording();
      setIsRecording(true);
    } catch (e) {
      console.error('resumeRecordingError', e);
    }
  };

  return {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    hasStartedRecording,
  };
};
