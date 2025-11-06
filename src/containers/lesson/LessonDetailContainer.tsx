'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLesson } from '@/hooks/lesson/useLessonQueries';
import { useAttendancesByLesson } from '@/hooks/attendance/useAttendanceQueries';
import { useDeleteAllAttendances } from '@/hooks/attendance/useAttendanceMutations';
import LessonDetail from '@/components/features/lesson/LessonDetail';
import AttendanceFormContainer from '@/containers/attendance/AttendanceFormContainer';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface LessonDetailContainerProps {
  lessonId: number;
}

export default function LessonDetailContainer({
  lessonId,
}: LessonDetailContainerProps) {
  const router = useRouter();
  const { lesson, loading: lessonLoading } = useLesson(lessonId);
  const {
    attendances,
    loading: attendancesLoading,
    refetch: refetchAttendances,
  } = useAttendancesByLesson(lessonId);

  const deleteAllAttendances = useDeleteAllAttendances();

  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

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

  const handleDeleteAttendance = async () => {
    if (
      confirm(
        'Tem certeza que deseja excluir TODA a chamada desta aula? Esta ação não pode ser desfeita.',
      )
    ) {
      try {
        await deleteAllAttendances(lessonId);
        toast.success('Chamada excluída com sucesso!');
        refetchAttendances();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao excluir chamada.');
        console.error('Erro ao deletar chamada:', error);
      }
    }
  };

  const handleAttendanceSuccess = () => {
    refetchAttendances();
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
        onDeleteAttendance={handleDeleteAttendance}
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
    </>
  );
}
