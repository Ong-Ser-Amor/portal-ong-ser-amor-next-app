'use client';

import StudentForm, {
  StudentFormData,
} from '@/components/features/student/StudentForm';
import Modal from '@/components/ui/Modal';
import {
  useCreateStudent,
  useUpdateStudent,
} from '@/hooks/student/useStudentMutations';
import { Student, StudentDto } from '@/interfaces/Student';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface StudentFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  studentToEdit?: Student | null;
  onSuccess: () => void;
}

const StudentFormContainer: React.FC<StudentFormContainerProps> = ({
  isOpen,
  onClose,
  studentToEdit,
  onSuccess,
}) => {
  const methods = useForm<StudentFormData>({
    defaultValues: {
      name: studentToEdit?.name || '',
      birthDate: studentToEdit?.birthDate || '',
    },
  });

  const { mutateAsync: createStudent, isPending: isCreating } =
    useCreateStudent();
  const { mutateAsync: updateStudent, isPending: isUpdating } =
    useUpdateStudent();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    methods.reset({
      name: studentToEdit?.name || '',
      birthDate: studentToEdit?.birthDate || '',
    });
  }, [studentToEdit, isOpen, methods]);

  const handleFormSubmit = async (data: StudentFormData) => {
    try {
      const formDto: StudentDto = {
        name: data.name,
        birthDate: data.birthDate,
      };

      if (studentToEdit) {
        const originalDto: StudentDto = {
          name: studentToEdit.name,
          birthDate: studentToEdit.birthDate,
        };

        await updateStudent({
          id: studentToEdit.id,
          originalData: originalDto,
          updatedData: formDto,
        });
      } else {
        await createStudent(formDto);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Falha ao salvar aluno:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={studentToEdit ? 'Editar Aluno' : 'Novo Aluno'}
      size='md'
    >
      <FormProvider {...methods}>
        <StudentForm
          studentToEdit={studentToEdit}
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default StudentFormContainer;
