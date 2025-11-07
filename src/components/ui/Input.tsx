'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { useThemeObserver } from '@/hooks/useThemeObserver';
import Label from './Label';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const { isDark } = useThemeObserver();
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className='mb-2'>
        <Label htmlFor={id}>{label}</Label>
        <input
          id={id}
          ref={ref}
          className={`w-full font-medium ${className || ''}`}
          style={{
            padding: '14px',
            border: `2px solid ${isFocused ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            borderRadius: '8px',
            background: 'var(--bg-secondary)',
            color: isDark ? '#f5f5f5' : '#333',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <style jsx>{`
          input::placeholder {
            color: ${isDark ? '#999' : '#666'};
          }
        `}</style>
        {error && <p className='mt-1 text-sm text-red-600'>{error.message}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
