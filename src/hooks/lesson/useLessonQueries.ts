import { useState, useEffect, useCallback } from 'react';
import { lessonService } from '@/services/lesson/lessonService';
import { Lesson, LessonPaginated } from '@/interfaces/Lesson';

export const useLessonsByCourseClass = (
  courseClassId: number,
  page: number = 1,
  take: number = 10
) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<LessonPaginated['meta'] | null>(null);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await lessonService.getLessonsByCourseClass(
        courseClassId,
        page,
        take
      );
      setLessons(response.data);
      setMeta(response.meta);
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Erro ao carregar aulas.');
    } finally {
      setLoading(false);
    }
  }, [courseClassId, page, take]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return { lessons, loading, error, meta, refetch: fetchLessons };
};

export const useLesson = (id: number) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLesson = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonService.getLesson(id);
      setLesson(data);
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError('Erro ao carregar aula.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return { lesson, loading, error, refetch: fetchLesson };
};
