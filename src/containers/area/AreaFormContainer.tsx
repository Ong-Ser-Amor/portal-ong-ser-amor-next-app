'use client';

import Modal from '@/components/ui/Modal';

import { Area, AreaDto, UpdateAreaDto } from '@/interfaces/Area';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateArea, useUpdateArea } from '@/hooks/area/useAreaMutations';
import AreaForm from '../../components/features/area/AreaForm';

interface AreaFormData {
  name: string;
}

interface AreaFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: number;
  areaToEdit?: Area | null;
  onSuccess: () => void;
}

const AreaFormContainer: React.FC<AreaFormContainerProps> = ({
  isOpen,
  onClose,
  locationId,
  areaToEdit,
  onSuccess,
}) => {
  const methods = useForm<AreaDto>({
    defaultValues: {
      name: areaToEdit?.name || '',
    },
  });

  const { mutateAsync: createArea, isPending: isCreating } = useCreateArea();
  const { mutateAsync: updateArea, isPending: isUpdating } = useUpdateArea();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    methods.reset({
      name: areaToEdit?.name || '',
    });
  }, [areaToEdit, isOpen, methods, locationId]);

  const handleFormSubmit = async (data: AreaFormData) => {
    try {
      if (areaToEdit) {
        const formDto: UpdateAreaDto = { name: data.name };
        const originalDto: UpdateAreaDto = { name: areaToEdit.name };

        await updateArea({
          id: areaToEdit.id,
          originalData: originalDto,
          updatedData: formDto,
        });
      } else {
        const formDto: AreaDto = {
          name: data.name,
          locationId: locationId,
        };

        await createArea(formDto);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Falha ao salvar ambiente:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={areaToEdit ? 'Editar Ambiente' : 'Novo Ambiente'}
    >
      <FormProvider {...methods}>
        <AreaForm
          isLoading={isLoading}
          areaToEdit={areaToEdit}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default AreaFormContainer;
