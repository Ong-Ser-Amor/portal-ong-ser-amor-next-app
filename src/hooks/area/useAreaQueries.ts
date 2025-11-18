import { areaService } from '@/services/area/areaService';
import { useQuery } from '@tanstack/react-query';

export function useAreas(
  locationId: number,
  page: number = 1,
  limit: number = 10,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['areas', locationId, page, limit],
    queryFn: () => areaService.getAreas(locationId, page, limit),
    staleTime: 1000 * 60 * 5,
    enabled: !!locationId,
  });

  return {
    areas: data?.data ?? [],
    meta: data?.meta ?? {
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

export function useArea(id: number) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['area', id],
    queryFn: () => areaService.getArea(id),
    enabled: !!id,
  });

  return {
    area: data ?? null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}
