'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { SignInDto } from '@/interfaces/auth/SignInDto';
import Cookies from 'js-cookie';
import { User } from '@/interfaces/User';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: SignInDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há um token nos cookies ao carregar a página
    const storedToken = Cookies.get('token');
    const storedUser = Cookies.get('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Erro ao parsear usuário:', e);
        Cookies.remove('user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: SignInDto) => {
    setIsLoading(true);
    try {
      const response = await authService.signIn(credentials);

      if (!response.access_token) {
        throw new Error('Token de acesso não recebido do servidor');
      }

      setToken(response.access_token);
      setUser(response.user || null);

      // Salvar nos cookies com segurança
      Cookies.set('token', response.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      if (response.user) {
        Cookies.set('user', JSON.stringify(response.user), {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
      }

      // Pequeno atraso para garantir que o estado seja atualizado antes do redirecionamento
      setTimeout(() => {
        router.push('/courses');
      }, 100);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
