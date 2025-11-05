'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCourseClass } from '@/hooks/courseClass/useCourseClassQueries';
import { useLessonsByCourseClass } from '@/hooks/lesson/useLessonQueries';
import { useDeleteLesson } from '@/hooks/lesson/useLessonMutations';
import CourseClassDetail from '@/components/features/courseClass/CourseClassDetail';
import LessonFormContainer from '@/containers/lesson/LessonFormContainer';
import CourseClassFormContainer from '@/containers/courseClass/CourseClassFormContainer';
import { Lesson } from '@/interfaces/Lesson';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface CourseClassDetailContainerProps {
  courseClassId: number;
}

export default function CourseClassDetailContainer({
  courseClassId,
}: CourseClassDetailContainerProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    courseClass,
    loading: courseClassLoading,
    refetch: refetchCourseClass,
  } = useCourseClass(courseClassId);

  const {
    lessons,
    loading: lessonsLoading,
    meta,
    refetch: refetchLessons,
  } = useLessonsByCourseClass(courseClassId, currentPage, itemsPerPage);

  const deleteLesson = useDeleteLesson();

  const [isEditCourseClassModalOpen, setIsEditCourseClassModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleBack = () => {
    if (courseClass?.course?.id) {
      router.push(`/courses/${courseClass.course.id}`);
    } else {
      router.push('/courses');
    }
  };

  const handleEditCourseClass = () => {
    setIsEditCourseClassModalOpen(true);
  };

  const handleAddLesson = () => {
    setIsAddLessonModalOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsEditLessonModalOpen(true);
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (confirm('Tem certeza que deseja excluir esta aula?')) {
      try {
        await deleteLesson(lessonId);
        toast.success('Aula excluída com sucesso!');
        setCurrentPage(1);
        refetchLessons();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao excluir aula.');
        console.error('Erro ao deletar aula:', error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCourseClassSuccess = () => {
    refetchCourseClass();
    setIsEditCourseClassModalOpen(false);
  };

  const handleLessonSuccess = () => {
    setCurrentPage(1);
    refetchLessons();
    setIsAddLessonModalOpen(false);
    setIsEditLessonModalOpen(false);
    setSelectedLesson(null);
  };

  return (
    <>
      <CourseClassDetail
        courseClass={courseClass}
        lessons={lessons}
        loading={courseClassLoading || lessonsLoading}
        currentPage={currentPage}
        totalPages={meta?.totalPages ?? 0}
        onPageChange={handlePageChange}
        onBack={handleBack}
        onEditCourseClass={handleEditCourseClass}
        onAddLesson={handleAddLesson}
        onEditLesson={handleEditLesson}
        onDeleteLesson={handleDeleteLesson}
      />

      {/* Modal de Editar Turma */}
      {courseClass && (
        <CourseClassFormContainer
          isOpen={isEditCourseClassModalOpen}
          onClose={() => setIsEditCourseClassModalOpen(false)}
          courseId={courseClass.course?.id ?? 0}
          courseClassToEdit={courseClass}
          onSuccess={handleCourseClassSuccess}
        />
      )}

      {/* Modal de Adicionar Aula */}
      <LessonFormContainer
        isOpen={isAddLessonModalOpen}
        onClose={() => setIsAddLessonModalOpen(false)}
        courseClassId={courseClassId}
        onSuccess={handleLessonSuccess}
      />

      {/* Modal de Editar Aula */}
      <LessonFormContainer
        isOpen={isEditLessonModalOpen}
        onClose={() => {
          setIsEditLessonModalOpen(false);
          setSelectedLesson(null);
        }}
        courseClassId={courseClassId}
        lessonToEdit={selectedLesson}
        onSuccess={handleLessonSuccess}
      />
    </>
  );
}
