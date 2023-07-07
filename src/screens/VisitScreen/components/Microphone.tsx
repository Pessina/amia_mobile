import { View } from 'react-native';
import { Button } from '../../../components/Button/Button';
import React, { useState } from 'react';
import { NativeModules } from 'react-native';
import { processAudio } from '../../../api/visit';
import { useRequestAudioPermissionAndroid } from '../../../permissions/android/permissions';

export const Microphone: React.FC = () => {
  const { AudioModule } = NativeModules;
  const [isRecording, setIsRecording] = useState(false);
  const { requestAudioPermissionAndroid } = useRequestAudioPermissionAndroid();

  const onStartRecording = async () => {
    setIsRecording(true);
    try {
      if (await requestAudioPermissionAndroid()) {
        AudioModule.startRecording();
      }
    } catch (e) {
      console.log('startRecordingError', e);
    }
  };

  const onStopRecording = async () => {
    setIsRecording(false);
    try {
      const uri = await AudioModule.stopRecording();
      console.log(uri);
      const text = await processAudio(uri);
      console.log(text);
    } catch (e) {
      console.log('stopRecordingError', e);
    }
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop' : 'Start'}
        onPress={() => {
          if (isRecording) {
            onStopRecording();
          } else {
            onStartRecording();
          }
        }}
      />
    </View>
  );
};
