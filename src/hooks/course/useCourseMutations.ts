import { CourseDto } from '@/interfaces/Course';
import { courseService } from '@/services/course/courseService';
import { useState } from 'react';

export function useCreateCourse() {
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (data: CourseDto) => {
    setError(null);
    try {
      await courseService.createCourse(data);
    } catch (err) {
      setError('Erro ao criar curso.');
      throw err;
    }
  };

  return { createCourse, error };
}

export function useUpdateCourse() {
  const [error, setError] = useState<string | null>(null);

  const updateCourse = async (
    id: number,
    originalData: CourseDto,
    updatedData?: CourseDto,
  ) => {
    setError(null);
    try {
      await courseService.updateCourse(id, originalData, updatedData);
    } catch (err) {
      setError('Erro ao atualizar curso.');
      throw err;
    }
  };

  return { updateCourse, error };
}

export function useDeleteCourse() {
  const [error, setError] = useState<string | null>(null);

  const deleteCourse = async (id: number) => {
    setError(null);
    try {
      await courseService.deleteCourse(id);
    } catch (err) {
      setError('Erro ao excluir curso.');
      throw err;
    }
  };

  return { deleteCourse, error };
}
