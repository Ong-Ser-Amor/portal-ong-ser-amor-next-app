import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { Location } from '@/interfaces/Location';
import { useFormContext, Controller } from 'react-hook-form';

export interface LocationFormData {
  name: string;
  address?: string;
}

interface LocationFormProps {
  isLoading?: boolean;
  locationToEdit?: Location | null;
  onSubmit: (data: LocationFormData) => void;
  onCancel: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  isLoading = false,
  locationToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<LocationFormData>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Controller
          name='name'
          control={control}
          rules={{ required: 'O nome é obrigatório.' }}
          render={({ field }) => (
            <Input
              id='name'
              label='Nome'
              type='text'
              placeholder='Digite o nome do local'
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
      <div className='mb-4'>
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <Input
              id='address'
              label='Endereço'
              type='text'
              placeholder='Digite o endereço'
              disabled={isLoading}
              error={errors.address}
              {...field}
            />
          )}
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
          {locationToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default LocationForm;
