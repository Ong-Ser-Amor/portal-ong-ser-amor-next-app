'use client';

import Modal from '@/components/ui/Modal';

import { Area, CreateAreaDto, UpdateAreaDto } from '@/interfaces/Area';
import { getApiErrorMessage } from '@/utils/errorUtils';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateArea, useUpdateArea } from '@/hooks/area/useAreaMutations';
import AreaForm from './AreaForm';

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
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CreateAreaDto>({
    defaultValues: {
      name: areaToEdit?.name || '',
    },
  });

  const { createArea } = useCreateArea();
  const { updateArea } = useUpdateArea();

  useEffect(() => {
    methods.reset({
      name: areaToEdit?.name || '',
    });
  }, [areaToEdit, isOpen, methods, locationId]);

  const handleFormSubmit = async (data: CreateAreaDto) => {
    setIsLoading(true);

    try {
      if (areaToEdit) {
        await updateArea(areaToEdit.id, { name: data.name });
        toast.success('Ambiente atualizado com sucesso!');
      } else {
        await createArea({ name: data.name, locationId });
        toast.success('Ambiente criado com sucesso!');
      }

      methods.reset();
      onSuccess();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao salvar ambiente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    methods.reset();
    onClose();
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
          onCancel={handleCancel}
        />
      </FormProvider>
    </Modal>
  );
};

export default AreaFormContainer;
