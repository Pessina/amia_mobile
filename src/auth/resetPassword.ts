import auth from '@react-native-firebase/auth';

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
