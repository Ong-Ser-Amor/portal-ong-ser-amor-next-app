import { Course, CourseDto, CoursePaginated } from '@/interfaces/Course';
import { apiService } from '../api/apiService';

const baseUrl = '/courses';

export const courseService = {
  async createCourse(data: CourseDto): Promise<Course> {
    try {
      const response = await apiService.post<Course>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      throw error;
    }
  },

  async getCourses(page = 1, limit = 10): Promise<CoursePaginated> {
    try {
      const response = await apiService.get<CoursePaginated>(
        `${baseUrl}?page=${page}&take=${limit}`,
      );

      return response;
    } catch (error) {
      console.error('Erro ao buscar cursos paginados:', error);
      throw error;
    }
  },

  async getCourse(id: number): Promise<Course> {
    try {
      const response = await apiService.get<Course>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar curso ${id}:`, error);
      throw error;
    }
  },

  async updateCourse(id: number, data: CourseDto): Promise<Course> {
    try {
      const response = await apiService.patch<Course>(
        `${baseUrl}/${id}`,
        data as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error(`Erro ao atualizar curso ${id}:`, error);
      throw error;
    }
  },

  async deleteCourse(id: number): Promise<void> {
    try {
      await apiService.delete<void>(`${baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir curso ${id}:`, error);
      throw error;
    }
  },
};
