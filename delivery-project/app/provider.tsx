'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './contexts/AuthProvider';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Provider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);
