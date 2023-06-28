import axios from 'axios';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

axios.interceptors.request.use(
  async function (config) {
    const token = firebase.auth().currentUser
      ? await firebase.auth().currentUser?.getIdToken()
      : null;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
