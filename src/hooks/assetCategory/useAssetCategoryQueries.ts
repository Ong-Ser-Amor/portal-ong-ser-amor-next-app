import { useCallback, useEffect, useState } from 'react';
import {
  AssetCategory,
  AssetCategoryPaginated,
} from '@/interfaces/AssetCategory';
import { assetCategoryService } from '@/services/assetCategory/assetCategoryService';

export function useAssetCategories(page: number = 1, limit: number = 10) {
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: limit,
    totalItems: 0,
  });

  const fetchAssetCategories = useCallback(
    async (fetchPage: number, fetchLimit: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await assetCategoryService.getAssetCategories(
          fetchPage,
          fetchLimit,
        );
        if (response && 'data' in response && Array.isArray(response.data)) {
          setAssetCategories(response.data);
          setMeta(response.meta);
        } else {
          setAssetCategories([]);
          setMeta({
            currentPage: 1,
            totalPages: 0,
            itemsPerPage: fetchLimit,
            totalItems: 0,
          });
        }
      } catch (err) {
        setError(
          'Erro ao carregar categorias de ativo. Por favor, tente novamente mais tarde.',
        );
        setAssetCategories([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const refetch = useCallback(
    (newPage?: number, newLimit?: number) => {
      fetchAssetCategories(newPage ?? page, newLimit ?? limit);
    },
    [fetchAssetCategories, page, limit],
  );

  useEffect(() => {
    fetchAssetCategories(page, limit);
  }, [fetchAssetCategories, page, limit]);

  return {
    assetCategories,
    loading,
    error,
    meta,
    refetch,
  };
}

export function useAssetCategory(id: number) {
  const [assetCategory, setAssetCategory] = useState<AssetCategory | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssetCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await assetCategoryService.getAssetCategory(id);
      setAssetCategory(response);
    } catch (err) {
      setError('Erro ao carregar categoria de ativo.');
      setAssetCategory(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAssetCategory();
    }
  }, [id, fetchAssetCategory]);

  return {
    assetCategory,
    loading,
    error,
    refetch: fetchAssetCategory,
  };
}
