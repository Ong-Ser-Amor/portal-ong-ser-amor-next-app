'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/Modal';
import LessonForm, { LessonFormData } from '@/components/features/lesson/LessonForm';
import { Lesson } from '@/interfaces/Lesson';
import { useCreateLesson, useUpdateLesson } from '@/hooks/lesson/useLessonMutations';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface LessonFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseClassId: number;
  lessonToEdit?: Lesson | null;
  onSuccess: () => void;
}

export default function LessonFormContainer({
  isOpen,
  onClose,
  courseClassId,
  lessonToEdit,
  onSuccess,
}: LessonFormContainerProps) {
  const methods = useForm<LessonFormData>({
    defaultValues: {
      courseClassId,
      date: '',
      topic: '',
    },
  });

  const { createLesson, loading: createLoading } = useCreateLesson();
  const { updateLesson, loading: updateLoading } = useUpdateLesson();

  const isLoading = createLoading || updateLoading;

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

  const handleSubmit = async (data: LessonFormData) => {
    try {
      if (lessonToEdit) {
        await updateLesson(lessonToEdit.id, data, lessonToEdit);
        toast.success('Aula atualizada com sucesso!');
      } else {
        await createLesson(data);
        toast.success('Aula criada com sucesso!');
      }
      onSuccess();
      methods.reset();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao salvar aula.');
      console.error('Erro ao salvar aula:', error);
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
          courseClassId={courseClassId}
          lessonToEdit={lessonToEdit}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      </FormProvider>
    </Modal>
  );
}
