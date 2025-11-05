import { FiArrowLeft } from 'react-icons/fi';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Voltar' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className='flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900'
    >
      <FiArrowLeft className='h-5 w-5' />
      <span>{label}</span>
    </button>
  );
}
