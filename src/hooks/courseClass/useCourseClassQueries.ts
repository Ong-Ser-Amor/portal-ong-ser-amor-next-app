import { useCallback, useEffect, useState } from 'react';
import { CourseClass } from '@/interfaces/CourseClass';
import { courseService } from '@/services/course/courseService';
import { courseClassService } from '@/services/courseClass/courseClassService';

export const useCourseClasses = (courseId: number, page = 1, limit = 10) => {
  const [courseClasses, setCourseClasses] = useState<CourseClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [meta, setMeta] = useState<{
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  } | null>(null);

  const fetchCourseClasses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseService.getCourseClasses(courseId, page, limit);
      
      setCourseClasses(response.data ?? []);
      setMeta(response.meta);
    } catch (err) {
      setError(err as Error);
      console.error('Erro ao buscar turmas do curso:', err);
      setCourseClasses([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [courseId, page, limit]);

  useEffect(() => {
    fetchCourseClasses();
  }, [fetchCourseClasses]);

  const refetch = useCallback(() => {
    fetchCourseClasses();
  }, [fetchCourseClasses]);

  return { courseClasses, loading, error, meta, refetch };
};

export const useCourseClass = (id: number) => {
  const [courseClass, setCourseClass] = useState<CourseClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourseClass = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseClassService.getCourseClass(id);
      setCourseClass(data);
    } catch (err) {
      setError(err as Error);
      console.error('Erro ao buscar turma:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseClass();
  }, [fetchCourseClass]);

  const refetch = useCallback(() => {
    fetchCourseClass();
  }, [fetchCourseClass]);

  return { courseClass, loading, error, refetch };
};
