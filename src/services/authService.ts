import { AuthResponse } from '@/interfaces/auth/AuthResponse';
import { SignInDto } from '@/interfaces/auth/SignInDto';
import Cookies from 'js-cookie';
import { apiService } from './api/apiService';

export const authService = {
  async signIn(credentials: SignInDto): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(
        '/auth/signin',
        credentials as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },
};
