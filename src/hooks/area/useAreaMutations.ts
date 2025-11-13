import { useState } from 'react';
import { Area, CreateAreaDto, UpdateAreaDto } from '@/interfaces/Area';
import { areaService } from '@/services/area/areaService';

export function useCreateArea() {
  const [error, setError] = useState<string | null>(null);

  const createArea = async (data: CreateAreaDto): Promise<Area> => {
    setError(null);
    try {
      return await areaService.createArea(data);
    } catch (err) {
      setError('Erro ao criar área.');
      throw err;
    }
  };

  return { createArea, error };
}

export function useUpdateArea() {
  const [error, setError] = useState<string | null>(null);

  const updateArea = async (id: number, data: UpdateAreaDto): Promise<Area> => {
    setError(null);
    try {
      return await areaService.updateArea(id, data);
    } catch (err) {
      setError('Erro ao atualizar área.');
      throw err;
    }
  };

  return { updateArea, error };
}

export function useDeleteArea() {
  const [error, setError] = useState<string | null>(null);

  const deleteArea = async (id: number): Promise<void> => {
    setError(null);
    try {
      await areaService.deleteArea(id);
    } catch (err) {
      setError('Erro ao excluir área.');
      throw err;
    }
  };

  return { deleteArea, error };
}
