'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import Label from './Label';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    // Define as classes base, incluindo a cor do texto e do placeholder
    const baseInputClasses =
      'w-full px-3 py-2 border border-gray-300 rounded-md text-black font-medium placeholder:text-gray-600 focus:ring-blue-500 focus:border-blue-500';

    // Concatena com quaisquer classes adicionais passadas via props
    const combinedClassName = `${baseInputClasses} ${className || ''}`.trim();

    return (
      <div className='mb-2'>
        <Label htmlFor={id}>{label}</Label>
        <input id={id} ref={ref} className={combinedClassName} {...props} />
        {error && <p className='mt-1 text-sm text-red-600'>{error.message}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
