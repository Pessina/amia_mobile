import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = firebase.auth().currentUser
    ? await firebase.auth().currentUser?.getIdToken()
    : null;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
    Authorization: token ? `Bearer ${token}` : '',
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
