import Pagination from '@/components/ui/Pagination';
import { Course } from '@/interfaces/Course';
import { FaFilter, FaPlus } from 'react-icons/fa';
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
    <div className='container mx-auto px-4'>
      <section className='py-5'>
        <div className='rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-6 text-xl font-bold text-black'>Cursos</h2>
          <div className='mb-5 flex flex-wrap items-center justify-between'>
            <div className='flex flex-wrap gap-2.5'>
              <input
                type='text'
                placeholder='Buscar por nome...'
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                className='rounded-md border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              onClick={onAddCourse}
            >
              <FaPlus /> Novo Curso
            </button>
          </div>
          {loading ? (
            <div className='py-8 text-center text-gray-700'>
              <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500'></div>
              Carregando cursos...
            </div>
          ) : error ? (
            <div className='py-8 text-center text-red-500'>{error}</div>
          ) : courses.length === 0 ? (
            <div className='py-8 text-center text-gray-700'>
              <p>Nenhum curso encontrado.</p>
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
              className='mt-5 flex justify-center'
            />
          )}
        </div>
      </section>
    </div>
  );
}
