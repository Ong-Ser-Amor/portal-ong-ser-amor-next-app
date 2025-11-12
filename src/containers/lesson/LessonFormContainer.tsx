'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/Modal';
import LessonForm, {
  LessonFormData,
} from '@/components/features/lesson/LessonForm';
import { Lesson } from '@/interfaces/Lesson';
import {
  useCreateLesson,
  useUpdateLesson,
} from '@/hooks/lesson/useLessonMutations';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface LessonFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseClassId: number;
  lessonToEdit?: Lesson | null;
  onSuccess: () => void;
}

const LessonFormContainer: React.FC<LessonFormContainerProps> = ({
  isOpen,
  onClose,
  courseClassId,
  lessonToEdit,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<LessonFormData>({
    defaultValues: {
      courseClassId,
      date: '',
      topic: '',
    },
  });

  const { createLesson } = useCreateLesson();
  const { updateLesson } = useUpdateLesson();

  useEffect(() => {
    if (lessonToEdit) {
      const dateOnly = lessonToEdit.date.split('T')[0];
      methods.reset({
        courseClassId: lessonToEdit.courseClassId,
        date: dateOnly,
        topic: lessonToEdit.topic || '',
      });
    } else {
      methods.reset({
        courseClassId,
        date: '',
        topic: '',
      });
    }
  }, [lessonToEdit, courseClassId, methods]);

  const handleFormSubmit = async (data: LessonFormData) => {
    setIsLoading(true);
    try {
      if (lessonToEdit) {
        await updateLesson(lessonToEdit.id, data, lessonToEdit);
      } else {
        await createLesson(data);
      }
      toast.success(
        lessonToEdit
          ? 'Aula atualizada com sucesso!'
          : 'Aula criada com sucesso!',
      );
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      const friendlyMessage = getApiErrorMessage(error, 'aula');
      toast.error(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={lessonToEdit ? 'Editar Aula' : 'Nova Aula'}
    >
      <FormProvider {...methods}>
        <LessonForm
          isLoading={isLoading}
          lessonToEdit={lessonToEdit}
          onSubmit={handleFormSubmit}
          onCancel={handleClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default LessonFormContainer;
