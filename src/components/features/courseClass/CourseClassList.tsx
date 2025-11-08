import { CourseClass } from '@/interfaces/CourseClass';
import CourseClassCard from './CourseClassCard';
import Pagination from '@/components/ui/Pagination';

interface CourseClassListProps {
  courseClasses: CourseClass[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (courseClass: CourseClass) => void;
  onDelete: (courseClassId: number) => void;
  onAdd: () => void;
}

export default function CourseClassList({
  courseClasses,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onAdd,
}: CourseClassListProps) {
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

  // Garantir que courseClasses seja sempre um array
  const classList = Array.isArray(courseClasses) ? courseClasses : [];

  if (!classList || classList.length === 0) {
    return (
      <div 
        className='rounded-lg border-2 border-dashed py-12 text-center'
        style={{ 
          borderColor: 'var(--border-color, #f0f0f0)',
          background: 'var(--bg-primary, #f5f5f5)',
          color: 'var(--text-secondary, #666666)'
        }}
      >
        <p>Nenhuma turma cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {classList.map((courseClass) => (
          <CourseClassCard
            key={courseClass.id}
            courseClass={courseClass}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
