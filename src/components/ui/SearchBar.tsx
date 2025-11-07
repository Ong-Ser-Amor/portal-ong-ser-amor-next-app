'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSearch?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  className = '',
  onSearch,
  onClear,
  autoFocus = false,
  debounceTime = 500,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onChange, value, debounceTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    if (onClear) {
      onClear();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`relative min-w-[300px] ${className}`}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
        <FiSearch
          size={16}
          style={{ color: 'var(--text-tertiary, #999999)' }}
        />
      </div>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className='w-full rounded-[10px] border-2 bg-transparent py-2 pr-10 pl-10 text-sm transition-all outline-none'
        style={{
          background: 'var(--bg-primary, #f5f5f5)',
          borderColor: 'var(--border-color, #f0f0f0)',
          color: 'var(--text-primary, #333333)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary, #2196f3)';
          e.currentTarget.style.boxShadow =
            '0 0 0 2px var(--accent-primary, #2196f3)33';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color, #f0f0f0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className='absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity hover:opacity-70'
          style={{ color: 'var(--text-tertiary, #999999)' }}
          type='button'
          aria-label='Limpar busca'
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
