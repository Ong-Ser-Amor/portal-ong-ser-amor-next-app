import { apiService } from '@/services/api/apiService';
import { getChangedFields, hasNoChanges } from '@/utils/patchUtils';
import {
  Lesson,
  LessonDto,
  LessonPaginated,
  UpdateLessonDto,
} from '@/interfaces/Lesson';

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
    originalData: UpdateLessonDto,
    updatedData: UpdateLessonDto,
  ): Promise<Lesson> {
    try {
      const changes = getChangedFields(originalData, updatedData);

      if (hasNoChanges(changes)) {
        return await this.getLesson(id);
      }

      const response = await apiService.patch<Lesson>(
        `${baseUrl}/${id}`,
        changes as unknown as Record<string, unknown>,
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
    limit = 10,
  ): Promise<LessonPaginated> {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('take', String(limit));

      const response = await apiService.get<LessonPaginated>(
        `/course-classes/${courseClassId}/lessons?${params.toString()}`,
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar aulas da turma:', error);
      throw error;
    }
  },
};
