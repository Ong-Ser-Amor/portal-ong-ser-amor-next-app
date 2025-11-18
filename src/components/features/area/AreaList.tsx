import Pagination from '@/components/ui/Pagination';
import { Area } from '@/interfaces/Area';
import AreaCard from './AreaCard';
import { PaginationMeta } from '@/interfaces/Pagination';

interface AreaListProps {
  areas: Area[];
  loading: boolean;
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onEdit: (area: Area) => void;
  onDelete: (areaId: number) => void;
  onAdd: () => void;
}

export default function AreaList({
  areas,
  loading,
  meta,
  onPageChange,
  onEdit,
  onDelete,
  onAdd,
}: AreaListProps) {
  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div
          className='h-8 w-8 animate-spin rounded-full border-4 border-t-transparent'
          style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
        ></div>
      </div>
    );
  }

  // Garantir que areas seja sempre um array
  const areaList = Array.isArray(areas) ? areas : [];

  if (!areaList || areaList.length === 0) {
    return (
      <div
        className='rounded-lg border-2 border-dashed py-12 text-center'
        style={{
          borderColor: 'var(--border-color, #f0f0f0)',
          background: 'var(--bg-primary, #f5f5f5)',
          color: 'var(--text-secondary, #666666)',
        }}
      >
        <p>Nenhum ambiente cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {areaList.map((area) => (
          <AreaCard
            key={area.id}
            area={area}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {meta.totalPages > 0 && (
        <Pagination meta={meta} onPageChange={onPageChange} />
      )}
    </div>
  );
}
