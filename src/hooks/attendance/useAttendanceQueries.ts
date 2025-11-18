import { attendanceService } from '@/services/attendance/attendanceService';
import { useQuery } from '@tanstack/react-query';

export const useAttendancesByLesson = (lessonId: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['attendances', lessonId],
    queryFn: () => attendanceService.getAttendancesByLesson(lessonId),
    enabled: !!lessonId,
    // staleTime: 0, // Opcional: para ter dados frescos sempre que abrir a chamada
  });

  return {
    attendances: data || [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
};
