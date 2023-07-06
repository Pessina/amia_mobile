import { View } from 'react-native';
import { Button } from '../../../components/Button/Button';
import React from 'react';
import { NativeModules } from 'react-native';

export const Microphone: React.FC = () => {
  const { AudioModule } = NativeModules;

  console.log(AudioModule);

  return (
    <View>
      <Button
        title={'Start'}
        onPress={() => {
          AudioModule.logAudio('testName', 'testLocation');
        }}
      />
    </View>
  );
};
