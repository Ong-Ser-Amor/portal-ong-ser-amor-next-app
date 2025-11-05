import { CourseClass, CourseClassDto, CourseClassPaginated } from '@/interfaces/CourseClass';
import { Student } from '@/interfaces/Student';
import { User } from '@/interfaces/User';
import { Lesson } from '@/interfaces/Lesson';
import { apiService } from '../api/apiService';
import { getChangedFields, hasNoChanges } from '@/utils/patchUtils';

const baseUrl = '/course-classes';

interface AddStudentDto {
  studentId: number;
}

interface AddTeacherDto {
  teacherId: number;
}

export const courseClassService = {
  async getCourseClassesByCourse(
    courseId: number,
    page = 1,
    limit = 10,
  ): Promise<CourseClassPaginated> {
    try {
      const response = await apiService.get<CourseClassPaginated>(
        `/courses/${courseId}/classes?page=${page}&take=${limit}`,
      );
      
      return response;
    } catch (error) {
      console.error(`Erro ao buscar turmas do curso ${courseId}:`, error);
      throw error;
    }
  },

  async createCourseClass(data: CourseClassDto): Promise<CourseClass> {
    try {
      const response = await apiService.post<CourseClass>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      throw error;
    }
  },

  async getCourseClass(id: number): Promise<CourseClass> {
    try {
      const response = await apiService.get<CourseClass>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar turma ${id}:`, error);
      throw error;
    }
  },

  async updateCourseClass(
    id: number,
    originalData: CourseClassDto,
    updatedData?: CourseClassDto,
  ): Promise<CourseClass> {
    try {
      let dataToSend: Partial<CourseClassDto>;

      if (updatedData) {
        // Modo com comparação: detectar apenas os campos que foram alterados
        const changes = getChangedFields(originalData, updatedData);

        // Se não há mudanças, retornar a turma atual sem fazer a requisição
        if (hasNoChanges(changes)) {
          return await this.getCourseClass(id);
        }

        dataToSend = changes;
      } else {
        // Modo legacy: enviar todos os dados
        dataToSend = originalData;
      }

      const response = await apiService.patch<CourseClass>(
        `${baseUrl}/${id}`,
        dataToSend as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error(`Erro ao atualizar turma ${id}:`, error);
      throw error;
    }
  },

  async deleteCourseClass(id: number): Promise<void> {
    try {
      await apiService.delete<void>(`${baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir turma ${id}:`, error);
      throw error;
    }
  },

  // ========== Métodos de Relacionamento: Alunos ==========

  async addStudent(courseClassId: number, studentId: number): Promise<void> {
    try {
      const data: AddStudentDto = { studentId };
      await apiService.post<void>(
        `${baseUrl}/${courseClassId}/students`,
        data as unknown as Record<string, unknown>,
      );
    } catch (error) {
      console.error(
        `Erro ao adicionar aluno ${studentId} na turma ${courseClassId}:`,
        error,
      );
      throw error;
    }
  },

  async getStudents(courseClassId: number): Promise<Student[]> {
    try {
      const response = await apiService.get<Student[]>(
        `${baseUrl}/${courseClassId}/students`,
      );
      return response;
    } catch (error) {
      console.error(`Erro ao buscar alunos da turma ${courseClassId}:`, error);
      throw error;
    }
  },

  async removeStudent(courseClassId: number, studentId: number): Promise<void> {
    try {
      await apiService.delete<void>(
        `${baseUrl}/${courseClassId}/students/${studentId}`,
      );
    } catch (error) {
      console.error(
        `Erro ao remover aluno ${studentId} da turma ${courseClassId}:`,
        error,
      );
      throw error;
    }
  },

  // ========== Métodos de Relacionamento: Professores ==========

  async addTeacher(courseClassId: number, teacherId: number): Promise<void> {
    try {
      const data: AddTeacherDto = { teacherId };
      await apiService.post<void>(
        `${baseUrl}/${courseClassId}/teachers`,
        data as unknown as Record<string, unknown>,
      );
    } catch (error) {
      console.error(
        `Erro ao adicionar professor ${teacherId} na turma ${courseClassId}:`,
        error,
      );
      throw error;
    }
  },

  async getTeachers(courseClassId: number): Promise<User[]> {
    try {
      const response = await apiService.get<User[]>(
        `${baseUrl}/${courseClassId}/teachers`,
      );
      return response;
    } catch (error) {
      console.error(
        `Erro ao buscar professores da turma ${courseClassId}:`,
        error,
      );
      throw error;
    }
  },

  async removeTeacher(courseClassId: number, teacherId: number): Promise<void> {
    try {
      await apiService.delete<void>(
        `${baseUrl}/${courseClassId}/teachers/${teacherId}`,
      );
    } catch (error) {
      console.error(
        `Erro ao remover professor ${teacherId} da turma ${courseClassId}:`,
        error,
      );
      throw error;
    }
  },

  // ========== Métodos de Relacionamento: Aulas ==========

  async getLessons(courseClassId: number): Promise<Lesson[]> {
    try {
      const response = await apiService.get<Lesson[]>(
        `${baseUrl}/${courseClassId}/lessons`,
      );
      return response;
    } catch (error) {
      console.error(`Erro ao buscar aulas da turma ${courseClassId}:`, error);
      throw error;
    }
  },
};
