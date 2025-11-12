import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Select from '@/components/ui/Select';
import { Student } from '@/interfaces/Student';
import { useFormContext, Controller } from 'react-hook-form';

export interface AddStudentFormData {
  studentId: string;
}

interface AddStudentFormProps {
  students: Student[];
  isLoading?: boolean;
  onSubmit: (data: AddStudentFormData) => void | Promise<void>;
  onCancel: () => void;
}

export default function AddStudentForm({
  students,
  isLoading = false,
  onSubmit,
  onCancel,
}: AddStudentFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<AddStudentFormData>();

  const studentOptions = students.map((student) => ({
    value: String(student.id),
    label: student.name,
  }));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Controller
          name='studentId'
          control={control}
          rules={{
            required: 'Selecione um aluno.',
            validate: (v) => v !== '' || 'Selecione um aluno.',
          }}
          render={({ field }) => (
            <Select
              id='studentId'
              label='Aluno'
              options={studentOptions}
              disabled={isLoading}
              error={errors.studentId}
              {...field}
            />
          )}
        />
        {errors.studentId && (
          <div className='mt-2 text-sm text-red-600'>
            {errors.studentId.message}
          </div>
        )}
      </div>

      <div className='flex justify-end space-x-2'>
        <Button
          type='button'
          variant='secondary'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={isLoading}
          isLoading={isLoading}
          loadingText='Adicionando...'
        >
          Adicionar
        </Button>
      </div>
    </Form>
  );
}
