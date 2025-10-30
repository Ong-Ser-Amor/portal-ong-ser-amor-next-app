import { createApiError } from '@/utils/errorUtils';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiService = {
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, 'GET');
  },

  async post<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, 'POST', data);
  },

  async put<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data);
  },

  async patch<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data);
  },

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, 'DELETE');
  },

  async request<T>(
    endpoint: string,
    method: string,
    data?: Record<string, unknown>,
  ): Promise<T> {
    const token = Cookies.get('token');
    const url = `${API_URL}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };
    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = '';
        let errorData: Record<string, unknown> = {};

        try {
          errorData = await response.json();
          errorMessage =
            (errorData.message as string) || (errorData.error as string) || '';
        } catch {
          // Se não conseguir ler o JSON da resposta, usa uma mensagem baseada no status
          errorMessage = '';
        }

        // Cria um erro estruturado com status para ser tratado pelos utils
        const apiError = createApiError(response.status, errorMessage, {
          response,
          errorData,
        });

        throw apiError;
      } // Para requisições DELETE ou outras que retornam 204 No Content ou nenhum conteúdo
      if (
        response.status === 204 ||
        response.headers.get('content-length') === '0'
      ) {
        return {} as T;
      }

      try {
        return await response.json();
      } catch (e) {
        if (method === 'DELETE') {
          console.log(
            'Resposta sem conteúdo JSON para um DELETE, retornando objeto vazio',
          );
          return {} as T;
        }
        throw e;
      }
    } catch (error) {
      console.error(`Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  },
};
