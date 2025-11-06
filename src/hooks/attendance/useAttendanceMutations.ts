import { useState } from 'react';
import { attendanceService } from '@/services/attendance/attendanceService';
import { BulkAttendanceDto, Attendance } from '@/interfaces/Attendance';

export const useBulkUpsertAttendances = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const bulkUpsertAttendances = async (
    lessonId: number,
    data: BulkAttendanceDto,
  ): Promise<Attendance[]> => {
    setLoading(true);
    setError(null);
    try {
      const result = await attendanceService.bulkUpsertAttendances(
        lessonId,
        data,
      );
      return result;
    } catch (err) {
      console.error('Error upserting attendances:', err);
      setError('Erro ao salvar chamadas.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bulkUpsertAttendances, loading, error };
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
