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

  const { course, loading: courseLoading, refetch: refetchCourse } = useCourse(courseId);
  const {
    courseClasses,
    loading: classesLoading,
    meta,
    refetch: refetchClasses,
  } = useCourseClasses(courseId, currentPage, itemsPerPage);

  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<CourseClass | null>(null);

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

  const deleteCourseClass = useDeleteCourseClass();

  const handleDeleteClass = async (courseClassId: number) => {
    if (confirm('Tem certeza que deseja excluir esta turma?')) {
      try {
        await deleteCourseClass(courseClassId);
        toast.success('Turma excluída com sucesso!');
        refetchClasses();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao excluir turma.');
        console.error('Erro ao deletar turma:', error);
      }
    }
  };

  const handleCourseSuccess = () => {
    refetchCourse();
    setIsEditCourseModalOpen(false);
  };

  const handleClassSuccess = () => {
    setCurrentPage(1);
    refetchClasses();
    setIsAddClassModalOpen(false);
    setIsEditClassModalOpen(false);
    setSelectedClass(null);
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
        onDeleteClass={handleDeleteClass}
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
