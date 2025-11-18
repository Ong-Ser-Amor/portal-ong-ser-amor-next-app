'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/Modal';
import AttendanceForm, {
  AttendanceFormData,
} from '@/components/features/attendance/AttendanceForm';
import {
  Attendance,
  AttendanceItem,
  BulkAttendanceDto,
} from '@/interfaces/Attendance';
import {
  useCreateAttendances,
  useUpdateAttendances,
} from '@/hooks/attendance/useAttendanceMutations';
import { courseClassService } from '@/services/courseClass/courseClassService';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useQuery } from '@tanstack/react-query';

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
  const { data: students = [], isLoading: loadingStudents } = useQuery({
    queryKey: ['courseClassStudentsAll', courseClassId],
    queryFn: () => courseClassService.getStudents(courseClassId),
    enabled: isOpen && !!courseClassId,
    staleTime: 1000 * 60 * 5,
  });

  const { mutateAsync: createAttendances, isPending: isCreating } =
    useCreateAttendances();
  const { mutateAsync: updateAttendances, isPending: isUpdating } =
    useUpdateAttendances();

  const loading = isCreating || isUpdating;

  const methods = useForm<AttendanceFormData>({
    defaultValues: {
      attendances: [],
    },
  });

  // Popula o formulário cruzando dados
  useEffect(() => {
    if (isOpen && students.length > 0) {
      const initialAttendances = students.map((student) => {
        const existing = existingAttendances.find(
          (att) => att.student.id === student.id,
        );
        return {
          studentId: student.id,
          studentName: student.name,
          present: existing ? existing.present : false,
          notes: existing ? existing.notes || '' : '',
        };
      });
      methods.reset({ attendances: initialAttendances });
    }
  }, [isOpen, students, existingAttendances, methods]);

  const handleFormSubmit = async (attendanceItems: AttendanceItem[]) => {
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

      if (isEditing) {
        await updateAttendances({ lessonId, data: bulkData });
      } else {
        await createAttendances({ lessonId, data: bulkData });
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao salvar chamada.');
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
          <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <AttendanceForm
            students={students}
            existingAttendances={existingAttendances}
            isLoading={loading}
            onSubmit={handleFormSubmit}
            onCancel={onClose}
          />
        </FormProvider>
      )}
    </Modal>
  );
}
