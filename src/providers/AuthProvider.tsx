import React, { createContext, ReactNode, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';
import { styled } from 'styled-components/native';
import { StackNavigation } from '../routes';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

interface AuthContextInterface {
  user: FirebaseAuthTypes.User | null;
  isLoadingUser?: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({ user: null });

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((currUser) => {
      setIsLoadingUser(false);
      setUser(currUser);
      queryClient.invalidateQueries();

      if (currUser) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'PatientList' }],
          })
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    });

    return subscriber;
  }, [navigation, queryClient]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {isLoadingUser ? (
        <LoadingView>
          <ActivityIndicator
            size="large"
            color="#00ff00"
          />
        </LoadingView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
