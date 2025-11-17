import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import AssetCategoryForm from '@/components/features/asset-category/AssetCategoryForm';
import { AssetCategory, AssetCategoryDto } from '@/interfaces/AssetCategory';
import {
  useCreateAssetCategory,
  useUpdateAssetCategory,
} from '@/hooks/assetCategory/useAssetCategoryMutations';

interface AssetCategoryFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  assetCategoryToEdit?: AssetCategory | null;
  onSuccess: () => void;
}

const AssetCategoryFormContainer: React.FC<AssetCategoryFormContainerProps> = ({
  isOpen,
  onClose,
  assetCategoryToEdit,
  onSuccess,
}) => {
  const methods = useForm<AssetCategoryDto>({
    defaultValues: {
      name: '',
    },
  });

  const { mutateAsync: createAssetCategory, isPending: isCreating } =
    useCreateAssetCategory();
  const { mutateAsync: updateAssetCategory, isPending: isUpdating } =
    useUpdateAssetCategory();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: assetCategoryToEdit?.name || '',
      });
    }
  }, [isOpen, assetCategoryToEdit, methods]);

  const handleFormSubmit = async (data: AssetCategoryDto) => {
    try {
      const formDto: AssetCategoryDto = { name: data.name };

      if (assetCategoryToEdit) {
        await updateAssetCategory({
          id: assetCategoryToEdit.id,
          data: formDto,
        });
      } else {
        await createAssetCategory(formDto);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        assetCategoryToEdit
          ? 'Editar Categoria de Patrimônio'
          : 'Nova Categoria de Patrimônio'
      }
      size='md'
    >
      <FormProvider {...methods}>
        <AssetCategoryForm
          assetCategoryToEdit={assetCategoryToEdit}
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default AssetCategoryFormContainer;
