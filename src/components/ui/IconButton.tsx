import React from 'react';

interface IconButtonProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  variant?: 'primary' | 'danger' | 'success' | 'secondary';
  size?: number;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'text-blue-600 hover:text-blue-900 focus:ring-blue-500',
  danger: 'text-red-600 hover:text-red-900 focus:ring-red-500',
  success: 'text-green-600 hover:text-green-900 focus:ring-green-500',
  secondary: 'text-gray-600 hover:text-gray-900 focus:ring-gray-500',
};

export default function IconButton({
  icon: Icon,
  onClick,
  variant = 'primary',
  size = 18,
  tooltip,
  disabled = false,
  className = '',
}: IconButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      aria-label={tooltip}
      className={`
        inline-flex items-center justify-center rounded-md p-1
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantStyles[variant]}
        ${className}
      `}
    >
      <Icon size={size} />
    </button>
  );
}
