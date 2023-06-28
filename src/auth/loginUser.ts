import auth from '@react-native-firebase/auth';

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    return await auth().signInWithEmailAndPassword(data.email, data.password);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
