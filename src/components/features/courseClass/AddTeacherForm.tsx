import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Form from '@/components/ui/Form';

export interface AddTeacherFormData {
  teacherId: string;
}

interface AddTeacherFormProps {
  isLoading?: boolean;
  onSubmit: (data: AddTeacherFormData) => void | Promise<void>;
  onCancel: () => void;
}

export default function AddTeacherForm({
  isLoading = false,
  onSubmit,
  onCancel,
}: AddTeacherFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<AddTeacherFormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Controller
          name='teacherId'
          control={control}
          rules={{
            required: 'O ID do professor é obrigatório.',
            validate: (v) => v !== '' && !isNaN(Number(v)) || 'Informe um ID válido.',
          }}
          render={({ field }) => (
            <Input
              id='teacherId'
              label='ID do Professor'
              type='number'
              disabled={isLoading}
              placeholder='Digite o ID do professor'
              required
              error={errors.teacherId}
              {...field}
            />
          )}
        />
        {errors.teacherId && (
          <div className='mt-2 text-sm text-red-600'>{errors.teacherId.message}</div>
        )}
        <p className='mt-1 text-xs text-gray-500'>
          Informe o ID do usuário que será professor desta turma
        </p>
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
