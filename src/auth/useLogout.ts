import auth from '@react-native-firebase/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(() => auth().signOut(), {
    onSuccess: () => {
      queryClient.invalidateQueries();
      queryClient.clear();
    },
  });
};
