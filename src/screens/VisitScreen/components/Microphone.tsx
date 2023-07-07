import { View } from 'react-native';
import { Button } from '../../../components/Button/Button';
import React, { useState } from 'react';
import { NativeModules } from 'react-native';
import { processAudio } from '../../../api/visit';

export const Microphone: React.FC = () => {
  const { AudioModule } = NativeModules;
  const [isRecording, setIsRecording] = useState(false);

  const onStartRecording = () => {
    setIsRecording(true);
    AudioModule.startRecording();
  };

  const onStopRecording = async () => {
    setIsRecording(false);
    const uri = await AudioModule.stopRecording();
    const text = await processAudio(uri);
    console.log(text);
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
