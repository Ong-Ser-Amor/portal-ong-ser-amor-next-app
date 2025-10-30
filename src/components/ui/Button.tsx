'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  loadingText,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
    danger:
      'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  let combinedClassName = baseStyles;
  combinedClassName += ' ' + variantStyles[variant];
  if (widthStyle) combinedClassName += ' ' + widthStyle;
  if (className) combinedClassName += ' ' + className;

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? loadingText || 'Carregando...' : children}
    </button>
  );
};

export default Button;
