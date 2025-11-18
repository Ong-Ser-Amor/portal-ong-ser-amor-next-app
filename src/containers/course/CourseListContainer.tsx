'use client';

import CourseList from '@/components/features/course/CourseList';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import CourseFormContainer from '@/containers/course/CourseFormContainer';
import { Course } from '@/interfaces/Course';
import { useDeleteCourse } from '@/hooks/course/useCourseMutations';
import { useCourses } from '@/hooks/course/useCourseQueries';
import { useState } from 'react';

const CourseListContainer: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Hooks customizados
  const { courses, loading, error, meta, refetch } = useCourses(
    currentPage,
    itemsPerPage,
  );
  const { mutateAsync: deleteCourse, isPending: isSubmitting } =
    useDeleteCourse();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (courseId: number) => {
    setCourseToDelete(courseId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete === null) return;

    try {
      await deleteCourse(courseToDelete);

      setCourseToDelete(null);
      setDeleteConfirmOpen(false);

      // Lógica de paginação: Se esvaziou a página atual, volte uma
      if (courses.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Falha ao excluir curso:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setDeleteConfirmOpen(false);
    setCourseToDelete(null);
  };

  const handleCourseSuccess = () => {
    setIsModalOpen(false);
    setEditingCourse(null);

    // se a alteração for uma criação, volte para a primeira página
    if (!editingCourse && currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <>
      <CourseList
        courses={courses}
        loading={loading}
        error={error}
        searchInput={searchInput}
        meta={meta}
        onSearchInputChange={setSearchInput}
        onFilterClick={handleFilterClick}
        onAddCourse={handleAddCourse}
        onEditCourse={handleEditCourse}
        onDeleteClick={handleDeleteClick}
        onPageChange={handlePageChange}
      />

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
    </>
  );
};

export default CourseListContainer;
