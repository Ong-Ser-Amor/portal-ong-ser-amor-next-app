import {
  Location,
  LocationDto,
  LocationPaginated,
} from '@/interfaces/Location';
import { apiService } from '../api/apiService';
import { getChangedFields, hasNoChanges } from '@/utils/patchUtils';

const baseUrl = '/locations';

export const locationService = {
  async createLocation(data: LocationDto): Promise<Location> {
    try {
      const response = await apiService.post<Location>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error('Erro ao criar localização:', error);
      throw error;
    }
  },

  async getLocations(page = 1, limit = 10): Promise<LocationPaginated> {
    try {
      const response = await apiService.get<LocationPaginated>(
        `${baseUrl}?page=${page}&take=${limit}`,
      );

      return response;
    } catch (error) {
      console.error('Erro ao buscar localizações paginadas:', error);
      throw error;
    }
  },

  async getLocation(id: number): Promise<Location> {
    try {
      const response = await apiService.get<Location>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar localização ${id}:`, error);
      throw error;
    }
  },

  async updateLocation(
    id: number,
    originalData: LocationDto,
    updatedData?: LocationDto,
  ): Promise<Location> {
    try {
      let dataToSend: Partial<LocationDto>;

      if (updatedData) {
        // Modo com comparação: detectar apenas os campos que foram alterados
        const changes = getChangedFields(originalData, updatedData);

        // Se não há mudanças, retornar a localização atual sem fazer a requisição
        if (hasNoChanges(changes)) {
          return await this.getLocation(id);
        }

        dataToSend = changes;
      } else {
        // Modo sem comparação: enviar todos os dados
        dataToSend = originalData;
      }

      const response = await apiService.patch<Location>(
        `${baseUrl}/${id}`,
        dataToSend as unknown as Record<string, unknown>,
      );

      return response;
    } catch (error) {
      console.error(`Erro ao atualizar localização ${id}:`, error);
      throw error;
    }
  },

  async deleteLocation(id: number): Promise<void> {
    try {
      await apiService.delete<void>(`${baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar localização ${id}:`, error);
      throw error;
    }
  },
};
