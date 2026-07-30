import api from '../../../lib/axios';

import type{
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/auth.types';

export const login = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    '/auth/login',
    payload
  );

  return data;
};

export const register = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    '/auth/register',
    payload
  );

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');

  return data;
};