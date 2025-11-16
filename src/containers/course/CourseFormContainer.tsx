'use client';

import CourseForm, {
  CourseFormData,
} from '@/components/features/course/CourseForm';
import Modal from '@/components/ui/Modal';
import {
  useCreateCourse,
  useUpdateCourse,
} from '@/hooks/course/useCourseMutations';
import { Course, CourseDto } from '@/interfaces/Course';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface CourseFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit?: Course | null;
  onSuccess: () => void;
}

const CourseFormContainer: React.FC<CourseFormContainerProps> = ({
  isOpen,
  onClose,
  courseToEdit,
  onSuccess,
}) => {
  const methods = useForm<CourseFormData>({
    defaultValues: {
      name: courseToEdit?.name || '',
    },
  });

  // Os hooks de mutação retornam o estado de loading e a função 'mutate'
  const { mutateAsync: createCourse, isPending: isCreating } =
    useCreateCourse();
  const { mutateAsync: updateCourse, isPending: isUpdating } =
    useUpdateCourse();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    methods.reset({
      name: courseToEdit?.name || '',
    });
  }, [courseToEdit, isOpen, methods]);

  const handleFormSubmit = async (data: CourseFormData) => {
    try {
      if (courseToEdit) {
        const dto: CourseDto = { name: data.name };

        await updateCourse({
          id: courseToEdit.id,
          originalData: dto,
          updatedData: dto,
        });
      } else {
        await createCourse({ name: data.name });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Falha ao salvar curso:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={courseToEdit ? 'Editar Curso' : 'Novo Curso'}
      size='md'
    >
      <FormProvider {...methods}>
        <CourseForm
          courseToEdit={courseToEdit}
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default CourseFormContainer;
