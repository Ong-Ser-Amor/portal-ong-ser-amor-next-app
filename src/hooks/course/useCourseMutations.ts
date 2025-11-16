import { Course, CourseDto } from '@/interfaces/Course';
import { courseService } from '@/services/course/courseService';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface UpdateCourseVariables {
  id: number;
  originalData: CourseDto;
  updatedData?: CourseDto;
}

export function useCreateCourse() {
  // Obtem o "cérebro" do TanStack Query
  const queryClient = useQueryClient();

  // useMutation gere todo o estado (isLoading, isError, etc.)
  return useMutation({
    // mutationFn: A função que faz a alteração.
    mutationFn: (data: CourseDto) => courseService.createCourse(data),

    onSuccess: () => {
      toast.success('Curso criado com sucesso!');
      /**
       * A MÁGICA: Invalidar o cache 'courses'.
       * Isto diz ao TanStack: "qualquer query que use 'courses' está velha".
       * O hook 'useCourses' na lista verá isto e fará o refetch automaticamente.
       */
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },

    /**
     * onError: O que fazer em caso de erro.
     */
    onError: (error) => {
      const friendlyMessage = getApiErrorMessage(error, 'curso');
      toast.error(friendlyMessage);
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    // A mutationFn agora recebe as 'UpdateCourseVariables'
    mutationFn: ({ id, originalData, updatedData }: UpdateCourseVariables) =>
      courseService.updateCourse(id, originalData, updatedData),

    // 'data' é o curso retornado, 'variables' são os parâmetros passados
    onSuccess: (data: Course, variables) => {
      toast.success('Curso atualizado com sucesso!');
      // Invalida a lista de cursos (para a página de listagem)
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      // Invalida o cache deste curso específico (para a página de detalhes)
      queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
    },

    onError: (error) => {
      const friendlyMessage = getApiErrorMessage(error, 'curso');
      toast.error(friendlyMessage);
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => courseService.deleteCourse(id),

    onSuccess: () => {
      toast.success('Curso excluído com sucesso!');
      // Invalida a lista de cursos
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },

    onError: (error) => {
      const friendlyMessage = getApiErrorMessage(error, 'curso');
      toast.error(friendlyMessage);
    },
  });
}
