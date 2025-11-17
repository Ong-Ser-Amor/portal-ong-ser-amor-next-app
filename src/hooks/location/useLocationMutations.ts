import { LocationDto } from '@/interfaces/Location';
import { locationService } from '@/services/location/locationService';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface UpdateLocationVariables {
  id: number;
  originalData: LocationDto;
  updatedData: LocationDto;
}

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LocationDto) => locationService.createLocation(data),
    onSuccess: () => {
      toast.success('Local criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'local'));
    },
  });
}

export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, originalData, updatedData }: UpdateLocationVariables) =>
      locationService.updateLocation(id, originalData, updatedData),

    onSuccess: (data, variables) => {
      toast.success('Local atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['location', variables.id] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'local'));
    },
  });
}

export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => locationService.deleteLocation(id),
    onSuccess: () => {
      toast.success('Local excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'local'));
    },
  });
}
