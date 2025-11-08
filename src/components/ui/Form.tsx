'use client';

import { FormHTMLAttributes, ReactNode } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  error?: string | null;
  className?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

const Form: React.FC<FormProps> = ({
  children,
  error,
  className = '',
  onRetry,
  showRetryButton = false,
  ...props
}) => {
  return (
    <form className={`space-y-6 ${className}`} {...props}>
      {children}

      {error && (
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-red-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-red-700'>{error}</p>
              {showRetryButton && onRetry && (
                <button
                  type='button'
                  onClick={onRetry}
                  className='mt-2 rounded text-sm text-red-600 underline hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
                >
                  Tentar novamente
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
