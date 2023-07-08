import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.REACT_APP_API_URL;

export const processAudio = async (uri: string) => {
  const formData = new FormData();

  const type = uri.substring(uri.lastIndexOf('.') + 1);

  formData.append('audio', {
    uri,
    type: `audio/${type}`,
    name: `audio.${type}`,
  });

  try {
    const res = await axios.post<{ text: string }>(`${BASE_URL}/visit/process-audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.text;
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};
