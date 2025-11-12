'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import AddTeacherForm, {
  AddTeacherFormData,
} from '@/components/features/courseClass/AddTeacherForm';
import { useAddTeacherToCourseClass } from '@/hooks/courseClass/useCourseClassMutations';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

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
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<AddTeacherFormData>({
    defaultValues: { teacherId: '' },
  });

  const addTeacher = useAddTeacherToCourseClass();

  useEffect(() => {
    methods.reset({ teacherId: '' });
  }, [isOpen, methods]);

  const handleFormSubmit = async (data: AddTeacherFormData) => {
    setIsLoading(true);
    try {
      const teacherId = data.teacherId;
      if (!teacherId || isNaN(Number(teacherId))) return;
      await addTeacher(courseClassId, Number(teacherId));
      toast.success('Professor adicionado à turma com sucesso!');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao adicionar professor à turma.');
      console.error('Erro ao adicionar professor:', error);
    } finally {
      setIsLoading(false);
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
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default AddTeacherModalContainer;
