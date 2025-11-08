import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Student } from '@/interfaces/Student';
import { useFormContext } from 'react-hook-form';

export interface StudentFormData {
  name: string;
  birthDate: string;
}

interface StudentFormProps {
  isLoading?: boolean;
  studentToEdit?: Student | null;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  isLoading = false,
  studentToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<StudentFormData>();

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
      <div className='mb-4'>
        <Input
          {...register('birthDate', {
            required: 'A data de nascimento é obrigatória.',
          })}
          id='birthDate'
          label='Data de Nascimento'
          type='date'
          disabled={isLoading}
          error={errors.birthDate}
          required
        />
        {errors.birthDate && (
          <div className='mt-2 text-sm text-red-600'>
            {errors.birthDate.message}
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
          {studentToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default StudentForm;
