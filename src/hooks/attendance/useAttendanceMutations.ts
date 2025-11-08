import { useState } from 'react';
import { attendanceService } from '@/services/attendance/attendanceService';
import { BulkAttendanceDto, Attendance } from '@/interfaces/Attendance';

export const useCreateAttendances = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createAttendances = async (
    lessonId: number,
    data: BulkAttendanceDto,
  ): Promise<Attendance[]> => {
    setLoading(true);
    setError(null);
    try {
      const result = await attendanceService.createAttendances(
        lessonId,
        data,
      );
      return result;
    } catch (err) {
      console.error('Error creating attendances:', err);
      setError('Erro ao criar chamadas.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createAttendances, loading, error };
};

export const useUpdateAttendances = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateAttendances = async (
    lessonId: number,
    data: BulkAttendanceDto,
  ): Promise<Attendance[]> => {
    setLoading(true);
    setError(null);
    try {
      const result = await attendanceService.updateAttendances(
        lessonId,
        data,
      );
      return result;
    } catch (err) {
      console.error('Error updating attendances:', err);
      setError('Erro ao atualizar chamadas.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateAttendances, loading, error };
};

export const useDeleteAllAttendances = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAllAttendances = async (lessonId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await attendanceService.deleteAllAttendances(lessonId);
    } catch (err) {
      console.error('Error deleting attendances:', err);
      setError('Erro ao excluir chamadas.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return deleteAllAttendances;
};
