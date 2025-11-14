import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Area, CreateAreaDto } from '@/interfaces/Area';
import { useFormContext, Controller } from 'react-hook-form';

interface AreaFormProps {
  isLoading?: boolean;
  areaToEdit?: Area | null;
  onSubmit: (data: CreateAreaDto) => void;
  onCancel: () => void;
}

const AreaForm: React.FC<AreaFormProps> = ({
  isLoading = false,
  areaToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<CreateAreaDto>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Controller
          name='name'
          control={control}
          rules={{ required: 'O nome do ambiente é obrigatório.' }}
          render={({ field }) => (
            <Input
              id='name'
              label='Nome do Ambiente'
              type='text'
              placeholder='Digite o nome do ambiente'
              disabled={isLoading}
              error={errors.name}
              required
              {...field}
            />
          )}
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
          {areaToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default AreaForm;
