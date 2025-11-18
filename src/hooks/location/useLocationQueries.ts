import { locationService } from '@/services/location/locationService';
import { useQuery } from '@tanstack/react-query';

export function useLocations(page: number = 1, limit: number = 10) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['locations', page, limit],
    queryFn: () => locationService.getLocations(page, limit),
    staleTime: 1000 * 60 * 5,
  });

  return {
    locations: data?.data ?? [],
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

export function useLocation(id: number) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['location', id],
    queryFn: () => locationService.getLocation(id),
    enabled: !!id,
  });

  return {
    location: data ?? null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}
