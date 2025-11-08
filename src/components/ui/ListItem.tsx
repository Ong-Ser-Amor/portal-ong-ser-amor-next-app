'use client';

import { ReactNode } from 'react';
import { useThemeObserver } from '@/hooks/useThemeObserver';

interface ListItemProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  onClick?: () => void;
}

export default function ListItem({ title, subtitle, actions, onClick }: ListItemProps) {
  useThemeObserver();

  return (
    <div
      className={`flex items-center justify-between rounded-[10px] transition-colors ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        background: 'var(--hover-bg)',
        border: '2px solid var(--border-color)',
        padding: '15px',
      }}
      onClick={onClick}
    >
      <div className='flex-1'>
        <h4 className='font-semibold text-base' style={{ color: 'var(--text-primary)', margin: 0, marginBottom: '4px' }}>
          {title}
        </h4>
        {subtitle && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className='flex items-center gap-2'>{actions}</div>}
    </div>
  );
}
