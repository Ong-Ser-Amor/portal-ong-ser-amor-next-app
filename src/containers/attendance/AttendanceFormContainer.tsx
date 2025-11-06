'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/Modal';
import AttendanceForm from '@/components/features/attendance/AttendanceForm';
import { Attendance, AttendanceItem, BulkAttendanceDto } from '@/interfaces/Attendance';
import { Student } from '@/interfaces/Student';
import { useBulkUpsertAttendances } from '@/hooks/attendance/useAttendanceMutations';
import { courseClassService } from '@/services/courseClass/courseClassService';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface AttendanceFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: number;
  courseClassId: number;
  existingAttendances: Attendance[];
  onSuccess: () => void;
}

export default function AttendanceFormContainer({
  isOpen,
  onClose,
  lessonId,
  courseClassId,
  existingAttendances,
  onSuccess,
}: AttendanceFormContainerProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const { bulkUpsertAttendances, loading } = useBulkUpsertAttendances();

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen, courseClassId]);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const data = await courseClassService.getStudents(courseClassId);
      setStudents(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      toast.error('Erro ao carregar lista de alunos.');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleSubmit = async (attendanceItems: AttendanceItem[]) => {
    try {
      const isEditing = existingAttendances.length > 0;

      let dataToSend: AttendanceItem[];

      if (isEditing) {
        dataToSend = attendanceItems.filter((item) => {
          const existing = existingAttendances.find(
            (att) => att.student.id === item.studentId,
          );
          return (
            !existing ||
            existing.present !== item.present ||
            (existing.notes || '') !== (item.notes || '')
          );
        });

        if (dataToSend.length === 0) {
          toast.info('Nenhuma alteração detectada.');
          onClose();
          return;
        }
      } else {
        dataToSend = attendanceItems;
      }

      const bulkData: BulkAttendanceDto = {
        attendances: dataToSend,
      };

      await bulkUpsertAttendances(lessonId, bulkData);
      toast.success(
        isEditing
          ? 'Chamada atualizada com sucesso!'
          : 'Chamada registrada com sucesso!',
      );
      onSuccess();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao salvar chamada.');
      console.error('Erro ao salvar chamada:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        existingAttendances.length > 0 ? 'Editar Chamada' : 'Registrar Chamada'
      }
      size='xl'
    >
      {loadingStudents ? (
        <div className='flex justify-center py-8'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500'></div>
        </div>
      ) : (
        <AttendanceForm
          students={students}
          existingAttendances={existingAttendances}
          isLoading={loading}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
