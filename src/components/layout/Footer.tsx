'use client';

import { useThemeObserver } from '@/hooks/useThemeObserver';

export default function Footer() {
  useThemeObserver();

  return (
    <footer
      className='px-6 py-4 text-center text-sm'
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
      }}
    >
      <p>
        © {new Date().getFullYear()} Portal Ong Ser Amor. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
