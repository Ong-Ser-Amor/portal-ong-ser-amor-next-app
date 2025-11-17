import { lessonService } from '@/services/lesson/lessonService';
import { useQuery } from '@tanstack/react-query';

export const useLessonsByCourseClass = (
  courseClassId: number,
  page: number = 1,
  limit: number = 10,
) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['lessons', courseClassId, page, limit],
    queryFn: () =>
      lessonService.getLessonsByCourseClass(courseClassId, page, limit),
    enabled: !!courseClassId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    lessons: data?.data || [],
    meta: data?.meta || {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: limit,
      totalItems: 0,
    },
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
};

export const useLesson = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['lesson', id],
    queryFn: () => lessonService.getLesson(id),
    enabled: !!id,
  });

  return {
    lesson: data || null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
};
