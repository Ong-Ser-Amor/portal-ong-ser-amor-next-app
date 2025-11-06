import { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '@/services/attendance/attendanceService';
import { Attendance } from '@/interfaces/Attendance';

export const useAttendancesByLesson = (lessonId: number) => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendances = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAttendancesByLesson(lessonId);
      setAttendances(data);
    } catch (err) {
      console.error('Error fetching attendances:', err);
      setError('Erro ao carregar chamadas.');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  return { attendances, loading, error, refetch: fetchAttendances };
};
