import { lessonService } from '@/services/lesson/lessonService';
import { LessonDto, UpdateLessonDto } from '@/interfaces/Lesson';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface UpdateLessonVariables {
  id: number;
  originalData: UpdateLessonDto;
  updatedData: UpdateLessonDto;
}

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LessonDto) => lessonService.createLesson(data),
    onSuccess: (_, variables) => {
      toast.success('Aula criada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['lessons', variables.courseClassId],
      });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'aula')),
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, originalData, updatedData }: UpdateLessonVariables) =>
      lessonService.updateLesson(id, originalData, updatedData),
    onSuccess: (data) => {
      toast.success('Aula atualizada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['lessons', data.courseClassId],
      });
      queryClient.invalidateQueries({ queryKey: ['lesson', data.id] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'aula')),
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => lessonService.deleteLesson(id),
    onSuccess: () => {
      toast.success('Aula excluída com sucesso!');
      // Nota: Aqui usamos 'lessons' genérico porque não temos o ID da turma facilmente.
      // O ideal é invalidar tudo que comece por 'lessons'.
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'aula')),
  });
};
