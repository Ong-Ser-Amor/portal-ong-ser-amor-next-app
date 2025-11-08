'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import AddTeacherForm from '@/components/features/courseClass/AddTeacherForm';
import { useAddTeacherToCourseClass } from '@/hooks/courseClass/useCourseClassMutations';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface AddTeacherModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseClassId: number;
  onSuccess: () => void;
}

export default function AddTeacherModalContainer({
  isOpen,
  onClose,
  courseClassId,
  onSuccess,
}: AddTeacherModalContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addTeacher = useAddTeacherToCourseClass();

  const handleSubmit = async (teacherId: number) => {
    try {
      setIsSubmitting(true);
      await addTeacher(courseClassId, teacherId);
      toast.success('Professor adicionado à turma com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao adicionar professor à turma.');
      console.error('Erro ao adicionar professor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Adicionar Professor à Turma'
      size='md'
    >
      <AddTeacherForm
        loading={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
