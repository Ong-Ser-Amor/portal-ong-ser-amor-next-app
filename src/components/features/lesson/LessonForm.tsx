import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Lesson } from '@/interfaces/Lesson';
import { useFormContext } from 'react-hook-form';

export interface LessonFormData {
  courseClassId: number;
  date: string;
  topic?: string;
}

interface LessonFormProps {
  isLoading?: boolean;
  courseClassId: number;
  lessonToEdit?: Lesson | null;
  onSubmit: (data: LessonFormData) => void;
  onCancel: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  isLoading = false,
  courseClassId,
  lessonToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<LessonFormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-4'>
        <Input
          id='date'
          label='Data da Aula'
          type='date'
          {...register('date', {
            required: 'A data da aula é obrigatória.',
          })}
          disabled={isLoading}
          error={errors.date}
          required
        />

        <Input
          id='topic'
          label='Tema'
          type='text'
          {...register('topic')}
          placeholder='Ex: Introdução ao Python'
          disabled={isLoading}
          error={errors.topic}
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
          {lessonToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default LessonForm;
