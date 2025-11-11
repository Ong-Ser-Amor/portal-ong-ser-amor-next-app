import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
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
    <div className='container mx-auto px-4'>
      <section className='py-5'>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-6 text-xl font-bold text-black'>Locais v3</h2>
          <div className='mb-5 flex flex-wrap items-center justify-between'>
            <div className='flex flex-wrap gap-2.5'>
              <input
                type='text'
                placeholder='Buscar por nome...'
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                className='rounded-md border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />

              <button
                onClick={onFilterClick}
                className='flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600'
              >
                <FaFilter /> Filtrar
              </button>
            </div>

            <button
              className='flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600'
              onClick={onAddLocation}
            >
              <FaPlus /> Novo Local
            </button>
          </div>
          {loading ? (
            <div className='py-8 text-center text-gray-700'>
              <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
              Carregando locais...
            </div>
          ) : error ? (
            <div className='py-8 text-center text-red-500'>{error}</div>
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
              className='mt-5 flex justify-center'
            />
          )}
        </div>
      </section>
    </div>
  );
}
