'use client';

import { useEffect, useState } from 'react';
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
import { Student } from '@/interfaces/Student';
import {
  useCreateAttendances,
  useUpdateAttendances,
} from '@/hooks/attendance/useAttendanceMutations';
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
  const { createAttendances, loading: createLoading } = useCreateAttendances();
  const { updateAttendances, loading: updateLoading } = useUpdateAttendances();
  const loading = createLoading || updateLoading;

  const methods = useForm<AttendanceFormData>({
    defaultValues: {
      attendances: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen, courseClassId]);

  // Reseta o formulário quando o modal abre ou quando mudam os alunos/atendances existentes
  useEffect(() => {
    if (isOpen && students.length > 0) {
      // Prepara a lista inicial de chamadas
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

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const data = await courseClassService.getStudents(courseClassId);
      setStudents(data);
    } catch (error) {
      toast.error('Erro ao carregar lista de alunos.');
    } finally {
      setLoadingStudents(false);
    }
  };

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
        await updateAttendances(lessonId, bulkData);
        toast.success('Chamada atualizada com sucesso!');
      } else {
        await createAttendances(lessonId, bulkData);
        toast.success('Chamada registrada com sucesso!');
      }

      onSuccess();
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
