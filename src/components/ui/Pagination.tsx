'use client';

import { useEffect, useState } from 'react';
import Divider from './Divider';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  itemsPerPage,
  itemsPerPageOptions = [5, 10, 20, 50, 100],
  onItemsPerPageChange,
}) => {
  // Estado para forçar re-renderização quando o tema mudar
  const [, setThemeVersion] = useState(0);

  useEffect(() => {
    // Observa mudanças na classe do body (mudança de tema)
    const observer = new MutationObserver(() => {
      setThemeVersion((v) => v + 1);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Não renderizar paginação se houver apenas uma página
  if (totalPages <= 1) return null;

  // Função para renderizar os botões de paginação de forma limitada
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    // Sempre mostrar a primeira página
    buttons.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`rounded-lg border-2 px-3.5 py-2 text-sm font-medium transition-all ${
          1 === currentPage
            ? 'border-transparent text-white'
            : 'hover:border-current'
        }`}
        style={
          1 === currentPage
            ? {
                background: 'var(--accent-primary, #2196f3)',
                borderColor: 'var(--accent-primary, #2196f3)',
              }
            : {
                background: 'var(--bg-secondary, #ffffff)',
                borderColor: 'var(--border-color, #f0f0f0)',
                color: 'var(--text-primary, #333333)',
              }
        }
        onMouseEnter={(e) => {
          if (1 !== currentPage) {
            e.currentTarget.style.borderColor = 'var(--accent-primary, #2196f3)';
            e.currentTarget.style.color = 'var(--accent-primary, #2196f3)';
          }
        }}
        onMouseLeave={(e) => {
          if (1 !== currentPage) {
            e.currentTarget.style.borderColor = 'var(--border-color, #f0f0f0)';
            e.currentTarget.style.color = 'var(--text-primary, #333333)';
          }
        }}
      >
        1
      </button>,
    );

    // Calcula o intervalo de páginas a serem exibidas
    let startPage = Math.max(
      2,
      currentPage - Math.floor(maxVisibleButtons / 2),
    );
    const endPage = Math.min(totalPages - 1, startPage + maxVisibleButtons - 1);

    // Ajustar o intervalo se estiver próximo do início ou fim
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(2, endPage - maxVisibleButtons + 1);
    }

    // Adicionar elipse após a primeira página, se necessário
    if (startPage > 2) {
      buttons.push(
        <span
          key='ellipsis-start'
          className='px-2 py-1 text-sm font-medium'
          style={{ color: 'var(--text-primary, #333333)' }}
        >
          ...
        </span>,
      );
    }

    // Adicionar páginas do intervalo calculado
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`rounded-lg border-2 px-3.5 py-2 text-sm font-medium transition-all ${
            i === currentPage
              ? 'border-transparent text-white'
              : 'hover:border-current'
          }`}
          style={
            i === currentPage
              ? {
                  background: 'var(--accent-primary, #2196f3)',
                  borderColor: 'var(--accent-primary, #2196f3)',
                }
              : {
                  background: 'var(--bg-secondary, #ffffff)',
                  borderColor: 'var(--border-color, #f0f0f0)',
                  color: 'var(--text-primary, #333333)',
                }
          }
          onMouseEnter={(e) => {
            if (i !== currentPage) {
              e.currentTarget.style.borderColor = 'var(--accent-primary, #2196f3)';
              e.currentTarget.style.color = 'var(--accent-primary, #2196f3)';
            }
          }}
          onMouseLeave={(e) => {
            if (i !== currentPage) {
              e.currentTarget.style.borderColor = 'var(--border-color, #f0f0f0)';
              e.currentTarget.style.color = 'var(--text-primary, #333333)';
            }
          }}
        >
          {i}
        </button>,
      );
    }

    // Adicionar elipse antes da última página, se necessário
    if (endPage < totalPages - 1) {
      buttons.push(
        <span
          key='ellipsis-end'
          className='px-2 py-1 text-sm font-medium'
          style={{ color: 'var(--text-primary, #333333)' }}
        >
          ...
        </span>,
      );
    }

    // Sempre mostrar a última página, se for diferente da primeira
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`rounded-lg border-2 px-3.5 py-2 text-sm font-medium transition-all ${
            totalPages === currentPage
              ? 'border-transparent text-white'
              : 'hover:border-current'
          }`}
          style={
            totalPages === currentPage
              ? {
                  background: 'var(--accent-primary, #2196f3)',
                  borderColor: 'var(--accent-primary, #2196f3)',
                }
              : {
                  background: 'var(--bg-secondary, #ffffff)',
                  borderColor: 'var(--border-color, #f0f0f0)',
                  color: 'var(--text-primary, #333333)',
                }
          }
          onMouseEnter={(e) => {
            if (totalPages !== currentPage) {
              e.currentTarget.style.borderColor = 'var(--accent-primary, #2196f3)';
              e.currentTarget.style.color = 'var(--accent-primary, #2196f3)';
            }
          }}
          onMouseLeave={(e) => {
            if (totalPages !== currentPage) {
              e.currentTarget.style.borderColor = 'var(--border-color, #f0f0f0)';
              e.currentTarget.style.color = 'var(--text-primary, #333333)';
            }
          }}
        >
          {totalPages}
        </button>,
      );
    }

    return buttons;
  };

  // Função para lidar com a mudança de itens por página
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(Number(e.target.value));
    }
  };

  return (
    <>
      <Divider spacing="md" />
      <div
        className={`flex flex-col items-center justify-between sm:flex-row ${className}`}
      >
        {/* Seletor de itens por página - renderizado apenas se a prop onItemsPerPageChange for fornecida */}
        {onItemsPerPageChange && (
          <div className='mb-4 flex items-center sm:mb-0'>
            <span className='mr-2 text-sm font-medium text-black'>
              Itens por página:
            </span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className='rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botões de navegação entre páginas - renderizado apenas se totalPages > 1 */}
        {totalPages > 1 && (
          <div className='flex w-full justify-center'>
            <nav className='flex items-center gap-2.5'>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='rounded-lg border-2 px-3.5 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50'
              style={{
                background: 'var(--bg-secondary, #ffffff)',
                borderColor: 'var(--border-color, #f0f0f0)',
                color: 'var(--text-primary, #333333)',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.borderColor = 'var(--accent-primary, #2196f3)';
                  e.currentTarget.style.color = 'var(--accent-primary, #2196f3)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.currentTarget.style.borderColor = 'var(--border-color, #f0f0f0)';
                  e.currentTarget.style.color = 'var(--text-primary, #333333)';
                }
              }}
            >
              ← Anterior
            </button>

            {renderPageButtons()}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='rounded-lg border-2 px-3.5 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50'
              style={{
                background: 'var(--bg-secondary, #ffffff)',
                borderColor: 'var(--border-color, #f0f0f0)',
                color: 'var(--text-primary, #333333)',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.borderColor = 'var(--accent-primary, #2196f3)';
                  e.currentTarget.style.color = 'var(--accent-primary, #2196f3)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.currentTarget.style.borderColor = 'var(--border-color, #f0f0f0)';
                  e.currentTarget.style.color = 'var(--text-primary, #333333)';
                }
              }}
            >
              Próximo →
            </button>
          </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
