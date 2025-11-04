import { StudentDto } from '@/interfaces/Student';
import { studentService } from '@/services/student/studentService';
import { useState } from 'react';

export function useCreateStudent() {
  const [error, setError] = useState<string | null>(null);

  const createStudent = async (data: StudentDto) => {
    setError(null);
    try {
      await studentService.createStudent(data);
    } catch (err) {
      setError('Erro ao criar aluno.');
      throw err;
    }
  };

  return { createStudent, error };
}

export function useUpdateStudent() {
  const [error, setError] = useState<string | null>(null);

  const updateStudent = async (
    id: number,
    originalData: StudentDto,
    updatedData?: StudentDto,
  ) => {
    setError(null);
    try {
      await studentService.updateStudent(id, originalData, updatedData);
    } catch (err) {
      setError('Erro ao atualizar aluno.');
      throw err;
    }
  };

  return { updateStudent, error };
}

export function useDeleteStudent() {
  const [error, setError] = useState<string | null>(null);

  const deleteStudent = async (id: number) => {
    setError(null);
    try {
      await studentService.deleteStudent(id);
    } catch (err) {
      setError('Erro ao excluir aluno.');
      throw err;
    }
  };

  return { deleteStudent, error };
}
