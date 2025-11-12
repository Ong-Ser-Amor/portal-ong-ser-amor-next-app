'use client';

import CourseClassForm, {
  CourseClassFormData,
} from '@/components/features/courseClass/CourseClassForm';
import Modal from '@/components/ui/Modal';
import {
  useCreateCourseClass,
  useUpdateCourseClass,
} from '@/hooks/courseClass/useCourseClassMutations';
import {
  CourseClass,
  CourseClassDto,
  CourseClassStatusEnum,
} from '@/interfaces/CourseClass';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CourseClassFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseClassToEdit?: CourseClass | null;
  onSuccess: () => void;
}

const CourseClassFormContainer: React.FC<CourseClassFormContainerProps> = ({
  isOpen,
  onClose,
  courseId,
  courseClassToEdit,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CourseClassFormData>({
    defaultValues: {
      courseId: courseId,
      name: courseClassToEdit?.name || '',
      startDate: courseClassToEdit?.startDate
        ? new Date(courseClassToEdit.startDate).toISOString().split('T')[0]
        : '',
      endDate: courseClassToEdit?.endDate
        ? new Date(courseClassToEdit.endDate).toISOString().split('T')[0]
        : '',
      status: courseClassToEdit?.status || CourseClassStatusEnum.EM_FORMACAO,
    },
  });

  const createCourseClass = useCreateCourseClass();
  const updateCourseClass = useUpdateCourseClass();

  useEffect(() => {
    methods.reset({
      courseId: courseId,
      name: courseClassToEdit?.name || '',
      startDate: courseClassToEdit?.startDate
        ? new Date(courseClassToEdit.startDate).toISOString().split('T')[0]
        : '',
      endDate: courseClassToEdit?.endDate
        ? new Date(courseClassToEdit.endDate).toISOString().split('T')[0]
        : '',
      status: courseClassToEdit?.status || CourseClassStatusEnum.EM_FORMACAO,
    });
  }, [courseClassToEdit, isOpen, methods, courseId]);

  const handleFormSubmit = async (data: CourseClassFormData) => {
    setIsLoading(true);

    try {
      if (courseClassToEdit) {
        const dto: CourseClassDto = {
          courseId: courseId,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
        };

        const originalDto: CourseClassDto = {
          courseId: courseId,
          name: courseClassToEdit.name,
          startDate: new Date(courseClassToEdit.startDate)
            .toISOString()
            .split('T')[0],
          endDate: new Date(courseClassToEdit.endDate)
            .toISOString()
            .split('T')[0],
          status: courseClassToEdit.status,
        };

        await updateCourseClass(courseClassToEdit.id, originalDto, dto);
        toast.success('Turma atualizada com sucesso!');
      } else {
        const dto: CourseClassDto = {
          courseId: courseId,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
        };

        await createCourseClass(dto);
        toast.success('Turma criada com sucesso!');
      }

      methods.reset();
      onSuccess();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao salvar turma.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    methods.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={courseClassToEdit ? 'Editar Turma' : 'Nova Turma'}
    >
      <FormProvider {...methods}>
        <CourseClassForm
          isLoading={isLoading}
          courseId={courseId}
          courseClassToEdit={courseClassToEdit}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </FormProvider>
    </Modal>
  );
};

export default CourseClassFormContainer;
