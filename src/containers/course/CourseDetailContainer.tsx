'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCourse } from '@/hooks/course/useCourseQueries';
import { useCourseClasses } from '@/hooks/courseClass/useCourseClassQueries';
import { useDeleteCourseClass } from '@/hooks/courseClass/useCourseClassMutations';
import CourseDetail from '@/components/features/course/CourseDetail';
import CourseFormContainer from './CourseFormContainer';
import CourseClassFormContainer from '../courseClass/CourseClassFormContainer';
import { CourseClass } from '@/interfaces/CourseClass';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface CourseDetailContainerProps {
  courseId: number;
}

export default function CourseDetailContainer({
  courseId,
}: CourseDetailContainerProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    course,
    loading: courseLoading,
    refetch: refetchCourse,
  } = useCourse(courseId);

  const {
    courseClasses,
    loading: classesLoading,
    meta,
  } = useCourseClasses(courseId, currentPage, itemsPerPage);

  const { mutateAsync: deleteCourseClass, isPending: isDeleting } =
    useDeleteCourseClass();

  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<CourseClass | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<number | null>(null);

  const handleBack = () => {
    router.push('/courses');
  };

  const handleEditCourse = () => {
    setIsEditCourseModalOpen(true);
  };

  const handleAddClass = () => {
    setIsAddClassModalOpen(true);
  };

  const handleEditClass = (courseClass: CourseClass) => {
    setSelectedClass(courseClass);
    setIsEditClassModalOpen(true);
  };

  const handleDeleteClassClick = (courseClassId: number) => {
    setClassToDelete(courseClassId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteClassConfirm = async () => {
    if (classToDelete === null) return;

    try {
      await deleteCourseClass(classToDelete);

      setClassToDelete(null);
      setDeleteConfirmOpen(false);

      if (courseClasses.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
    }
  };

  const handleCourseSuccess = () => {
    refetchCourse();
    setIsEditCourseModalOpen(false);
  };

  const handleClassSuccess = () => {
    setIsAddClassModalOpen(false);
    setIsEditClassModalOpen(false);
    setSelectedClass(null);

    if (!selectedClass && currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <CourseDetail
        course={course}
        courseClasses={courseClasses}
        loading={courseLoading || classesLoading}
        currentPage={currentPage}
        totalPages={meta?.totalPages ?? 0}
        onPageChange={handlePageChange}
        onBack={handleBack}
        onEditCourse={handleEditCourse}
        onAddClass={handleAddClass}
        onEditClass={handleEditClass}
        onDeleteClass={handleDeleteClassClick}
      />

      {/* Modal de Edição do Curso */}
      <CourseFormContainer
        isOpen={isEditCourseModalOpen}
        onClose={() => setIsEditCourseModalOpen(false)}
        courseToEdit={course}
        onSuccess={handleCourseSuccess}
      />

      {/* Modal de Adicionar Turma */}
      <CourseClassFormContainer
        isOpen={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        courseId={courseId}
        onSuccess={handleClassSuccess}
      />

      {/* Modal de Editar Turma */}
      <CourseClassFormContainer
        isOpen={isEditClassModalOpen}
        onClose={() => setIsEditClassModalOpen(false)}
        courseId={courseId}
        courseClassToEdit={selectedClass}
        onSuccess={handleClassSuccess}
      />
    </>
  );
}
