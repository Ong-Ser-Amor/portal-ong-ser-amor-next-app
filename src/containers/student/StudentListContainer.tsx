'use client';

import StudentList from '@/components/features/student/StudentList';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import StudentFormContainer from '@/containers/student/StudentFormContainer';
import { Student } from '@/interfaces/Student';
import { useDeleteStudent } from '@/hooks/student/useStudentMutations';
import { useStudents } from '@/hooks/student/useStudentQueries';
import { useState } from 'react';

const StudentListContainer: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Hooks customizados
  const { students, loading, error, meta, refetch } = useStudents(
    currentPage,
    itemsPerPage,
  );
  const { mutateAsync: deleteStudent, isPending: isSubmitting } =
    useDeleteStudent();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
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
      await deleteStudent(studentToDelete);

      setStudentToDelete(null);
      setDeleteConfirmOpen(false);

      if (students.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Erro ao excluir aluno:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setDeleteConfirmOpen(false);
    setStudentToDelete(null);
  };

  const handleStudentSuccess = async () => {
    setIsModalOpen(false);
    setEditingStudent(null);

    if (!editingStudent && currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <>
      <StudentList
        students={students}
        loading={loading}
        error={error}
        searchInput={searchInput}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        onSearchInputChange={setSearchInput}
        onFilterClick={handleFilterClick}
        onAddStudent={handleAddStudent}
        onEditStudent={handleEditStudent}
        onDeleteClick={handleDeleteClick}
        onPageChange={handlePageChange}
      />

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
        message='Tem certeza que deseja excluir este aluno?'
        isLoading={isSubmitting}
      />
    </>
  );
};

export default StudentListContainer;
