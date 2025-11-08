import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { CourseClass, CourseClassStatusEnum } from '@/interfaces/CourseClass';
import { useFormContext } from 'react-hook-form';

export interface CourseClassFormData {
  courseId: number;
  name: string;
  startDate: string;
  endDate: string;
  status: CourseClassStatusEnum;
}

interface CourseClassFormProps {
  isLoading?: boolean;
  courseId: number;
  courseClassToEdit?: CourseClass | null;
  onSubmit: (data: CourseClassFormData) => void;
  onCancel: () => void;
}

const CourseClassForm: React.FC<CourseClassFormProps> = ({
  isLoading = false,
  courseId,
  courseClassToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CourseClassFormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <div>
          <Input
            id='name'
            label='Nome da Turma'
            type='text'
            {...register('name', { required: 'O nome da turma é obrigatório.' })}
            placeholder='Ex: Turma A - Manhã'
            disabled={isLoading}
            error={errors.name}
            required
          />
          {errors.name && (
            <div className='mt-2 text-sm text-red-600'>{errors.name.message}</div>
          )}
        </div>

        <div>
          <Input
            id='startDate'
            label='Data de Início'
            type='date'
            {...register('startDate', {
              required: 'A data de início é obrigatória.',
            })}
            disabled={isLoading}
            error={errors.startDate}
            required
          />
          {errors.startDate && (
            <div className='mt-2 text-sm text-red-600'>
              {errors.startDate.message}
            </div>
          )}
        </div>

        <div>
          <Input
            id='endDate'
            label='Data de Término'
            type='date'
            {...register('endDate', {
              required: 'A data de término é obrigatória.',
            })}
            disabled={isLoading}
            error={errors.endDate}
            required
          />
          {errors.endDate && (
            <div className='mt-2 text-sm text-red-600'>
              {errors.endDate.message}
            </div>
          )}
        </div>

        <Select
          id='status'
          label='Status'
          options={[
            { value: CourseClassStatusEnum.EM_FORMACAO, label: 'Em Formação' },
            { value: CourseClassStatusEnum.EM_ANDAMENTO, label: 'Em Andamento' },
            { value: CourseClassStatusEnum.FINALIZADA, label: 'Finalizada' },
            { value: CourseClassStatusEnum.CANCELADA, label: 'Cancelada' },
          ]}
          {...register('status', { required: 'O status é obrigatório.' })}
          disabled={isLoading}
          error={errors.status}
        />
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
          {courseClassToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default CourseClassForm;
