import auth from '@react-native-firebase/auth';

export const login = async (data: { email: string; password: string }) => {
  try {
    return await auth().signInWithEmailAndPassword(data.email, data.password);
  } catch (e) {
    throw new Error('Login failed');
  }
};
