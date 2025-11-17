import { assetCategoryService } from '@/services/assetCategory/assetCategoryService';
import { useQuery } from '@tanstack/react-query';

export function useAssetCategories(page: number = 1, limit: number = 10) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['assetCategories', page, limit],
    queryFn: () => assetCategoryService.getAssetCategories(page, limit),
    staleTime: 1000 * 60 * 5,
  });

  return {
    assetCategories: data?.data || [],
    meta: data?.meta || {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: limit,
      totalItems: 0,
    },
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}

export function useAssetCategory(id: number) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['assetCategory', id],
    queryFn: () => assetCategoryService.getAssetCategory(id),
    enabled: !!id,
  });

  return {
    assetCategory: data ?? null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}
