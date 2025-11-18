'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import AddStudentForm, {
  AddStudentFormData,
} from '@/components/features/courseClass/AddStudentForm';
import { useStudents } from '@/hooks/student/useStudentQueries';
import { useAddStudentToCourseClass } from '@/hooks/courseClass/useCourseClassMutations';

interface AddStudentModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseClassId: number;
  enrolledStudentIds: number[];
  onSuccess: () => void;
}

const AddStudentModalContainer: React.FC<AddStudentModalContainerProps> = ({
  isOpen,
  onClose,
  courseClassId,
  enrolledStudentIds,
  onSuccess,
}) => {
  // Hook de Query para popular o select
  const { students, loading: loadingStudents } = useStudents(1, 1000);

  // Hook de Mutação
  const { mutateAsync: addStudent, isPending: isAdding } =
    useAddStudentToCourseClass();

  const availableStudents = students.filter(
    (student) => !enrolledStudentIds.includes(student.id),
  );

  const methods = useForm<AddStudentFormData>({
    defaultValues: { studentId: '' },
  });

  useEffect(() => {
    methods.reset({ studentId: '' });
  }, [isOpen, methods]);

  const handleFormSubmit = async (data: AddStudentFormData) => {
    try {
      const studentId = Number(data.studentId);
      if (!studentId) return;

      await addStudent({ courseClassId, studentId });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Adicionar Aluno à Turma'
      size='md'
    >
      {loadingStudents ? (
        <div className='flex justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : availableStudents.length === 0 ? (
        <div className='py-4 text-center text-gray-500'>
          Todos os alunos já estão matriculados nesta turma.
        </div>
      ) : (
        <FormProvider {...methods}>
          <AddStudentForm
            students={availableStudents}
            isLoading={isAdding}
            onSubmit={handleFormSubmit}
            onCancel={onClose}
          />
        </FormProvider>
      )}
    </Modal>
  );
};

export default AddStudentModalContainer;
