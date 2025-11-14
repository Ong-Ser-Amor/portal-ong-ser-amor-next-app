import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import { AssetCategory, AssetCategoryDto } from '@/interfaces/AssetCategory';
import { useFormContext, Controller } from 'react-hook-form';

interface AssetCategoryFormProps {
  isLoading?: boolean;
  assetCategoryToEdit?: AssetCategory | null;
  onSubmit: (data: AssetCategoryDto) => void;
  onCancel: () => void;
}

const AssetCategoryForm: React.FC<AssetCategoryFormProps> = ({
  isLoading = false,
  assetCategoryToEdit,
  onSubmit,
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<AssetCategoryDto>();

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
              placeholder='Digite o nome da categoria de patrimônio'
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
          {assetCategoryToEdit ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </Form>
  );
};

export default AssetCategoryForm;
