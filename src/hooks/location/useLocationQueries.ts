import { Location } from '@/interfaces/Location';
import { locationService } from '@/services/location/locationService';
import { useCallback, useEffect, useState } from 'react';

export function useLocations(page: number = 1, limit: number = 10) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: limit,
    totalItems: 0,
  });

  const fetchLocations = useCallback(
    async (fetchPage: number, fetchLimit: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await locationService.getLocations(
          fetchPage,
          fetchLimit,
        );

        if (response && 'data' in response && Array.isArray(response.data)) {
          setLocations(response.data);
          setMeta(response.meta);
        } else {
          console.warn('Resposta da API inesperada:', response);
          setLocations([]);
          setMeta({
            currentPage: 1,
            totalPages: 0,
            itemsPerPage: fetchLimit,
            totalItems: 0,
          });
        }
      } catch (err) {
        setError(
          'Erro ao carregar localizações. Por favor, tente novamente mais tarde.',
        );
        console.error('Erro ao carregar localizações:', err);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const refetch = useCallback(
    (newPage?: number, newLimit?: number) => {
      fetchLocations(newPage ?? page, newLimit ?? limit);
    },
    [fetchLocations, page, limit],
  );

  useEffect(() => {
    fetchLocations(page, limit);
  }, [fetchLocations, page, limit]);

  return {
    locations,
    loading,
    error,
    meta,
    refetch,
  };
}

export function useLocation(id: number) {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await locationService.getLocation(id);
      setLocation(response);
    } catch (err) {
      setError('Erro ao carregar localização.');
      console.error(`Erro ao carregar localização ${id}:`, err);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchLocation();
    }
  }, [id, fetchLocation]);

  return {
    location,
    loading,
    error,
    refetch: fetchLocation,
  };
}
