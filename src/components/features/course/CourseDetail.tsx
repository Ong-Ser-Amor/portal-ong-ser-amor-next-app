import { Course } from '@/interfaces/Course';
import { CourseClass } from '@/interfaces/CourseClass';
import CourseClassList from '../courseClass/CourseClassList';
import { FiEdit, FiPlus } from 'react-icons/fi';
import IconButton from '@/components/ui/IconButton';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';

interface CourseDetailProps {
  course: Course | null;
  courseClasses: CourseClass[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onBack: () => void;
  onEditCourse: () => void;
  onAddClass: () => void;
  onEditClass: (courseClass: CourseClass) => void;
  onDeleteClass: (courseClassId: number) => void;
}

export default function CourseDetail({
  course,
  courseClasses,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onBack,
  onEditCourse,
  onAddClass,
  onEditClass,
  onDeleteClass,
}: CourseDetailProps) {
  if (!course && loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='rounded-lg bg-red-50 p-6 text-center'>
        <p className='text-red-600'>Curso não encontrado.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <div className='mb-4'>
          <BackButton onClick={onBack} />
        </div>

        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>{course.name}</h1>
            {course.activeClassesCount !== undefined && (
              <p className='mt-2 text-sm text-gray-600'>
                {course.activeClassesCount} turma(s) ativa(s)
              </p>
            )}
          </div>
          <IconButton
            icon={FiEdit}
            onClick={onEditCourse}
            variant='primary'
            tooltip='Editar curso'
          />
        </div>
      </div>

      {/* Classes Section */}
      <div className='rounded-lg bg-white p-6 shadow-md'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-900'>Turmas</h2>
          <Button onClick={onAddClass} variant='primary'>
            <FiPlus className='mr-2 h-5 w-5' />
            Nova Turma
          </Button>
        </div>

        <CourseClassList
          courseClasses={courseClasses}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onEdit={onEditClass}
          onDelete={onDeleteClass}
          onAdd={onAddClass}
        />
      </div>
    </div>
  );
}
