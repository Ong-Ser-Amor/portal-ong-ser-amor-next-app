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
  const itemsPerPage = 10;

  const {
    courseClass,
    loading: courseClassLoading,
    refetch: refetchCourseClass,
  } = useCourseClass(courseClassId);

  const {
    students,
    loading: studentsLoading,
    meta: studentMeta,
    refetch: refetchStudents,
  } = useStudentsByCourseClass(courseClassId, currentStudentPage, itemsPerPage);

  const {
    teachers,
    loading: teachersLoading,
    meta: teacherMeta,
    refetch: refetchTeachers,
  } = useTeachersByCourseClass(courseClassId, currentTeacherPage, itemsPerPage);

  const {
    lessons,
    loading: lessonsLoading,
    meta: lessonMeta,
    refetch: refetchLessons,
  } = useLessonsByCourseClass(courseClassId, currentLessonPage, itemsPerPage);

  const deleteLesson = useDeleteLesson();

  const { mutateAsync: removeStudent, isPending: isRemovingStudent } =
    useRemoveStudentFromCourseClass();
  const { mutateAsync: removeTeacher, isPending: isRemovingTeacher } =
    useRemoveTeacherFromCourseClass();

  // Estados de Modal
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

  // --- Ações da Turma ---

  const handleEditCourseClass = () => {
    setIsEditCourseClassModalOpen(true);
  };

  const handleCourseClassSuccess = () => {
    refetchCourseClass();
    setIsEditCourseClassModalOpen(false);
  };

  // --- Ações de Aula (Legacy Pattern) ---

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
        setCurrentLessonPage(1);
        refetchLessons();
      } catch (error) {
        console.error('Erro ao deletar aula:', error);
      }
    }
  };

  const handleLessonSuccess = () => {
    setCurrentLessonPage(1);
    refetchLessons();
    setIsAddLessonModalOpen(false);
    setIsEditLessonModalOpen(false);
    setSelectedLesson(null);
  };

  // --- Ações de Aluno ---

  const handleAddStudent = () => {
    setIsAddStudentModalOpen(true);
  };

  const handleRemoveStudent = async (studentId: number) => {
    if (confirm('Tem certeza que deseja remover este aluno da turma?')) {
      try {
        await removeStudent({ courseClassId, studentId });

        if (students.length === 1 && currentStudentPage > 1) {
          setCurrentStudentPage(currentStudentPage - 1);
        }
      } catch (error) {
        console.error('Erro ao remover aluno:', error);
      }
    }
  };

  const handleStudentSuccess = () => {
    setIsAddStudentModalOpen(false);
  };

  // --- Ações de Professor (New Pattern) ---

  const handleAddTeacher = () => {
    setIsAddTeacherModalOpen(true);
  };

  const handleRemoveTeacher = async (teacherId: number) => {
    if (confirm('Tem certeza que deseja remover este professor da turma?')) {
      try {
        await removeTeacher({ courseClassId, teacherId });

        if (teachers.length === 1 && currentTeacherPage > 1) {
          setCurrentTeacherPage(currentTeacherPage - 1);
        }
      } catch (error) {
        console.error('Erro ao remover professor:', error);
      }
    }
  };

  const handleTeacherSuccess = () => {
    setIsAddTeacherModalOpen(false);
  };

  return (
    <>
      <CourseClassDetail
        courseClass={courseClass}
        lessons={lessons}
        students={students}
        teachers={teachers}
        // Loading combinado
        loading={courseClassLoading || lessonsLoading}
        studentsLoading={studentsLoading || isRemovingStudent}
        teachersLoading={teachersLoading || isRemovingTeacher}
        // Paginação
        currentLessonPage={currentLessonPage}
        totalLessonPages={lessonMeta?.totalPages ?? 0}
        onLessonPageChange={setCurrentLessonPage}
        currentStudentPage={currentStudentPage}
        totalStudentPages={studentMeta?.totalPages ?? 0}
        onStudentPageChange={setCurrentStudentPage}
        currentTeacherPage={currentTeacherPage}
        totalTeacherPages={teacherMeta?.totalPages ?? 0}
        onTeacherPageChange={setCurrentTeacherPage}
        // Ações
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
