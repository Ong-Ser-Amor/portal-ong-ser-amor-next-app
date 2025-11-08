'use client';

import { FiArrowLeft } from 'react-icons/fi';
import { useThemeObserver } from '@/hooks/useThemeObserver';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'Voltar' }: BackButtonProps) {
  useThemeObserver();

  return (
    <button
      onClick={onClick}
      className='flex items-center gap-2 transition-colors'
      style={{
        color: 'var(--accent-primary)',
        fontWeight: 600,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent-secondary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--accent-primary)';
      }}
    >
      <FiArrowLeft className='h-5 w-5' />
      <span>{label}</span>
    </button>
  );
}
