import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.REACT_APP_API_URL;

export const processAudio = async (uri: string) => {
  const formData = new FormData();

  formData.append('audio', {
    uri,
    type: `audio/${uri.substring(uri.lastIndexOf('.') + 1)}`,
    name: uri.substring(uri.lastIndexOf('/') + 1),
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
