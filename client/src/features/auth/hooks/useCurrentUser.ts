import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../api/auth.api';

export const AUTH_QUERY_KEY = ['auth', 'current-user'] as const;

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};