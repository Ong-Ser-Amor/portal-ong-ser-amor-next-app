import { StudentDto } from '@/interfaces/Student';
import { studentService } from '@/services/student/studentService';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateStudentVariables {
  id: number;
  originalData: StudentDto;
  updatedData: StudentDto;
}

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StudentDto) => studentService.createStudent(data),
    onSuccess: () => {
      toast.success('Aluno criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'aluno'));
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, originalData, updatedData }: UpdateStudentVariables) =>
      studentService.updateStudent(id, originalData, updatedData),

    onSuccess: (updatedStudent, variables) => {
      toast.success('Aluno atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', variables.id] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'aluno'));
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => studentService.deleteStudent(id),
    onSuccess: () => {
      toast.success('Aluno excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'aluno'));
    },
  });
}
