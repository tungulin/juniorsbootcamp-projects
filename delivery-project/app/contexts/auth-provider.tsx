import type { PropsWithChildren } from 'react';

import { createContext, use } from 'react';

import type { User } from '@/generated/api';

import { useAuthTokenLocalStorage, useUserLocalStorage } from '@/shared/localltorage';

interface AuthContextValue {
  isAuthenticated: boolean;
  token?: string;
  user?: User;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const ctx = use(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const tokenStorage = useAuthTokenLocalStorage();
  const userStorage = useUserLocalStorage();

  return (
    <AuthContext
      value={{
        token: tokenStorage.value,
        user: userStorage.value,
        isAuthenticated: !!tokenStorage.value
      }}
    >
      {children}
    </AuthContext>
  );
};
