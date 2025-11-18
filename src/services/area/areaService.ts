import { Area, UpdateAreaDto, AreaPaginated, AreaDto } from '@/interfaces/Area';
import { apiService } from '../api/apiService';
import { getChangedFields, hasNoChanges } from '@/utils/patchUtils';

const baseUrl = '/areas';

export const areaService = {
  async createArea(data: AreaDto): Promise<Area> {
    try {
      const response = await apiService.post<Area>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error('Erro ao criar ambiente:', error);
      throw error;
    }
  },

  async getAreas(
    locationId: number,
    page = 1,
    limit = 10,
  ): Promise<AreaPaginated> {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('take', String(limit));
      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await apiService.get<AreaPaginated>(
        `/locations/${locationId}/areas${query}`,
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar áreas:', error);
      throw error;
    }
  },

  async getArea(id: number): Promise<Area> {
    try {
      const response = await apiService.get<Area>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar área ${id}:`, error);
      throw error;
    }
  },

  async updateArea(
    id: number,
    originalData: UpdateAreaDto,
    updatedData: UpdateAreaDto,
  ): Promise<Area> {
    try {
      const changes = getChangedFields(originalData, updatedData);

      if (hasNoChanges(changes)) {
        return await this.getArea(id);
      }

      const response = await apiService.patch<Area>(
        `${baseUrl}/${id}`,
        changes as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error(`Erro ao atualizar ambiente ${id}:`, error);
      throw error;
    }
  },

  async deleteArea(id: number): Promise<void> {
    try {
      await apiService.delete<void>(`${baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir área ${id}:`, error);
      throw error;
    }
  },
};
