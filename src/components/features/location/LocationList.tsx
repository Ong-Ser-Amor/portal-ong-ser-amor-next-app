import LocationCard from './LocationCard';
import { Location } from '@/interfaces/Location';
import PageHeader from '@/components/layout/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { FaFilter } from 'react-icons/fa6';
import Pagination from '@/components/ui/Pagination';
import { PaginationMeta } from '@/interfaces/Pagination';

interface LocationListProps {
  locations: Location[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  meta: PaginationMeta;
  onSearchInputChange: (value: string) => void;
  onFilterClick: () => void;
  onAddLocation: () => void;
  onEditLocation: (location: Location) => void;
  onDeleteClick: (locationId: number) => void;
  onLocationClick?: (location: Location) => void;
  onPageChange: (page: number) => void;
}

export default function LocationList({
  locations,
  loading,
  error,
  searchInput,
  meta,
  onSearchInputChange,
  onFilterClick,
  onAddLocation,
  onEditLocation,
  onDeleteClick,
  onPageChange,
}: LocationListProps) {
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
          + Novo Local
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
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onEdit={onEditLocation}
                onDelete={onDeleteClick}
              />
            ))}
          </div>
        )}
        {meta.totalPages > 0 && (
          <Pagination meta={meta} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  );
}
