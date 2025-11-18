import { apiService } from '@/services/api/apiService';
import { Attendance, BulkAttendanceDto } from '@/interfaces/Attendance';

export const attendanceService = {
  async getAttendancesByLesson(lessonId: number): Promise<Attendance[]> {
    try {
      const response = await apiService.get<Attendance[]>(
        `/lessons/${lessonId}/attendances`,
      );
      return response;
    } catch (error) {
      console.error(`Erro ao buscar chamadas da aula ${lessonId}:`, error);
      throw error;
    }
  },

  async createAttendances(
    lessonId: number,
    data: BulkAttendanceDto,
  ): Promise<Attendance[]> {
    try {
      const response = await apiService.post<Attendance[]>(
        `/lessons/${lessonId}/attendances`,
        data as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error(`Erro ao criar chamadas da aula ${lessonId}:`, error);
      throw error;
    }
  },

  async updateAttendances(
    lessonId: number,
    data: BulkAttendanceDto,
  ): Promise<Attendance[]> {
    try {
      const response = await apiService.patch<Attendance[]>(
        `/lessons/${lessonId}/attendances`,
        data as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error(`Erro ao atualizar chamadas da aula ${lessonId}:`, error);
      throw error;
    }
  },

  async deleteAllAttendances(lessonId: number): Promise<void> {
    try {
      await apiService.delete(`/lessons/${lessonId}/attendances`);
    } catch (error) {
      console.error(`Erro ao excluir chamadas da aula ${lessonId}:`, error);
      throw error;
    }
  },
};
