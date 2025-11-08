'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Previne hidratação inconsistente aguardando renderização no navegador
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Redireciona usuários não autenticados para a página de login
    if (!isLoading && isClient && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router, isClient]);

  // Exibe tela de carregamento durante verificação de autenticação
  if (isLoading || !isClient) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
