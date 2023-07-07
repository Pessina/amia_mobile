import axios from 'axios';
import Config from 'react-native-config';

export const processAudio = async (audioUri: string) => {
  const formData = new FormData();

  const audio = {
    uri: audioUri,
    type: 'audio/mp3',
    name: 'audio.mp3',
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

    return res.data.text;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};
