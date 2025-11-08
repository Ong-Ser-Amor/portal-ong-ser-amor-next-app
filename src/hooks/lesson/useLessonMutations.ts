import { useState } from 'react';
import { lessonService } from '@/services/lesson/lessonService';
import { Lesson, LessonDto } from '@/interfaces/Lesson';

export const useCreateLesson = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createLesson = async (lessonData: LessonDto): Promise<Lesson> => {
    setLoading(true);
    setError(null);
    try {
      const newLesson = await lessonService.createLesson(lessonData);
      return newLesson;
    } catch (err) {
      console.error('Error creating lesson:', err);
      setError('Erro ao criar aula.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createLesson, loading, error };
};

export const useUpdateLesson = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateLesson = async (
    id: number,
    lessonData: Partial<LessonDto>,
    originalData: Lesson
  ): Promise<Lesson> => {
    setLoading(true);
    setError(null);
    try {
      const updatedLesson = await lessonService.updateLesson(
        id,
        lessonData,
        originalData
      );
      return updatedLesson;
    } catch (err) {
      console.error('Error updating lesson:', err);
      setError('Erro ao atualizar aula.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateLesson, loading, error };
};

export const useDeleteLesson = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteLesson = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await lessonService.deleteLesson(id);
    } catch (err) {
      console.error('Error deleting lesson:', err);
      setError('Erro ao excluir aula.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return deleteLesson;
};
