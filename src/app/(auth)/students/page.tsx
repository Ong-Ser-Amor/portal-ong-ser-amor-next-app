'use client';

import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import Pagination from '@/components/ui/Pagination';
import Table from '@/components/ui/Table';
import StudentFormContainer from '@/containers/student/StudentFormContainer';
import { Student } from '@/interfaces/Student';
import { studentService } from '@/services/student/studentService';
import { useEffect, useState } from 'react';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  const fetchStudents = async (
    page: number = 1,
    limit: number = itemsPerPage,
  ) => {
    try {
      setLoading(true);
      const response = await studentService.getStudents(page, limit);

      // A resposta agora é sempre paginada
      if (response && 'data' in response && Array.isArray(response.data)) {
        setStudents(response.data);
        setTotalPages(response.meta.totalPages);
        setCurrentPage(response.meta.currentPage);
      } else {
        console.warn('Resposta da API inesperada:', response);
        setStudents([]);
        setTotalPages(0);
        setCurrentPage(1);
      }
    } catch (err) {
      setError(
        'Erro ao carregar alunos. Por favor, tente novamente mais tarde.',
      );
      console.error('Erro ao carregar alunos:', err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, itemsPerPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    // Implementar lógica de filtragem aqui
    fetchStudents(1, itemsPerPage);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (studentId: number) => {
    setStudentToDelete(studentId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (studentToDelete === null) return;

    try {
      setLoading(true);
      await studentService.deleteStudent(studentToDelete);
      await fetchStudents(1, itemsPerPage);
      setStudentToDelete(null);
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      setError('Erro ao excluir aluno. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setDeleteConfirmOpen(false);
    setStudentToDelete(null);
  };

  const handleStudentSuccess = async () => {
    const response = await studentService.getStudents(1, itemsPerPage);
    if (response && 'data' in response && Array.isArray(response.data)) {
      setStudents(response.data);
      setTotalPages(response.meta.totalPages);
      setCurrentPage(response.meta.currentPage);
    } else {
      setStudents([]);
      setTotalPages(0);
      setCurrentPage(1);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const studentColumns = [
    { header: 'Nome', accessor: (student: Student) => student.name },
    {
      header: 'Ações',
      accessor: (student: Student) => (
        <div className='flex justify-end space-x-2'>
          <button
            onClick={() => handleEditStudent(student)}
            className='text-blue-600 hover:text-blue-900'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => handleDeleteClick(student.id)}
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
          <h2 className='mb-6 text-xl font-bold text-black'>Alunos</h2>
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
              onClick={handleAddStudent}
            >
              <FaPlus /> Novo Aluno
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
              columns={studentColumns}
              data={students}
              keyExtractor={(student) => student.id}
              isLoading={loading}
              emptyMessage='Nenhum aluno encontrado.'
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
      <StudentFormContainer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studentToEdit={editingStudent}
        onSuccess={handleStudentSuccess}
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

export default StudentsPage;
