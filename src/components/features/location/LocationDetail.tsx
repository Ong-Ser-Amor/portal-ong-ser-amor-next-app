import { FiEdit, FiPlus } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import { Location } from '@/interfaces/Location';
import { Area } from '@/interfaces/Area';
import AreaList from '../area/AreaList';
import { PaginationMeta } from '@/interfaces/Pagination';

interface LocationDetailProps {
  location: Location | null;
  areas: Area[];
  loading: boolean;
  areasMeta: PaginationMeta;
  onPageChange: (page: number) => void;
  onBack: () => void;
  onEditLocation: () => void;
  onAddArea: () => void;
  onEditArea: (area: Area) => void;
  onDeleteArea: (areaId: number) => void;
}

export default function LocationDetail({
  location,
  areas,
  loading,
  areasMeta,
  onPageChange,
  onBack,
  onEditLocation,
  onAddArea,
  onEditArea,
  onDeleteArea,
}: LocationDetailProps) {
  if (!location && loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div
          className='h-12 w-12 animate-spin rounded-full border-4 border-t-transparent'
          style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
        ></div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className='rounded-lg bg-red-50 p-6 text-center'>
        <p className='text-red-600'>Local não encontrado.</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-5'>
      <PageHeader
        title={location.name}
        breadcrumb='Detalhes do Local'
        onBack={onBack}
      >
        <Button variant='gradient' size='small' onClick={onAddArea}>
          <FiPlus className='mr-2' /> Novo Ambiente
        </Button>
        <Button variant='gradient' size='small' onClick={onEditLocation}>
          <FiEdit className='mr-2' /> Editar Local
        </Button>
      </PageHeader>

      <div
        className='rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        <h2
          className='text-xl font-semibold'
          style={{
            color: 'var(--text-primary, #333333)',
            marginTop: 0,
            marginBottom: '25px',
            paddingBottom: '10px',
            borderBottom: '2px solid var(--border-color, #f0f0f0)',
          }}
        >
          Ambientes do Local
        </h2>

        <AreaList
          areas={areas}
          loading={loading}
          meta={areasMeta}
          onPageChange={onPageChange}
          onEdit={onEditArea}
          onDelete={onDeleteArea}
          onAdd={onAddArea}
        />
      </div>
    </div>
  );
}
