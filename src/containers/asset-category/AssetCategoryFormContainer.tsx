import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import { toast } from 'react-toastify';
import { assetCategoryService } from '@/services/assetCategory/assetCategoryService';
import AssetCategoryForm from '@/components/features/asset-category/AssetCategoryForm';
import { AssetCategory, AssetCategoryDto } from '@/interfaces/AssetCategory';

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
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<AssetCategoryDto>({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: assetCategoryToEdit?.name || '',
      });
    }
  }, [isOpen, assetCategoryToEdit, methods]);
  const handleFormSubmit = async (data: AssetCategoryDto) => {
    setIsLoading(true);
    try {
      if (assetCategoryToEdit && assetCategoryToEdit.id) {
        await assetCategoryService.updateAssetCategory(
          assetCategoryToEdit.id,
          data,
        );
      } else {
        await assetCategoryService.createAssetCategory(data);
      }
      toast.success('Categoria de patrimônio salva com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Erro ao salvar categoria de patrimônio.');
    } finally {
      setIsLoading(false);
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
