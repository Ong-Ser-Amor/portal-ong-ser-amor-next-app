'use client';

import { ReactNode } from 'react';
import IconButton from './IconButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useThemeObserver } from '@/hooks/useThemeObserver';

interface CardProps {
  title: string;
  borderColor?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  badge?: {
    label: string;
    bgColor: string;
    textColor: string;
  };
  children?: ReactNode;
}

export default function Card({
  title,
  borderColor,
  onClick,
  onEdit,
  onDelete,
  badge,
  children,
}: CardProps) {
  useThemeObserver();
  return (
    <div
      onClick={onClick}
      className={`relative rounded-[15px] p-6 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{
        background: 'var(--bg-secondary, #ffffff)',
        boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        transition: 'all 0.3s',
        borderLeft: borderColor || '4px solid var(--accent-primary, #2196f3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 20px var(--card-shadow, rgba(0, 0, 0, 0.1))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))';
      }}
    >
      {/* Actions (Edit/Delete) */}
      {(onEdit || onDelete) && (
        <div
          className='absolute right-4 top-4 flex gap-2'
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <IconButton
              icon={FiEdit}
              onClick={onEdit}
              variant='primary'
              tooltip='Editar'
            />
          )}
          {onDelete && (
            <IconButton
              icon={FiTrash2}
              onClick={onDelete}
              variant='danger'
              tooltip='Excluir'
            />
          )}
        </div>
      )}

      {/* Title */}
      <h3 
        className='mb-3 text-lg font-semibold'
        style={{ color: 'var(--text-primary, #333333)' }}
      >
        {title}
      </h3>

      {/* Content */}
      {children}

      {/* Badge */}
      {badge && (
        <div className='mt-4'>
          <span
            className={`inline-block rounded-full ${badge.bgColor} px-3 py-1 text-xs font-medium ${badge.textColor}`}
          >
            {badge.label}
          </span>
        </div>
      )}
    </div>
  );
}
