import { AreaDto, UpdateAreaDto } from '@/interfaces/Area';
import { areaService } from '@/services/area/areaService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface UpdateAreaVariables {
  id: number;
  originalData: UpdateAreaDto;
  updatedData: UpdateAreaDto;
}

export function useCreateArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AreaDto) => areaService.createArea(data),
    onSuccess: () => {
      toast.success('Ambiente criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'ambiente'));
    },
  });
}

export function useUpdateArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, originalData, updatedData }: UpdateAreaVariables) =>
      areaService.updateArea(id, originalData, updatedData),

    onSuccess: (data, variables) => {
      toast.success('Ambiente atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['areas'] });
      queryClient.invalidateQueries({ queryKey: ['area', variables.id] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'ambiente'));
    },
  });
}

export function useDeleteArea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => areaService.deleteArea(id),
    onSuccess: () => {
      toast.success('Ambiente excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'ambiente'));
    },
  });
}
