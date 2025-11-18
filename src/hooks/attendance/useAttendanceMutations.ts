import { attendanceService } from '@/services/attendance/attendanceService';
import { BulkAttendanceDto } from '@/interfaces/Attendance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

export const useCreateAttendances = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      lessonId,
      data,
    }: {
      lessonId: number;
      data: BulkAttendanceDto;
    }) => attendanceService.createAttendances(lessonId, data),
    onSuccess: (_, variables) => {
      toast.success('Chamada registrada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['attendances', variables.lessonId],
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'criar chamadas')),
  });
};

export const useUpdateAttendances = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      lessonId,
      data,
    }: {
      lessonId: number;
      data: BulkAttendanceDto;
    }) => attendanceService.updateAttendances(lessonId, data),
    onSuccess: (_, variables) => {
      toast.success('Chamada atualizada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['attendances', variables.lessonId],
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'atualizar chamadas')),
  });
};

export const useDeleteAllAttendances = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: number) =>
      attendanceService.deleteAllAttendances(lessonId),
    onSuccess: (_, lessonId) => {
      toast.success('Chamadas excluídas com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['attendances', lessonId] });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'excluir chamadas')),
  });
};
