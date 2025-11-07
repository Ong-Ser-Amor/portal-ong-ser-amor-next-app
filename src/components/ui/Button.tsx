'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gradient' | 'secondary' | 'danger' | 'success';
  size?: 'default' | 'small';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  isLoading = false,
  loadingText,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center border-0 cursor-pointer font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    default: 'px-7 py-3.5 text-[15px] rounded-[10px]',
    small: 'px-5 py-2.5 text-sm rounded-[10px]',
  };

  const variantStyles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
    gradient: 'text-white shadow-sm',
    secondary: 'text-gray-700 focus:ring-blue-500',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-sm',
    success: 'text-gray-800 font-bold focus:ring-green-500',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  let combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
  if (widthStyle) combinedClassName += ' ' + widthStyle;
  if (className) combinedClassName += ' ' + className;

  const inlineStyle: React.CSSProperties = {
    ...(variant === 'gradient' && {
      background: 'linear-gradient(135deg, var(--accent-primary, #2196f3) 0%, var(--accent-secondary, #1976d2) 100%)',
    }),
    ...(variant === 'secondary' && {
      background: 'var(--hover-bg, #f5f5f5)',
    }),
    ...(variant === 'success' && {
      background: 'var(--accent-tertiary, #cddc39)',
    }),
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'gradient') {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(233, 30, 99, 0.4)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.background = 'var(--border-color, #f0f0f0)';
    } else if (variant === 'success') {
      e.currentTarget.style.background = '#c0ca33';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === 'gradient') {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '';
    } else if (variant === 'secondary') {
      e.currentTarget.style.background = 'var(--hover-bg, #f5f5f5)';
    } else if (variant === 'success') {
      e.currentTarget.style.background = 'var(--accent-tertiary, #cddc39)';
    }
  };

  return (
    <button
      className={combinedClassName}
      style={inlineStyle}
      disabled={isLoading || disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isLoading ? loadingText || 'Carregando...' : children}
    </button>
  );
};

export default Button;
