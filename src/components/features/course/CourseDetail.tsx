import { Course } from '@/interfaces/Course';
import { CourseClass } from '@/interfaces/CourseClass';
import CourseClassList from '../courseClass/CourseClassList';
import { FiEdit, FiPlus } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';

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
        <div
          className='h-12 w-12 animate-spin rounded-full border-4 border-t-transparent'
          style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
        ></div>
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
    <div className='container mx-auto px-4 py-5'>
      <PageHeader 
        title={course.name} 
        breadcrumb='Detalhes do Curso'
        onBack={onBack}
      >
        <Button variant='gradient' size='small' onClick={onAddClass}>
          <FiPlus className='mr-2' /> Nova Turma
        </Button>
        <Button variant='gradient' size='small' onClick={onEditCourse}>
          <FiEdit className='mr-2' /> Editar Curso
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
            borderBottom: '2px solid var(--border-color, #f0f0f0)'
          }}
        >
          Turmas do Curso
        </h2>

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
