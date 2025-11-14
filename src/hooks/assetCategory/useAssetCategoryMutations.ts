import { useState } from 'react';
import { AssetCategory, AssetCategoryDto } from '@/interfaces/AssetCategory';
import { assetCategoryService } from '@/services/assetCategory/assetCategoryService';

export function useCreateAssetCategory() {
  const [error, setError] = useState<string | null>(null);

  const createAssetCategory = async (
    data: AssetCategoryDto,
  ): Promise<AssetCategory> => {
    setError(null);
    try {
      return await assetCategoryService.createAssetCategory(data);
    } catch (err) {
      setError('Erro ao criar categoria de ativo.');
      throw err;
    }
  };

  return { createAssetCategory, error };
}

export function useUpdateAssetCategory() {
  const [error, setError] = useState<string | null>(null);

  const updateAssetCategory = async (
    id: number,
    data: AssetCategoryDto,
  ): Promise<AssetCategory> => {
    setError(null);
    try {
      return await assetCategoryService.updateAssetCategory(id, data);
    } catch (err) {
      setError('Erro ao atualizar categoria de ativo.');
      throw err;
    }
  };

  return { updateAssetCategory, error };
}

export function useDeleteAssetCategory() {
  const [error, setError] = useState<string | null>(null);

  const deleteAssetCategory = async (id: number): Promise<void> => {
    setError(null);
    try {
      await assetCategoryService.deleteAssetCategory(id);
    } catch (err) {
      setError('Erro ao excluir categoria de ativo.');
      throw err;
    }
  };

  return { deleteAssetCategory, error };
}
