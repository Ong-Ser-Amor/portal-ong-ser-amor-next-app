import { Student, StudentPaginated, StudentDto } from '@/interfaces/Student';
import { apiService } from '../api/apiService';
import { getChangedFields, hasNoChanges } from '@/utils/patchUtils';

const baseUrl = '/students';

export const studentService = {
  async createStudent(data: StudentDto): Promise<Student> {
    try {
      const response = await apiService.post<Student>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  },

  async getStudents(page = 1, limit = 10): Promise<StudentPaginated> {
    try {
      const response = await apiService.get<StudentPaginated>(
        `${baseUrl}?page=${page}&take=${limit}`,
      );

      return response;
    } catch (error) {
      console.error('Erro ao buscar cursos paginados:', error);
      throw error;
    }
  },

  async getStudent(id: number): Promise<Student> {
    try {
      const response = await apiService.get<Student>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar aluno ${id}:`, error);
      throw error;
    }
  },

  async updateStudent(
    id: number,
    originalData: StudentDto,
    updatedData: StudentDto,
  ): Promise<Student> {
    try {
      const changes = getChangedFields(originalData, updatedData);

      // Se não há mudanças, retornar o aluno atual sem fazer a requisição
      if (hasNoChanges(changes)) {
        return await this.getStudent(id);
      }

      const response = await apiService.patch<Student>(
        `${baseUrl}/${id}`,
        changes as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error(`Erro ao atualizar aluno ${id}:`, error);
      throw error;
    }
  },

  async deleteStudent(id: number): Promise<void> {
    try {
      await apiService.delete<void>(`${baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir aluno ${id}:`, error);
      throw error;
    }
  },
};
