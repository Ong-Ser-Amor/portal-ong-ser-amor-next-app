import { courseClassService } from '@/services/courseClass/courseClassService';
import { CourseClassDto, UpdateCourseClassDto } from '@/interfaces/CourseClass';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface UpdateCourseClassVariables {
  id: number;
  originalData: UpdateCourseClassDto;
  updatedData: UpdateCourseClassDto;
}

export function useCreateCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseClassDto) =>
      courseClassService.createCourseClass(data),
    onSuccess: (data) => {
      toast.success('Turma criada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['courseClasses', data.course.id],
      });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'turma')),
  });
}

export function useUpdateCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    // Recebe o pacote para diff
    mutationFn: ({
      id,
      originalData,
      updatedData,
    }: UpdateCourseClassVariables) =>
      courseClassService.updateCourseClass(id, originalData, updatedData),
    onSuccess: (data) => {
      toast.success('Turma atualizada com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['courseClasses', data.course.id],
      });
      queryClient.invalidateQueries({ queryKey: ['courseClass', data.id] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'turma')),
  });
}

export function useDeleteCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => courseClassService.deleteCourseClass(id),
    onSuccess: () => {
      toast.success('Turma excluída com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['courseClasses'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'turma')),
  });
}

export function useAddStudentToCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseClassId,
      studentId,
    }: {
      courseClassId: number;
      studentId: number;
    }) => courseClassService.addStudent(courseClassId, studentId),
    onSuccess: (_, variables) => {
      toast.success('Aluno adicionado à turma!');
      queryClient.invalidateQueries({
        queryKey: ['courseClassStudents', variables.courseClassId],
      });
      queryClient.invalidateQueries({
        queryKey: ['courseClass', variables.courseClassId],
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'adicionar aluno')),
  });
}

export function useRemoveStudentFromCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseClassId,
      studentId,
    }: {
      courseClassId: number;
      studentId: number;
    }) => courseClassService.removeStudent(courseClassId, studentId),
    onSuccess: (_, variables) => {
      toast.success('Aluno removido da turma!');
      queryClient.invalidateQueries({
        queryKey: ['courseClassStudents', variables.courseClassId],
      });
      queryClient.invalidateQueries({
        queryKey: ['courseClass', variables.courseClassId],
      });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'remover aluno')),
  });
}

export function useAddTeacherToCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseClassId,
      teacherId,
    }: {
      courseClassId: number;
      teacherId: number;
    }) => courseClassService.addTeacher(courseClassId, teacherId),
    onSuccess: (_, variables) => {
      toast.success('Professor adicionado à turma!');
      queryClient.invalidateQueries({
        queryKey: ['courseClassTeachers', variables.courseClassId],
      });
      queryClient.invalidateQueries({
        queryKey: ['courseClass', variables.courseClassId],
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'adicionar professor')),
  });
}

export function useRemoveTeacherFromCourseClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseClassId,
      teacherId,
    }: {
      courseClassId: number;
      teacherId: number;
    }) => courseClassService.removeTeacher(courseClassId, teacherId),
    onSuccess: (_, variables) => {
      toast.success('Professor removido da turma!');
      queryClient.invalidateQueries({
        queryKey: ['courseClassTeachers', variables.courseClassId],
      });
      queryClient.invalidateQueries({
        queryKey: ['courseClass', variables.courseClassId],
      });
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'remover professor')),
  });
}
