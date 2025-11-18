'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLesson } from '@/hooks/lesson/useLessonQueries';
import { useAttendancesByLesson } from '@/hooks/attendance/useAttendanceQueries';
import { useDeleteAllAttendances } from '@/hooks/attendance/useAttendanceMutations';
import LessonDetail from '@/components/features/lesson/LessonDetail';
import AttendanceFormContainer from '@/containers/attendance/AttendanceFormContainer';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';

interface LessonDetailContainerProps {
  lessonId: number;
}

export default function LessonDetailContainer({
  lessonId,
}: LessonDetailContainerProps) {
  const router = useRouter();

  const { lesson, loading: lessonLoading } = useLesson(lessonId);
  const { attendances, loading: attendancesLoading } =
    useAttendancesByLesson(lessonId);

  const { mutateAsync: deleteAllAttendances, isPending: isDeleting } =
    useDeleteAllAttendances();

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleBack = () => {
    if (lesson?.courseClassId) {
      router.push(`/course-classes/${lesson.courseClassId}`);
    } else {
      router.back();
    }
  };

  const handleRegisterAttendance = () => {
    setIsAttendanceModalOpen(true);
  };

  const handleDeleteAttendanceClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteAttendanceConfirm = async () => {
    try {
      await deleteAllAttendances(lessonId);

      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Erro ao deletar chamada:', error);
    }
  };

  const handleAttendanceSuccess = () => {
    setIsAttendanceModalOpen(false);
  };

  return (
    <>
      <LessonDetail
        lesson={lesson}
        attendances={attendances}
        loading={lessonLoading || attendancesLoading}
        onBack={handleBack}
        onRegisterAttendance={handleRegisterAttendance}
        onDeleteAttendance={handleDeleteAttendanceClick}
      />

      {lesson && (
        <AttendanceFormContainer
          isOpen={isAttendanceModalOpen}
          onClose={() => setIsAttendanceModalOpen(false)}
          lessonId={lessonId}
          courseClassId={lesson.courseClassId}
          existingAttendances={attendances}
          onSuccess={handleAttendanceSuccess}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteAttendanceConfirm}
        message='Tem certeza que deseja excluir TODA a chamada desta aula? Esta ação não pode ser desfeita.'
        isLoading={isDeleting}
      />
    </>
  );
}
