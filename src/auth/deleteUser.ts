import auth from '@react-native-firebase/auth';

export const deleteUser = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      await user.delete();
    }
  } catch (e) {
    console.error('Failed to delete user: ', e);
  }
};
