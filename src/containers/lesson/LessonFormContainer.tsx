'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import LessonForm, {
  LessonFormData,
} from '@/components/features/lesson/LessonForm';
import { Lesson, LessonDto, UpdateLessonDto } from '@/interfaces/Lesson';
import {
  useCreateLesson,
  useUpdateLesson,
} from '@/hooks/lesson/useLessonMutations';

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
  const methods = useForm<LessonFormData>({
    defaultValues: {
      courseClassId,
      date: '',
      topic: '',
    },
  });

  const { mutateAsync: createLesson, isPending: isCreating } =
    useCreateLesson();
  const { mutateAsync: updateLesson, isPending: isUpdating } =
    useUpdateLesson();
  const isLoading = isCreating || isUpdating;

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
    try {
      if (lessonToEdit) {
        const formDto: UpdateLessonDto = {
          date: data.date,
          topic: data.topic,
        };

        const originalDto: UpdateLessonDto = {
          date: lessonToEdit.date.split('T')[0],
          topic: lessonToEdit.topic,
        };

        await updateLesson({
          id: lessonToEdit.id,
          originalData: originalDto,
          updatedData: formDto,
        });
      } else {
        const formDto: LessonDto = {
          courseClassId,
          date: data.date,
          topic: data.topic,
        };

        await createLesson(formDto);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
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
          lessonToEdit={lessonToEdit}
          onSubmit={handleFormSubmit}
          onCancel={handleClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default LessonFormContainer;
