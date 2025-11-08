'use client';

import React, { ReactNode } from 'react';
import { useThemeObserver } from '@/hooks/useThemeObserver';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'Nenhum dado encontrado',
  onRowClick,
}: TableProps<T>) {
  useThemeObserver();

  if (isLoading) {
    return (
      <div className='flex justify-center p-8'>
        <div
          className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2'
          style={{ borderColor: 'var(--accent-primary)' }}
        ></div>
      </div>
    );
  }
  return (
    <div className='overflow-x-auto mt-5'>
      <table className='w-full' style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className='text-left'
                style={{
                  padding: '15px',
                  background: 'var(--hover-bg)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='text-center'
                style={{
                  padding: '15px',
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                className={onRowClick ? 'cursor-pointer transition-colors' : ''}
                style={{
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {columns.map((column, index) => {
                  const cellContent =
                    typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor as keyof T]);

                  return (
                    <td
                      key={index}
                      className='text-left'
                      style={{
                        padding: '15px',
                        color: 'var(--text-secondary)',
                        borderBottom: '1px solid var(--border-color)',
                      }}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
