import auth from '@react-native-firebase/auth';

export const createUser = async (data: { email: string; password: string }) => {
  try {
    return await auth().createUserWithEmailAndPassword(data.email, data.password);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
