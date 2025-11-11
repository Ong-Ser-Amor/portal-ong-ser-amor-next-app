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
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<StudentFormData>({
    defaultValues: {
      name: studentToEdit?.name || '',
      birthDate: studentToEdit?.birthDate || '',
    },
  });

  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: studentToEdit?.name || '',
        birthDate: studentToEdit?.birthDate || '',
      });
    }
  }, [studentToEdit, isOpen]);

  const handleFormSubmit = async (data: StudentFormData) => {
    setIsLoading(true);

    try {
      if (studentToEdit) {
        const dto: StudentDto = { name: data.name, birthDate: data.birthDate };
        await updateStudent.updateStudent(studentToEdit.id, dto);
      } else {
        await createStudent.createStudent({
          name: data.name,
          birthDate: data.birthDate,
        });
      }
      toast.success('Aluno salvo com sucesso!');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      const friendlyMessage = getApiErrorMessage(error, 'aluno');
      toast.error(friendlyMessage);
    } finally {
      setIsLoading(false);
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
