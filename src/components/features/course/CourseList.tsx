import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import SearchBar from '@/components/ui/SearchBar';
import { Course } from '@/interfaces/Course';
import { FaFilter } from 'react-icons/fa';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  currentPage: number;
  totalPages: number;
  onSearchInputChange: (value: string) => void;
  onFilterClick: () => void;
  onAddCourse: () => void;
  onEditCourse: (course: Course) => void;
  onDeleteClick: (courseId: number) => void;
  onPageChange: (page: number) => void;
}

export default function CourseList({
  courses,
  loading,
  error,
  searchInput,
  currentPage,
  totalPages,
  onSearchInputChange,
  onFilterClick,
  onAddCourse,
  onEditCourse,
  onDeleteClick,
  onPageChange,
}: CourseListProps) {
  return (
    <div className='container mx-auto px-4 py-5'>
      <PageHeader title='Cursos' breadcrumb='Gestão de Cursos'>
        <SearchBar
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder='Buscar cursos...'
          onSearch={onFilterClick}
        />
        <Button variant='secondary' size='small' onClick={onFilterClick}>
          <FaFilter className='mr-2' /> Filtrar
        </Button>
        <Button variant='gradient' size='small' onClick={onAddCourse}>
          + Novo Curso
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
              className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2'
              style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
            />
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Carregando cursos...
            </p>
          </div>
        ) : error ? (
          <div className='py-8 text-center text-red-500'>{error}</div>
        ) : courses.length === 0 ? (
          <div className='py-8 text-center'>
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Nenhum curso encontrado.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={onEditCourse}
                onDelete={onDeleteClick}
              />
            ))}
          </div>
        )}

        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className='mt-8 flex justify-center'
          />
        )}
      </div>
    </div>
  );
}
