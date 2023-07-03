import { format } from 'date-fns';
import { View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Text } from '../../../components/Text/Text';
import axios from 'axios';
import Config from 'react-native-config';

export const Microphone: React.FC = () => {
  const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), []);
  const [recordState, setRecordState] = useState({
    isRecording: false,
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  const [transcript, setTranscript] = useState<string>('');

  const onStartRecord = useCallback(async () => {
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordState((prev) => ({
        ...prev,
        isRecording: true,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      }));
      return;
    });
  }, [audioRecorderPlayer]);

  const onStopRecord = useCallback(async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordState((prev) => ({ ...prev, isRecording: false, recordSecs: 0 }));

    const formData = new FormData();
    const audio = {
      uri: result,
      type: 'audio/m4a',
      name: 'audio.m4a',
    };

    formData.append('audio', audio);

    try {
      const res = await axios.post<{ text: string }>(
        `${Config.REACT_APP_API_URL}/visit/process-audio`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setTranscript(res.data.text);
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  }, [audioRecorderPlayer]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return format(new Date(2023, 6, 21, hours, minutes, remainingSeconds), 'HH:mm:ss');
  };

  // const onStartPlay = useCallback(async () => {
  //   console.log('onStartPlay');
  //   const msg = await audioRecorderPlayer.startPlayer();
  //   console.log(msg);
  //   audioRecorderPlayer.addPlayBackListener((e) => {
  //     setRecordState((prev) => ({
  //       ...prev,
  //       currentPositionSec: e.currentPosition,
  //       currentDurationSec: e.duration,
  //       playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //       duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //     }));
  //     return;
  //   });
  // }, [audioRecorderPlayer]);

  // const onPausePlay = useCallback(async () => {
  //   await audioRecorderPlayer.pausePlayer();
  // }, [audioRecorderPlayer]);

  // const onStopPlay = useCallback(async () => {
  //   console.log('onStopPlay');
  //   audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  // }, [audioRecorderPlayer]);

  return (
    <View>
      <Button
        title={recordState.isRecording ? 'Stop' : 'Start'}
        onPress={() => {
          if (recordState.isRecording) {
            onStopRecord();
          } else {
            onStartRecord();
          }
        }}
      />
      <Text>{formatDuration(recordState.recordSecs)}</Text>
      <Text>{recordState.recordTime}</Text>
      <Text>{transcript}</Text>
    </View>
  );
};
