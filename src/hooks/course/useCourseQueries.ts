import { Course, CoursePaginated } from '@/interfaces/Course';
import { courseService } from '@/services/course/courseService';
import { useCallback, useEffect, useState } from 'react';

export function useCourses(page: number = 1, limit: number = 10) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: limit,
    totalItems: 0,
  });

  const fetchCourses = useCallback(
    async (fetchPage: number, fetchLimit: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await courseService.getCourses(fetchPage, fetchLimit);

        if (response && 'data' in response && Array.isArray(response.data)) {
          setCourses(response.data);
          setMeta(response.meta);
        } else {
          console.warn('Resposta da API inesperada:', response);
          setCourses([]);
          setMeta({
            currentPage: 1,
            totalPages: 0,
            itemsPerPage: fetchLimit,
            totalItems: 0,
          });
        }
      } catch (err) {
        setError(
          'Erro ao carregar cursos. Por favor, tente novamente mais tarde.',
        );
        console.error('Erro ao carregar cursos:', err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const refetch = useCallback(
    (newPage?: number, newLimit?: number) => {
      fetchCourses(newPage ?? page, newLimit ?? limit);
    },
    [fetchCourses, page, limit],
  );

  useEffect(() => {
    fetchCourses(page, limit);
  }, [fetchCourses, page, limit]);

  return {
    courses,
    loading,
    error,
    meta,
    refetch,
  };
}

export function useCourse(id: number) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseService.getCourse(id);
      setCourse(response);
    } catch (err) {
      setError('Erro ao carregar curso.');
      console.error(`Erro ao carregar curso ${id}:`, err);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id, fetchCourse]);

  return {
    course,
    loading,
    error,
    refetch: fetchCourse,
  };
}
