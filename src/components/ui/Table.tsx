'use client';

import React, { ReactNode } from 'react';

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
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'Nenhum dado encontrado',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className='flex justify-center p-8'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-${column.align || 'left'} text-xs font-medium tracking-wider text-gray-700 uppercase ${column.width ? `w-${column.width}` : ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className='px-6 py-4 text-center text-sm text-gray-600'
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={keyExtractor(item)}>
                {columns.map((column, index) => {
                  const cellContent =
                    typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor as keyof T]);

                  return (
                    <td
                      key={index}
                      className={`px-6 py-4 whitespace-nowrap text-${column.align || 'left'} text-gray-900`}
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
