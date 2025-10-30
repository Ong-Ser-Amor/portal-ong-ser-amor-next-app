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

      // Armazenar o token nos cookies
      Cookies.set('token', response.access_token, { expires: 1 }); // expira em 1 dia

      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async signOut(): Promise<void> {
    Cookies.remove('token');
  },
};
