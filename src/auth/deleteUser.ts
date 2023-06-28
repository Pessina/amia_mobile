import auth from '@react-native-firebase/auth';

export const deleteUser = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      await user.delete();
      console.log('User deleted successfully');
    }
  } catch (e) {
    console.error('Failed to delete user: ', e);
  }
};
