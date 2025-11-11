import { LocationDto } from '@/interfaces/Location';
import { locationService } from '@/services/location/locationService';
import { useState } from 'react';

export function useCreateLocation() {
  const [error, setError] = useState<string | null>(null);

  const createLocation = async (data: LocationDto) => {
    setError(null);
    try {
      await locationService.createLocation(data);
    } catch (err) {
      setError('Erro ao criar localização.');
      throw err;
    }
  };

  return { createLocation, error };
}

export function useUpdateLocation() {
  const [error, setError] = useState<string | null>(null);

  const updateLocation = async (
    id: number,
    originalData: LocationDto,
    updatedData?: LocationDto,
  ) => {
    setError(null);
    try {
      await locationService.updateLocation(id, originalData, updatedData);
    } catch (err) {
      setError('Erro ao atualizar localização.');
      throw err;
    }
  };

  return { updateLocation, error };
}

export function useDeleteLocation() {
  const [error, setError] = useState<string | null>(null);

  const deleteLocation = async (id: number) => {
    setError(null);
    try {
      await locationService.deleteLocation(id);
    } catch (err) {
      setError('Erro ao excluir localização.');
      throw err;
    }
  };

  return { deleteLocation, error };
}
