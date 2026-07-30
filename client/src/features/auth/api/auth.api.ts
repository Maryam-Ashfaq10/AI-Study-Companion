import api from '../../../lib/axios';

import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/auth.types';

export const login = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    payload
  );

  return response.data;
};

export const register = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    payload
  );

  return response.data;
};

export const getCurrentUser =
  async (): Promise<CurrentUserResponse> => {
    const response =
      await api.get<CurrentUserResponse>('/auth/me');

    return response.data;
  };