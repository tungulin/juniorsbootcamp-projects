'use client';

import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './auth-provider';
import { ThemeProvider } from './theme-provider';

const queryClient = new QueryClient();

export const Provider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
