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
      <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
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
        className='w-full pl-10 pr-10 py-2 text-sm border-2 rounded-[10px] bg-transparent outline-none focus:ring-2 focus:ring-blue-500'
        style={{
          background: 'var(--bg-primary, #f5f5f5)',
          borderColor: 'var(--border-color, #f0f0f0)',
          color: 'var(--text-primary, #333333)',
        }}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className='absolute inset-y-0 right-0 flex items-center pr-3 hover:opacity-70 transition-opacity'
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
