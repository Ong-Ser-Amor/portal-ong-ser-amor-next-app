import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className='flex h-16 items-center justify-between bg-white px-4 shadow-sm'>
      <div className='flex items-center'>
        {children}
        <h1 className='text-xl font-semibold text-gray-800'>
          Portal Ong Ser Amor
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className='flex items-center text-gray-600 transition-colors hover:text-red-600'
        title='Sair do sistema'
      >
        <FiLogOut size={20} className='mr-1' />
        <span>Sair</span>
      </button>
    </header>
  );
}
