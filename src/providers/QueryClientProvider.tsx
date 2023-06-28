import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

type AppQueryClientProviderProps = {
  children: ReactNode;
};

export const AppQueryClientProvider: React.FC<AppQueryClientProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
