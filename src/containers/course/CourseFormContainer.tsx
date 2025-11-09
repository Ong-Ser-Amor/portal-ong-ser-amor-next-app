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
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CourseFormData>({
    defaultValues: {
      name: courseToEdit?.name || '',
    },
  });

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  useEffect(() => {
    methods.reset({
      name: courseToEdit?.name || '',
    });
  }, [courseToEdit, isOpen, methods]);

  const handleFormSubmit = async (data: CourseFormData) => {
    setIsLoading(true);

    try {
      if (courseToEdit) {
        const dto: CourseDto = { name: data.name };
        await updateCourse.updateCourse(courseToEdit.id, dto);
      } else {
        await createCourse.createCourse({ name: data.name });
      }
      toast.success('Curso salvo com sucesso!');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      const friendlyMessage = getApiErrorMessage(error, 'curso');
      toast.error(friendlyMessage);
    } finally {
      setIsLoading(false);
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
