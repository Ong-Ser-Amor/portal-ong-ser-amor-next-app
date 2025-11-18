'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { SignInDto } from '@/interfaces/auth/SignInDto';
import Cookies from 'js-cookie';
import { User } from '@/interfaces/User';
import { authService } from '@/services/authService';
import { AuthResponse } from '@/interfaces/auth/AuthResponse';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthSession: (data: AuthResponse) => void;
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

  const setAuthSession = useCallback(
    (data: AuthResponse) => {
      if (!data.access_token) return;

      setToken(data.access_token);
      setUser(data.user || null);

      Cookies.set('token', data.access_token, {
        expires: 1, // 1 dia
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      if (data.user) {
        Cookies.set('user', JSON.stringify(data.user), {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
      }

      router.push('/courses');
    },
    [router],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        setAuthSession,
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
