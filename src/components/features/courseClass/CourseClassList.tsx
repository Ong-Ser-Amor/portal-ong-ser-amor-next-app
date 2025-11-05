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
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }

  // Garantir que courseClasses seja sempre um array
  const classList = Array.isArray(courseClasses) ? courseClasses : [];

  if (!classList || classList.length === 0) {
    return (
      <div className='rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center'>
        <p className='text-gray-500'>Nenhuma turma cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
          className='mt-6 flex justify-center'
        />
      )}
    </div>
  );
}
