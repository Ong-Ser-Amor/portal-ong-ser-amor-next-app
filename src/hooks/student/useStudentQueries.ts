import { Student, StudentPaginated } from '@/interfaces/Student';
import { studentService } from '@/services/student/studentService';
import { useCallback, useEffect, useState } from 'react';

export function useStudents(page: number = 1, limit: number = 10) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: limit,
    totalItems: 0,
  });

  const fetchStudents = useCallback(
    async (fetchPage: number, fetchLimit: number) => {
      try {
        setLoading(true);
        setError(null);
        const response = await studentService.getStudents(fetchPage, fetchLimit);

        if (response && 'data' in response && Array.isArray(response.data)) {
          setStudents(response.data);
          setMeta(response.meta);
        } else {
          console.warn('Resposta da API inesperada:', response);
          setStudents([]);
          setMeta({
            currentPage: 1,
            totalPages: 0,
            itemsPerPage: fetchLimit,
            totalItems: 0,
          });
        }
      } catch (err) {
        setError(
          'Erro ao carregar alunos. Por favor, tente novamente mais tarde.',
        );
        console.error('Erro ao carregar alunos:', err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const refetch = useCallback(
    (newPage?: number, newLimit?: number) => {
      fetchStudents(newPage ?? page, newLimit ?? limit);
    },
    [fetchStudents, page, limit],
  );

  useEffect(() => {
    fetchStudents(page, limit);
  }, [fetchStudents, page, limit]);

  return {
    students,
    loading,
    error,
    meta,
    refetch,
  };
}

export function useStudent(id: number) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getStudent(id);
      setStudent(response);
    } catch (err) {
      setError('Erro ao carregar aluno.');
      console.error(`Erro ao carregar aluno ${id}:`, err);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id, fetchStudent]);

  return {
    student,
    loading,
    error,
    refetch: fetchStudent,
  };
}
