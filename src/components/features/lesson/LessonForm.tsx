import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Lesson } from '@/interfaces/Lesson';
import { useFormContext, Controller } from 'react-hook-form';

export interface LessonFormData {
  courseClassId: number;
  date: string;
  topic: string;
}

interface LessonFormProps {
  isLoading?: boolean;
  lessonToEdit?: Lesson | null;
  onSubmit: (data: LessonFormData) => void | Promise<void>;
  onCancel: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  isLoading = false,
  lessonToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<LessonFormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Controller
          name='date'
          control={control}
          rules={{ required: 'A data da aula é obrigatória.' }}
          render={({ field }) => (
            <Input
              id='date'
              label='Data da Aula'
              type='date'
              disabled={isLoading}
              error={errors.date}
              required
              {...field}
            />
          )}
        />
        {errors.date && (
          <div className='mt-2 text-sm text-red-600'>{errors.date.message}</div>
        )}
      </div>
      <div className='mb-4'>
        <Controller
          name='topic'
          control={control}
          render={({ field }) => (
            <Input
              id='topic'
              label='Tema'
              type='text'
              placeholder='Ex: Introdução ao Python'
              disabled={isLoading}
              error={errors.topic}
              {...field}
            />
          )}
        />
        {errors.topic && (
          <div className='mt-2 text-sm text-red-600'>
            {errors.topic.message}
          </div>
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
          {lessonToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default LessonForm;
