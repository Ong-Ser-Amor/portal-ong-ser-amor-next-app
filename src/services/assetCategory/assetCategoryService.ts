import {
  AssetCategory,
  AssetCategoryDto,
  AssetCategoryPaginated,
} from '@/interfaces/AssetCategory';
import { apiService } from '../api/apiService';

const baseUrl = '/asset-categories';

export const assetCategoryService = {
  async createAssetCategory(data: AssetCategoryDto): Promise<AssetCategory> {
    try {
      const response = await apiService.post<AssetCategory>(
        baseUrl,
        data as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error('Erro ao criar categoria de ativo:', error);
      throw error;
    }
  },

  async getAssetCategories(
    page = 1,
    limit = 10,
  ): Promise<AssetCategoryPaginated> {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('take', String(limit));
      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await apiService.get<AssetCategoryPaginated>(
        `${baseUrl}${query}`,
      );
      return response;
    } catch (error) {
      console.error('Erro ao buscar categorias de ativo:', error);
      throw error;
    }
  },

  async getAssetCategory(id: number): Promise<AssetCategory> {
    try {
      const response = await apiService.get<AssetCategory>(`${baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Erro ao buscar categoria de ativo ${id}:`, error);
      throw error;
    }
  },

  async updateAssetCategory(
    id: number,
    data: AssetCategoryDto,
  ): Promise<AssetCategory> {
    try {
      const response = await apiService.patch<AssetCategory>(
        `${baseUrl}/${id}`,
        data as unknown as Record<string, unknown>,
      );
      return response;
    } catch (error) {
      console.error(`Erro ao atualizar categoria de ativo ${id}:`, error);
      throw error;
    }
  },

  async deleteAssetCategory(id: number): Promise<void> {
    try {
      await apiService.delete<void>(`${baseUrl}/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir categoria de ativo ${id}:`, error);
      throw error;
    }
  },
};
