import { courseClassService } from '@/services/courseClass/courseClassService';
import { useQuery } from '@tanstack/react-query';

export function useCourseClasses(
  courseId: number,
  page: number = 1,
  limit: number = 10,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['courseClasses', courseId, page, limit],
    queryFn: () =>
      courseClassService.getCourseClassesByCourse(courseId, page, limit),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    courseClasses: data?.data ?? [],
    meta: data?.meta ?? {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: limit,
      totalItems: 0,
    },
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}

export function useCourseClass(id: number) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['courseClass', id],
    queryFn: () => courseClassService.getCourseClass(id),
    enabled: !!id,
  });

  return {
    courseClass: data ?? null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}

export function useStudentsByCourseClass(
  courseClassId: number,
  page: number = 1,
  limit: number = 10,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['courseClassStudents', courseClassId, page, limit],
    queryFn: () =>
      courseClassService.getStudentsPaginated(courseClassId, page, limit),
    enabled: !!courseClassId,
  });

  return {
    students: data?.data ?? [],
    meta: data?.meta ?? {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: limit,
      totalItems: 0,
    },
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}

export function useTeachersByCourseClass(
  courseClassId: number,
  page: number = 1,
  limit: number = 10,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['courseClassTeachers', courseClassId, page, limit],
    queryFn: () => courseClassService.getTeachers(courseClassId, page, limit),
    enabled: !!courseClassId,
  });

  return {
    teachers: data?.data ?? [],
    meta: data?.meta ?? {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: limit,
      totalItems: 0,
    },
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}
