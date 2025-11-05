import { ReactNode } from 'react';
import IconButton from './IconButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

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
  borderColor = 'border-blue-500',
  onClick,
  onEdit,
  onDelete,
  badge,
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border-l-4 ${borderColor} bg-white p-6 shadow-md transition-shadow hover:shadow-lg ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className='mb-4 flex items-start justify-between'>
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
        {(onEdit || onDelete) && (
          <div
            className='flex space-x-1'
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
      </div>

      {children}

      {badge && (
        <div className='mt-4 flex items-center justify-between'>
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
