import { apiService } from '@/services/api/apiService';
import { getChangedFields } from '@/utils/patchUtils';
import { Lesson, LessonDto, LessonPaginated } from '@/interfaces/Lesson';

const baseUrl = '/lessons';

export const lessonService = {
  async createLesson(data: LessonDto): Promise<Lesson> {
    try {
      const response = await apiService.post<Lesson>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error('Erro ao criar aula:', error);
      throw error;
    }
  },

  async getLesson(id: number): Promise<Lesson> {
    try {
      const response = await apiService.get<Lesson>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar aula:', error);
      throw error;
    }
  },

  async updateLesson(
    id: number,
    data: Partial<LessonDto>,
    originalData: Lesson,
  ): Promise<Lesson> {
    try {
      const changedFields = getChangedFields(originalData, data);

      if (Object.keys(changedFields).length === 0) {
        return originalData;
      }

      const response = await apiService.patch<Lesson>(
        `${baseUrl}/${id}`,
        changedFields as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error('Erro ao atualizar aula:', error);
      throw error;
    }
  },

  async deleteLesson(id: number): Promise<void> {
    try {
      await apiService.delete(`${baseUrl}/${id}`);
    } catch (error) {
      console.error('Erro ao deletar aula:', error);
      throw error;
    }
  },

  async getLessonsByCourseClass(
    courseClassId: number,
    page = 1,
    take = 10,
  ): Promise<LessonPaginated> {
    try {
      const response = await apiService.get<LessonPaginated>(
        `/course-classes/${courseClassId}/lessons?page=${page}&take=${take}`,
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar aulas da turma:', error);
      throw error;
    }
  },
};
