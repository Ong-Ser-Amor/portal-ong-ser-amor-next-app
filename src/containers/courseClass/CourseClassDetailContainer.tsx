'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useCourseClass,
  useStudentsByCourseClass,
  useTeachersByCourseClass,
} from '@/hooks/courseClass/useCourseClassQueries';
import {
  useRemoveStudentFromCourseClass,
  useRemoveTeacherFromCourseClass,
} from '@/hooks/courseClass/useCourseClassMutations';
import { useLessonsByCourseClass } from '@/hooks/lesson/useLessonQueries';
import { useDeleteLesson } from '@/hooks/lesson/useLessonMutations';
import CourseClassDetail from '@/components/features/courseClass/CourseClassDetail';
import LessonFormContainer from '@/containers/lesson/LessonFormContainer';
import CourseClassFormContainer from '@/containers/courseClass/CourseClassFormContainer';
import AddStudentModalContainer from '@/containers/courseClass/AddStudentModalContainer';
import AddTeacherModalContainer from '@/containers/courseClass/AddTeacherModalContainer';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import { Lesson } from '@/interfaces/Lesson';

interface CourseClassDetailContainerProps {
  courseClassId: number;
}

export default function CourseClassDetailContainer({
  courseClassId,
}: CourseClassDetailContainerProps) {
  const router = useRouter();

  // Estados de Paginação
  const [currentLessonPage, setCurrentLessonPage] = useState(1);
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const [currentTeacherPage, setCurrentTeacherPage] = useState(1);
  const itemsPerPage = 10;

  // Hooks de Query
  const {
    courseClass,
    loading: courseClassLoading,
    refetch: refetchCourseClass,
  } = useCourseClass(courseClassId);

  const {
    students,
    loading: studentsLoading,
    meta: studentMeta,
  } = useStudentsByCourseClass(courseClassId, currentStudentPage, itemsPerPage);

  const {
    teachers,
    loading: teachersLoading,
    meta: teacherMeta,
  } = useTeachersByCourseClass(courseClassId, currentTeacherPage, itemsPerPage);

  const {
    lessons,
    loading: lessonsLoading,
    meta: lessonMeta,
  } = useLessonsByCourseClass(courseClassId, currentLessonPage, itemsPerPage);

  // Hooks de Mutação
  const { mutateAsync: deleteLesson, isPending: isDeletingLesson } =
    useDeleteLesson();
  const { mutateAsync: removeStudent, isPending: isRemovingStudent } =
    useRemoveStudentFromCourseClass();
  const { mutateAsync: removeTeacher, isPending: isRemovingTeacher } =
    useRemoveTeacherFromCourseClass();

  // Estados de Modal (Formulários)
  const [isEditCourseClassModalOpen, setIsEditCourseClassModalOpen] =
    useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);

  // Estados para Modal de Confirmação
  // Aula
  const [deleteLessonConfirmOpen, setDeleteLessonConfirmOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<number | null>(null);

  // Aluno
  const [removeStudentConfirmOpen, setRemoveStudentConfirmOpen] =
    useState(false);
  const [studentToRemove, setStudentToRemove] = useState<number | null>(null);

  // Professor
  const [removeTeacherConfirmOpen, setRemoveTeacherConfirmOpen] =
    useState(false);
  const [teacherToRemove, setTeacherToRemove] = useState<number | null>(null);

  const handleBack = () => {
    if (courseClass?.course?.id) {
      router.push(`/courses/${courseClass.course.id}`);
    } else {
      router.push('/courses');
    }
  };

  // Ações da Turma
  const handleEditCourseClass = () => setIsEditCourseClassModalOpen(true);
  const handleCourseClassSuccess = () => {
    refetchCourseClass();
    setIsEditCourseClassModalOpen(false);
  };

  // Ações de Aula (Lógica Unificada)

  const handleAddLesson = () => {
    setSelectedLesson(null);
    setIsLessonModalOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsLessonModalOpen(true);
  };

  const handleDeleteLessonClick = (lessonId: number) => {
    setLessonToDelete(lessonId);
    setDeleteLessonConfirmOpen(true);
  };

  const handleDeleteLessonConfirm = async () => {
    if (lessonToDelete === null) return;

    try {
      await deleteLesson(lessonToDelete);

      setLessonToDelete(null);
      setDeleteLessonConfirmOpen(false);

      if (lessons.length === 1 && currentLessonPage > 1) {
        setCurrentLessonPage(currentLessonPage - 1);
      }
    } catch (error) {
      console.error('Erro ao deletar aula:', error);
    }
  };

  const handleLessonSuccess = () => {
    setIsLessonModalOpen(false);

    if (!selectedLesson && currentLessonPage !== 1) {
      setCurrentLessonPage(1);
    }
    setSelectedLesson(null);
  };

  const handleCloseLessonModal = () => {
    setIsLessonModalOpen(false);
    setSelectedLesson(null);
  };

  // Ações de Aluno
  const handleAddStudent = () => setIsAddStudentModalOpen(true);

  const handleRemoveStudentClick = (studentId: number) => {
    setStudentToRemove(studentId);
    setRemoveStudentConfirmOpen(true);
  };

  const handleRemoveStudentConfirm = async () => {
    if (studentToRemove === null) return;
    try {
      await removeStudent({ courseClassId, studentId: studentToRemove });

      setStudentToRemove(null);
      setRemoveStudentConfirmOpen(false);

      if (students.length === 1 && currentStudentPage > 1) {
        setCurrentStudentPage(currentStudentPage - 1);
      }
    } catch (error) {
      console.error('Erro ao remover aluno:', error);
    }
  };

  const handleStudentSuccess = () => setIsAddStudentModalOpen(false);

  // Ações de Professor
  const handleAddTeacher = () => setIsAddTeacherModalOpen(true);

  const handleRemoveTeacherClick = (teacherId: number) => {
    setTeacherToRemove(teacherId);
    setRemoveTeacherConfirmOpen(true);
  };

  const handleRemoveTeacherConfirm = async () => {
    if (teacherToRemove === null) return;
    try {
      await removeTeacher({ courseClassId, teacherId: teacherToRemove });

      setTeacherToRemove(null);
      setRemoveTeacherConfirmOpen(false);

      if (teachers.length === 1 && currentTeacherPage > 1) {
        setCurrentTeacherPage(currentTeacherPage - 1);
      }
    } catch (error) {
      console.error('Erro ao remover professor:', error);
    }
  };

  const handleTeacherSuccess = () => setIsAddTeacherModalOpen(false);

  return (
    <>
      <CourseClassDetail
        courseClass={courseClass}
        lessons={lessons}
        students={students}
        teachers={teachers}
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
        onDeleteLesson={handleDeleteLessonClick}
        onAddStudent={handleAddStudent}
        onRemoveStudent={handleRemoveStudentClick}
        onAddTeacher={handleAddTeacher}
        onRemoveTeacher={handleRemoveTeacherClick}
      />

      {/* Modais de Edição/Criação */}
      {courseClass && (
        <CourseClassFormContainer
          isOpen={isEditCourseClassModalOpen}
          onClose={() => setIsEditCourseClassModalOpen(false)}
          courseId={courseClass.course?.id ?? 0}
          courseClassToEdit={courseClass}
          onSuccess={handleCourseClassSuccess}
        />
      )}

      <LessonFormContainer
        isOpen={isLessonModalOpen}
        onClose={handleCloseLessonModal}
        courseClassId={courseClassId}
        lessonToEdit={selectedLesson}
        onSuccess={handleLessonSuccess}
      />

      <AddStudentModalContainer
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        courseClassId={courseClassId}
        enrolledStudentIds={students.map((s) => s.id)}
        onSuccess={handleStudentSuccess}
      />

      <AddTeacherModalContainer
        isOpen={isAddTeacherModalOpen}
        onClose={() => setIsAddTeacherModalOpen(false)}
        courseClassId={courseClassId}
        onSuccess={handleTeacherSuccess}
      />

      {/* Modais de Confirmação */}
      <DeleteConfirmModal
        isOpen={deleteLessonConfirmOpen}
        onClose={() => setDeleteLessonConfirmOpen(false)}
        onConfirm={handleDeleteLessonConfirm}
        message='Tem certeza que deseja excluir esta aula?'
        isLoading={isDeletingLesson}
      />

      <DeleteConfirmModal
        isOpen={removeStudentConfirmOpen}
        onClose={() => setRemoveStudentConfirmOpen(false)}
        onConfirm={handleRemoveStudentConfirm}
        message='Tem certeza que deseja remover este aluno da turma?'
        isLoading={isRemovingStudent}
      />

      <DeleteConfirmModal
        isOpen={removeTeacherConfirmOpen}
        onClose={() => setRemoveTeacherConfirmOpen(false)}
        onConfirm={handleRemoveTeacherConfirm}
        message='Tem certeza que deseja remover este professor da turma?'
        isLoading={isRemovingTeacher}
      />
    </>
  );
}
