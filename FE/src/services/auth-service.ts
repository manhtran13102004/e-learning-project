import { apiClient } from './api-client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export const authService = {
  login(payload: LoginPayload): Promise<string> {
    return apiClient.post<string>('/auth/login', payload);
  },

  register(payload: RegisterPayload): Promise<string> {
    return apiClient.post<string>('/auth/register', payload);
  },
};
