import { Student, StudentPaginated } from '@/interfaces/Student';
import { studentService } from '@/services/student/studentService';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export function useStudents(page: number = 1, limit: number = 10) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['students', page, limit],
    queryFn: () => studentService.getStudents(page, limit),
    staleTime: 1000 * 60 * 5,
  });

  return {
    students: data?.data ?? [],
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

export function useStudent(id: number) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['student', id],
    queryFn: () => studentService.getStudent(id),
    enabled: !!id,
  });

  return {
    student: data ?? null,
    loading: isLoading,
    error: isError ? (error as Error).message : null,
    refetch,
  };
}
