import { AssetCategoryDto } from '@/interfaces/AssetCategory';
import { assetCategoryService } from '@/services/assetCategory/assetCategoryService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface UpdateAssetCategoryVariables {
  id: number;
  data: AssetCategoryDto;
}

export function useCreateAssetCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssetCategoryDto) =>
      assetCategoryService.createAssetCategory(data),

    onSuccess: () => {
      toast.success('Categoria criada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['assetCategories'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'categoria de patrimônio'));
    },
  });
}

export function useUpdateAssetCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateAssetCategoryVariables) =>
      assetCategoryService.updateAssetCategory(id, data),

    onSuccess: (data, variables) => {
      toast.success('Categoria atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['assetCategories'] });
      queryClient.invalidateQueries({
        queryKey: ['assetCategory', variables.id],
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'categoria de patrimônio'));
    },
  });
}

export function useDeleteAssetCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => assetCategoryService.deleteAssetCategory(id),

    onSuccess: () => {
      toast.success('Categoria excluída com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['assetCategories'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'categoria de patrimônio'));
    },
  });
}
