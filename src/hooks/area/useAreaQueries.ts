import { useCallback, useEffect, useState } from 'react';
import { Area, AreaPaginated } from '@/interfaces/Area';
import { areaService } from '@/services/area/areaService';

export function useAreas(locationId: number, page: number = 1, limit: number = 10) {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: limit,
    totalItems: 0,
  });

  const fetchAreas = useCallback(
    async (fetchLocationId: number, fetchPage: number, fetchLimit: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await areaService.getAreas(fetchLocationId, fetchPage, fetchLimit);
        if (response && 'data' in response && Array.isArray(response.data)) {
          setAreas(response.data);
          setMeta(response.meta);
        } else {
          setAreas([]);
          setMeta({
            currentPage: 1,
            totalPages: 0,
            itemsPerPage: fetchLimit,
            totalItems: 0,
          });
        }
      } catch (err) {
        setError('Erro ao carregar áreas. Por favor, tente novamente mais tarde.');
        setAreas([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const refetch = useCallback(
    (newLocationId?: number, newPage?: number, newLimit?: number) => {
      fetchAreas(newLocationId ?? locationId, newPage ?? page, newLimit ?? limit);
    },
    [fetchAreas, locationId, page, limit],
  );

  useEffect(() => {
    fetchAreas(locationId, page, limit);
  }, [fetchAreas, locationId, page, limit]);

  return {
    areas,
    loading,
    error,
    meta,
    refetch,
  };
}

export function useArea(id: number) {
  const [area, setArea] = useState<Area | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArea = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await areaService.getArea(id);
      setArea(response);
    } catch (err) {
      setError('Erro ao carregar área.');
      setArea(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchArea();
    }
  }, [id, fetchArea]);

  return {
    area,
    loading,
    error,
    refetch: fetchArea,
  };
}
