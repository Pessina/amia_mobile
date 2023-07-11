import React, { createContext, ReactNode, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native';
import { styled } from 'styled-components/native';
import { StackNavigation } from '../routes';
import { useNavigation } from '@react-navigation/native';
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
  const navigate = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((currUser) => {
      setIsLoadingUser(false);
      setUser(currUser);
      queryClient.invalidateQueries();
      queryClient.clear();

      if (currUser) {
        navigate.navigate('PatientList');
      } else {
        navigate.navigate('Home');
      }
    });

    return subscriber;
  }, [navigate, queryClient]);

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
