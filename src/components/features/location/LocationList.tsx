import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Table from '@/components/ui/Table';
import { Location } from '@/interfaces/Location';
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { FaFilter, FaPlus } from 'react-icons/fa6';
import Pagination from '@/components/ui/Pagination';
import IconButton from '@/components/ui/IconButton';

interface LocationListProps {
  locations: Location[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  currentPage: number;
  totalPages: number;
  onSearchInputChange: (value: string) => void;
  onFilterClick: () => void;
  onAddLocation: () => void;
  onEditLocation: (location: Location) => void;
  onDeleteClick: (locationId: number) => void;
  onPageChange: (page: number) => void;
}

export default function LocationList({
  locations,
  loading,
  error,
  searchInput,
  currentPage,
  totalPages,
  onSearchInputChange,
  onFilterClick,
  onAddLocation,
  onEditLocation,
  onDeleteClick,
  onPageChange,
}: LocationListProps) {
  const locationColumns = [
    { header: 'Nome', accessor: (location: Location) => location.name },
    {
      header: 'Ações',
      accessor: (location: Location) => (
        <div className='flex justify-end space-x-1'>
          <IconButton
            icon={FiEdit}
            onClick={() => onEditLocation(location)}
            variant='primary'
            tooltip='Editar local'
          />
          <IconButton
            icon={FiTrash2}
            onClick={() => onDeleteClick(location.id)}
            variant='danger'
            tooltip='Excluir local'
          />
        </div>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <div className='container mx-auto px-4 py-5'>
      <PageHeader title='Locais' breadcrumb='Gestão de Locais'>
        <SearchBar
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder='Buscar locais...'
          onSearch={onFilterClick}
        />
        <Button variant='secondary' size='small' onClick={onFilterClick}>
          <FaFilter className='mr-2' /> Filtrar
        </Button>
        <Button variant='gradient' size='small' onClick={onAddLocation}>
          <FaPlus className='mr-2' /> Novo Local
        </Button>
      </PageHeader>

      <div
        className='rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        {loading ? (
          <div className='py-8 text-center'>
            <div
              className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2'
              style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
            />
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Carregando locais...
            </p>
          </div>
        ) : error ? (
          <div className='py-8 text-center text-red-500'>{error}</div>
        ) : locations.length === 0 ? (
          <div className='py-8 text-center'>
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Nenhum local encontrado.
            </p>
          </div>
        ) : (
          <Table
            columns={locationColumns}
            data={locations}
            keyExtractor={(location) => location.id}
            isLoading={loading}
            emptyMessage='Nenhum local encontrado.'
          />
        )}
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
