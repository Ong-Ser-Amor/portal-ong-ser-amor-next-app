'use client';

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import AddTeacherForm, {
  AddTeacherFormData,
} from '@/components/features/courseClass/AddTeacherForm';
import { useAddTeacherToCourseClass } from '@/hooks/courseClass/useCourseClassMutations';

interface AddTeacherModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseClassId: number;
  onSuccess: () => void;
}

const AddTeacherModalContainer: React.FC<AddTeacherModalContainerProps> = ({
  isOpen,
  onClose,
  courseClassId,
  onSuccess,
}) => {
  const methods = useForm<AddTeacherFormData>({
    defaultValues: { teacherId: '' },
  });

  // Hook de Mutação
  const { mutateAsync: addTeacher, isPending: isAdding } =
    useAddTeacherToCourseClass();

  useEffect(() => {
    methods.reset({ teacherId: '' });
  }, [isOpen, methods]);

  const handleFormSubmit = async (data: AddTeacherFormData) => {
    try {
      const teacherId = Number(data.teacherId);
      if (!teacherId) return;

      await addTeacher({ courseClassId, teacherId });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Adicionar Professor à Turma'
      size='md'
    >
      <FormProvider {...methods}>
        <AddTeacherForm
          isLoading={isAdding}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default AddTeacherModalContainer;
