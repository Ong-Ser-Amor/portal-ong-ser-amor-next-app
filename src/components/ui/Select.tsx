'use client';

import React, { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { useThemeObserver } from '@/hooks/useThemeObserver';
import Label from './Label';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: Option[];
  error?: FieldError;
  labelHidden?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, options, error, labelHidden = false, ...rest }, ref) => {
    const { isDark } = useThemeObserver();
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className='mb-2'>
        {!labelHidden && <Label htmlFor={id}>{label}</Label>}
        <select
          id={id}
          ref={ref}
          className='w-full font-medium'
          style={{
            padding: '14px',
            border: `2px solid ${error ? '#ef4444' : isFocused ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            borderRadius: '8px',
            background: rest.disabled
              ? 'var(--hover-bg)'
              : 'var(--bg-secondary)',
            color: isDark ? '#f5f5f5' : '#333',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
            cursor: rest.disabled ? 'not-allowed' : 'pointer',
          }}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        >
          <option value=''>Selecione uma opção</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className='mt-1 text-sm text-red-600'>{error.message}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
