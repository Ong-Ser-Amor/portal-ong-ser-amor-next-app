import { courseService } from '@/services/course/courseService';
import { useQuery } from '@tanstack/react-query';

export function useCourses(page: number = 1, limit: number = 10) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    /**
     * queryKey: Um ID único para esta busca.
     * É um array. O TanStack Query usa isto para o cache.
     * Se 'page' ou 'limit' mudarem, o hook busca os dados automaticamente.
     */
    queryKey: ['courses', page, limit],

    /**
     * queryFn: A função (Promise) que busca os dados.
     * Nós apenas passamos a sua função de serviço existente.
     * O TanStack Query trata o 'await' e o 'try/catch' internamente.
     */
    queryFn: () => courseService.getCourses(page, limit),

    // Opcional, mas recomendado:
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });

  return {
    courses: data?.data ?? [],
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    meta: data?.meta ?? {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: limit,
      totalItems: 0,
    },
    refetch,
  };
}

export function useCourse(id: number) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['course', id], // ID único para buscar um curso específico
    queryFn: () => courseService.getCourse(id),
    /**
     * enabled: !!id
     * Isto é uma boa prática. A query só será executada se 'id' for
     * um valor "truthy" (ou seja, não for 0, null, ou undefined).
     */
    enabled: !!id,
  });

  return {
    course: data ?? null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch: refetch,
  };
}
