import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  AUTH_QUERY_KEY,
  useCurrentUser,
} from '../features/auth/hooks/useCurrentUser';
import { useLogin } from '../features/auth/hooks/useLogin';
import { useRegister } from '../features/auth/hooks/useRegister';

import type {
  LoginRequest,
  RegisterRequest,
  User,
} from '../features/auth/types/auth.types';

const ACCESS_TOKEN_KEY = 'accessToken';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const currentUserQuery = useCurrentUser(Boolean(token));

  const user = currentUserQuery.data?.data ?? null;

  const saveSession = useCallback(
    (accessToken: string, authenticatedUser: User) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      setToken(accessToken);

      queryClient.setQueryData(AUTH_QUERY_KEY, {
        success: true,
        data: authenticatedUser,
      });
    },
    [queryClient]
  );

  const login = useCallback(
    async (credentials: LoginRequest): Promise<void> => {
      const response =
        await loginMutation.mutateAsync(credentials);

      saveSession(response.data.token, response.data.user);
    },
    [loginMutation, saveSession]
  );

  const register = useCallback(
    async (payload: RegisterRequest): Promise<void> => {
      const response =
        await registerMutation.mutateAsync(payload);

      saveSession(response.data.token, response.data.user);
    },
    [registerMutation, saveSession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setToken(null);

    queryClient.removeQueries({
      queryKey: AUTH_QUERY_KEY,
    });
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isInitializing:
        Boolean(token) && currentUserQuery.isPending,
      login,
      register,
      logout,
    }),
    [
      user,
      token,
      currentUserQuery.isPending,
      login,
      register,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}