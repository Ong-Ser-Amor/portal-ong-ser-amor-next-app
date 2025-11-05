import { Course, CourseDto, CoursePaginated } from '@/interfaces/Course';
import { CourseClass, CourseClassPaginated } from '@/interfaces/CourseClass';
import { apiService } from '../api/apiService';
import { getChangedFields, hasNoChanges } from '@/utils/patchUtils';

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

  async updateCourse(
    id: number,
    originalData: CourseDto,
    updatedData?: CourseDto,
  ): Promise<Course> {
    try {
      let dataToSend: Partial<CourseDto>;

      if (updatedData) {
        // Modo com comparação: detectar apenas os campos que foram alterados
        const changes = getChangedFields(originalData, updatedData);

        // Se não há mudanças, retornar o curso atual sem fazer a requisição
        if (hasNoChanges(changes)) {
          return await this.getCourse(id);
        }

        dataToSend = changes;
      } else {
        // Modo legacy: enviar todos os dados
        dataToSend = originalData;
      }

      const response = await apiService.patch<Course>(
        `${baseUrl}/${id}`,
        dataToSend as unknown as Record<string, unknown>,
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

  async getCourseClasses(
    courseId: number,
    page = 1,
    limit = 10,
  ): Promise<CourseClassPaginated> {
    try {
      const response = await apiService.get<CourseClassPaginated>(
        `${baseUrl}/${courseId}/classes?page=${page}&take=${limit}`,
      );
      
      return response;
    } catch (error) {
      console.error(`Erro ao buscar turmas do curso ${courseId}:`, error);
      throw error;
    }
  },
};
