'use client';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Course } from '@/interfaces/Course';
import { useFormContext } from 'react-hook-form';

export interface CourseFormData {
  name: string;
}

interface CourseFormProps {
  isLoading?: boolean;
  courseToEdit?: Course | null;
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  isLoading = false,
  courseToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CourseFormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Input
          id='name'
          label='Nome do Curso'
          type='text'
          {...register('name', { required: 'O nome do curso é obrigatório.' })}
          placeholder='Digite o nome do curso'
          disabled={isLoading}
          error={errors.name}
          required
        />
        {errors.name && (
          <div className='mt-2 text-sm text-red-600'>{errors.name.message}</div>
        )}
      </div>
      <div className='mt-6 flex justify-end space-x-2'>
        <Button
          type='button'
          variant='secondary'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type='submit' isLoading={isLoading} loadingText='Salvando...'>
          {courseToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default CourseForm;
