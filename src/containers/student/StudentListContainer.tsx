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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const deleteStudent = useDeleteStudent();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
    refetch(1, itemsPerPage);
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
      setIsSubmitting(true);
      await deleteStudent.deleteStudent(studentToDelete);
      setCurrentPage(1);
      refetch(1, itemsPerPage);
      setStudentToDelete(null);
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error('Erro ao excluir aluno:', err);
      alert('Erro ao excluir aluno. Verifique o console para mais detalhes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setDeleteConfirmOpen(false);
    setStudentToDelete(null);
  };

  const handleStudentSuccess = async () => {
    setCurrentPage(1);
    refetch(1, itemsPerPage);
    setIsModalOpen(false);
    setEditingStudent(null);
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
