import Pagination from '@/components/ui/Pagination';
import Table from '@/components/ui/Table';
import { Course } from '@/interfaces/Course';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

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
  const courseColumns = [
    { header: 'Nome', accessor: (course: Course) => course.name },
    {
      header: 'Ações',
      accessor: (course: Course) => (
        <div className='flex justify-end space-x-2'>
          <button
            onClick={() => onEditCourse(course)}
            className='text-blue-600 hover:text-blue-900'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => onDeleteClick(course.id)}
            className='text-red-600 hover:text-red-900'
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
      align: 'right' as const,
    },
  ];

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
          ) : (
            <Table
              columns={courseColumns}
              data={courses}
              keyExtractor={(course) => course.id}
              isLoading={loading}
              emptyMessage='Nenhum curso encontrado.'
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
