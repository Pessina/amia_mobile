import { View } from 'react-native';
import { Button } from '../../../components/Button/Button';
import React, { useState } from 'react';
import { NativeModules } from 'react-native';
import { processAudio } from '../../../api/visit';
import { PermissionsAndroid } from 'react-native';

export const Microphone: React.FC = () => {
  const { AudioModule } = NativeModules;
  const [isRecording, setIsRecording] = useState(false);

  async function requestAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Record Permission',
          message: 'App needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the microphone');
        return true;
      } else {
        console.log('Microphone permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  const onStartRecording = () => {
    setIsRecording(true);
    try {
      requestAudioPermission().then((res) => res && AudioModule.startRecording());
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
