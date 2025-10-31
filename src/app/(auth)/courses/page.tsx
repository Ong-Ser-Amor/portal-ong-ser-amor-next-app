'use client';

import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import Pagination from '@/components/ui/Pagination';
import Table from '@/components/ui/Table';
import CourseFormContainer from '@/containers/course/CourseFormContainer';
import { Course } from '@/interfaces/Course';
import { courseService } from '@/services/course/courseService';
import { useEffect, useState } from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  const fetchCourses = async (
    page: number = 1,
    limit: number = itemsPerPage,
  ) => {
    try {
      setLoading(true);
      const response = await courseService.getCourses(page, limit);

      // A resposta agora é sempre paginada
      if (response && 'data' in response && Array.isArray(response.data)) {
        setCourses(response.data);
        setTotalPages(response.meta.totalPages);
        setCurrentPage(response.meta.currentPage);
      } else {
        console.warn('Resposta da API inesperada:', response);
        setCourses([]);
        setTotalPages(0);
        setCurrentPage(1);
      }
    } catch (err) {
      setError(
        'Erro ao carregar cursos. Por favor, tente novamente mais tarde.',
      );
      console.error('Erro ao carregar cursos:', err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, itemsPerPage);
  }, [currentPage]);

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Função para filtrar por nome
  const handleFilterClick = () => {
    // Implementar lógica de filtro
    fetchCourses(1, itemsPerPage);
  };

  // Função para abrir o modal para novo curso
  const handleAddCourse = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  // Função para abrir o modal para edição
  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  // Função para iniciar processo de exclusão
  const handleDeleteClick = (courseId: number) => {
    setCourseToDelete(courseId);
    setDeleteConfirmOpen(true);
  };

  // Função para confirmar exclusão
  const handleDeleteConfirm = async () => {
    if (courseToDelete === null) return;

    try {
      setIsSubmitting(true);
      await courseService.deleteCourse(courseToDelete);
      await fetchCourses(1, itemsPerPage);
      setCourseToDelete(null);
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error('Erro ao excluir curso:', err);
      alert('Erro ao excluir curso. Verifique o console para mais detalhes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setDeleteConfirmOpen(false);
    setCourseToDelete(null);
  };

  // Função para ser chamada pelo container após submit bem-sucedido
  const handleCourseSuccess = async () => {
    const response = await courseService.getCourses(1, itemsPerPage);
    if (response && 'data' in response && Array.isArray(response.data)) {
      setCourses(response.data);
      setTotalPages(response.meta.totalPages);
      setCurrentPage(response.meta.currentPage);
    } else {
      setCourses([]);
      setTotalPages(0);
      setCurrentPage(1);
    }
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  // Definição das colunas para a tabela de cursos
  const courseColumns = [
    { header: 'Nome', accessor: (course: Course) => course.name },
    {
      header: 'Ações',
      accessor: (course: Course) => (
        <div className='flex justify-end space-x-2'>
          <button
            onClick={() => handleEditCourse(course)}
            className='text-blue-600 hover:text-blue-900'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => handleDeleteClick(course.id)}
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
                onChange={(e) => setSearchInput(e.target.value)}
                className='rounded-md border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />

              <button
                onClick={handleFilterClick}
                className='flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600'
              >
                <FaFilter /> Filtrar
              </button>
            </div>

            <button
              className='flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600'
              onClick={handleAddCourse}
            >
              <FaPlus /> Novo Curso
            </button>
          </div>{' '}
          {loading ? (
            <div className='py-8 text-center text-gray-700'>
              <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
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
              onPageChange={handlePageChange}
              className='mt-5 flex justify-center'
            />
          )}
        </div>
      </section>
      <CourseFormContainer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseToEdit={editingCourse}
        onSuccess={handleCourseSuccess}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        message='Tem certeza que deseja excluir este curso?'
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CoursesPage;
