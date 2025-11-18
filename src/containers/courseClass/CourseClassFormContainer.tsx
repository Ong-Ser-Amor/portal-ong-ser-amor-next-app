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
  UpdateCourseClassDto,
} from '@/interfaces/CourseClass';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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

  const { mutateAsync: createCourseClass, isPending: isCreating } =
    useCreateCourseClass();
  const { mutateAsync: updateCourseClass, isPending: isUpdating } =
    useUpdateCourseClass();
  const isLoading = isCreating || isUpdating;

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
    try {
      if (courseClassToEdit) {
        const formDto: UpdateCourseClassDto = {
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
        };

        // UPDATE: Prepara o DTO Original (UpdateCourseClassDto)
        // Nota: Precisamos formatar as datas do original para string YYYY-MM-DD para a comparação ser justa com o formDto
        const originalDto: UpdateCourseClassDto = {
          name: courseClassToEdit.name,
          startDate: new Date(courseClassToEdit.startDate)
            .toISOString()
            .split('T')[0],
          endDate: new Date(courseClassToEdit.endDate)
            .toISOString()
            .split('T')[0],
          status: courseClassToEdit.status,
        };

        await updateCourseClass({
          id: courseClassToEdit.id,
          originalData: originalDto,
          updatedData: formDto,
        });
      } else {
        const formDto: CourseClassDto = {
          courseId: courseId,
          name: data.name,
          startDate: data.startDate,
          endDate: data.endDate,
          status: data.status,
        };

        await createCourseClass(formDto);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
    }
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
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default CourseClassFormContainer;
