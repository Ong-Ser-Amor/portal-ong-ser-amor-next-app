import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className='flex h-20 items-center justify-between bg-white px-6 shadow-md'>
      <div className='flex items-center'>{children}</div>

      <div className='flex items-center gap-5'>
        {/* User Info */}
        {user && (
          <div className='flex items-center gap-3'>
            {/* Avatar */}
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-lime-400 to-green-500 text-sm font-bold text-gray-800'>
              {getInitials(user.name)}
            </div>
            {/* User Details */}
            <div className='hidden md:flex md:flex-col'>
              <h4 className='text-sm font-bold text-gray-800'>
                {getDisplayName(user.name)}
              </h4>
              <p className='text-xs text-gray-500'>Professor</p>
            </div>
          </div>
        )}

        {/* Botão Sair */}
        <button
          onClick={handleLogout}
          className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200'
          title='Sair do sistema'
        >
          Sair
        </button>
      </div>
    </header>
  );
}
