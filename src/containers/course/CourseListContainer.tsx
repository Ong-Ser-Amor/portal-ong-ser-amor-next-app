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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const deleteCourse = useDeleteCourse();

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
      setIsSubmitting(true);
      await deleteCourse.deleteCourse(courseToDelete);
      setCurrentPage(1);
      setCourseToDelete(null);
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error('Erro ao excluir curso:', err);
      alert('Erro ao excluir curso. Verifique o console para mais detalhes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setDeleteConfirmOpen(false);
    setCourseToDelete(null);
  };

  const handleCourseSuccess = async () => {
    setCurrentPage(1);
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  return (
    <>
      <CourseList
        courses={courses}
        loading={loading}
        error={error}
        searchInput={searchInput}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
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
