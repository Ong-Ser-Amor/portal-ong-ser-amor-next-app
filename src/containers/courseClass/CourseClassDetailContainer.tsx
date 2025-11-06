'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useCourseClass,
  useStudentsByCourseClass,
  useTeachersByCourseClass,
} from '@/hooks/courseClass/useCourseClassQueries';
import { useLessonsByCourseClass } from '@/hooks/lesson/useLessonQueries';
import { useDeleteLesson } from '@/hooks/lesson/useLessonMutations';
import {
  useRemoveStudentFromCourseClass,
  useRemoveTeacherFromCourseClass,
} from '@/hooks/courseClass/useCourseClassMutations';
import CourseClassDetail from '@/components/features/courseClass/CourseClassDetail';
import LessonFormContainer from '@/containers/lesson/LessonFormContainer';
import CourseClassFormContainer from '@/containers/courseClass/CourseClassFormContainer';
import AddStudentModalContainer from '@/containers/courseClass/AddStudentModalContainer';
import AddTeacherModalContainer from '@/containers/courseClass/AddTeacherModalContainer';
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
  const [currentLessonPage, setCurrentLessonPage] = useState(1);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const [currentTeacherPage, setCurrentTeacherPage] = useState(1);
  const lessonsPerPage = 10;
  const studentsPerPage = 10;
  const teachersPerPage = 10;

  const {
    courseClass,
    loading: courseClassLoading,
    refetch: refetchCourseClass,
  } = useCourseClass(courseClassId);

  const {
    lessons,
    loading: lessonsLoading,
    meta: lessonMeta,
    refetch: refetchLessons,
  } = useLessonsByCourseClass(courseClassId, currentLessonPage, lessonsPerPage);

  const {
    students,
    loading: studentsLoading,
    meta: studentMeta,
    refetch: refetchStudents,
  } = useStudentsByCourseClass(
    courseClassId,
    currentStudentPage,
    studentsPerPage,
  );

  const {
    teachers,
    loading: teachersLoading,
    meta: teacherMeta,
    refetch: refetchTeachers,
  } = useTeachersByCourseClass(
    courseClassId,
    currentTeacherPage,
    teachersPerPage,
  );

  const deleteLesson = useDeleteLesson();
  const removeStudent = useRemoveStudentFromCourseClass();
  const removeTeacher = useRemoveTeacherFromCourseClass();

  const [isEditCourseClassModalOpen, setIsEditCourseClassModalOpen] =
    useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
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
        setCurrentLessonPage(1);
        refetchLessons();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao excluir aula.');
        console.error('Erro ao deletar aula:', error);
      }
    }
  };

  const handleLessonPageChange = (page: number) => {
    setCurrentLessonPage(page);
  };

  const handleStudentPageChange = (page: number) => {
    setCurrentStudentPage(page);
  };

  const handleTeacherPageChange = (page: number) => {
    setCurrentTeacherPage(page);
  };

  const handleAddStudent = () => {
    setIsAddStudentModalOpen(true);
  };

  const handleAddTeacher = () => {
    setIsAddTeacherModalOpen(true);
  };

  const handleRemoveStudent = async (studentId: number) => {
    if (confirm('Tem certeza que deseja remover este aluno da turma?')) {
      try {
        await removeStudent(courseClassId, studentId);
        toast.success('Aluno removido da turma com sucesso!');
        setCurrentStudentPage(1);
        refetchStudents();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao remover aluno da turma.');
        console.error('Erro ao remover aluno:', error);
      }
    }
  };

  const handleRemoveTeacher = async (teacherId: number) => {
    if (confirm('Tem certeza que deseja remover este professor da turma?')) {
      try {
        await removeTeacher(courseClassId, teacherId);
        toast.success('Professor removido da turma com sucesso!');
        setCurrentTeacherPage(1);
        refetchTeachers();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao remover professor da turma.');
        console.error('Erro ao remover professor:', error);
      }
    }
  };

  const handleCourseClassSuccess = () => {
    refetchCourseClass();
    setIsEditCourseClassModalOpen(false);
  };

  const handleLessonSuccess = () => {
    setCurrentLessonPage(1);
    refetchLessons();
    setIsAddLessonModalOpen(false);
    setIsEditLessonModalOpen(false);
    setSelectedLesson(null);
  };

  const handleStudentSuccess = () => {
    setCurrentStudentPage(1);
    refetchStudents();
    setIsAddStudentModalOpen(false);
  };

  const handleTeacherSuccess = () => {
    setCurrentTeacherPage(1);
    refetchTeachers();
    setIsAddTeacherModalOpen(false);
  };

  return (
    <>
      <CourseClassDetail
        courseClass={courseClass}
        lessons={lessons}
        students={students}
        teachers={teachers}
        loading={courseClassLoading || lessonsLoading}
        studentsLoading={studentsLoading}
        teachersLoading={teachersLoading}
        currentLessonPage={currentLessonPage}
        totalLessonPages={lessonMeta?.totalPages ?? 0}
        currentStudentPage={currentStudentPage}
        totalStudentPages={studentMeta?.totalPages ?? 0}
        currentTeacherPage={currentTeacherPage}
        totalTeacherPages={teacherMeta?.totalPages ?? 0}
        onLessonPageChange={handleLessonPageChange}
        onStudentPageChange={handleStudentPageChange}
        onTeacherPageChange={handleTeacherPageChange}
        onBack={handleBack}
        onEditCourseClass={handleEditCourseClass}
        onAddLesson={handleAddLesson}
        onEditLesson={handleEditLesson}
        onDeleteLesson={handleDeleteLesson}
        onAddStudent={handleAddStudent}
        onRemoveStudent={handleRemoveStudent}
        onAddTeacher={handleAddTeacher}
        onRemoveTeacher={handleRemoveTeacher}
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

      {/* Modal de Adicionar Aluno */}
      <AddStudentModalContainer
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        courseClassId={courseClassId}
        enrolledStudentIds={students.map((s) => s.id)}
        onSuccess={handleStudentSuccess}
      />

      {/* Modal de Adicionar Professor */}
      <AddTeacherModalContainer
        isOpen={isAddTeacherModalOpen}
        onClose={() => setIsAddTeacherModalOpen(false)}
        courseClassId={courseClassId}
        onSuccess={handleTeacherSuccess}
      />
    </>
  );
}
