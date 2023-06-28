import auth from '@react-native-firebase/auth';

export const logout = async () => {
  try {
    return await auth().signOut();
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
