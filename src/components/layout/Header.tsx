'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import ThemeSelector from './ThemeSelector';
import { useThemeObserver } from '@/hooks/useThemeObserver';

interface HeaderProps {
  children?: React.ReactNode;
}

// Helper para extrair primeiro e último nome
const getDisplayName = (fullName: string): string => {
  const names = fullName.trim().split(' ').filter(Boolean);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} ${names[1]}`;
  return `${names[0]} ${names[names.length - 1]}`;
};

// Helper para gerar iniciais para o avatar
const getInitials = (fullName: string): string => {
  const names = fullName.trim().split(' ').filter(Boolean);
  if (names.length === 0) return '?';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
};

export default function Header({ children }: HeaderProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  useThemeObserver();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header
      className='sticky top-0 z-100 flex h-20 items-center justify-between px-6'
      style={{ 
        background: 'var(--bg-secondary, #ffffff)',
        boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))' 
      }}
    >
      <div className='flex items-center'>{children}</div>
      <div className='flex items-center gap-4'>
        {/* Seletor de Tema */}
        <ThemeSelector />

        {/* User Info */}
        {user && (
          <div className='flex items-center gap-3'>
            {/* Avatar */}
            <div 
              className='flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white'
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary, #2196f3) 0%, var(--accent-secondary, #1976d2) 100%)'
              }}
            >
              {getInitials(user.name)}
            </div>
            {/* User Details */}
            <div className='hidden md:flex md:flex-col'>
              <h4 
                className='text-sm font-bold'
                style={{ color: 'var(--text-primary, #333333)' }}
              >
                {getDisplayName(user.name)}
              </h4>
              <p 
                className='text-xs'
                style={{ color: 'var(--text-secondary, #666666)' }}
              >
                Professor
              </p>
            </div>
          </div>
        )}

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          className='transition-colors'
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'var(--hover-bg, #f5f5f5)',
            color: 'var(--text-primary, #333333)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '1.2'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--border-color, #f0f0f0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--hover-bg, #f5f5f5)';
          }}
          title='Sair do sistema'
        >
          Sair
        </button>
      </div>
    </header>
  );
}
