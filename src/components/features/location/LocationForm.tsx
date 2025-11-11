'use client';

import { useState, useEffect, useCallback } from 'react';
import { locationService } from '@/services/location/locationService';
import { LocationDto } from '@/interfaces/Location';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { useForm } from 'react-hook-form';

import { Location } from '@/interfaces/Location';

interface LocationFormProps {
  locationToEdit?: Location | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  locationToEdit,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LocationDto>({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const loadLocation = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        const location = await locationService.getLocation(id);
        setValue('name', location.name as string);
        setValue('address', location.address ?? '');
      } catch (err) {
        setError('Erro ao carregar localização');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [setValue, setLoading, setError],
  );

  useEffect(() => {
    if (isOpen) {
      // Resetar o formulário quando abrir
      if (locationToEdit) {
        reset({
          name: locationToEdit.name ?? '',
          address: locationToEdit.address ?? '',
        });
      } else {
        reset({
          name: '',
          address: '',
        });
      }
    }
  }, [isOpen, locationToEdit, reset]);

  const onSubmit = async (data: LocationDto) => {
    try {
      setLoading(true);
      setError(null);

      if (locationToEdit && locationToEdit.id) {
        await locationService.updateLocation(locationToEdit.id, data);
      } else {
        await locationService.createLocation(data);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError('Erro ao salvar localização');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const modalFooter = (
    <>
      <Button type='button' variant='secondary' onClick={onClose}>
        Cancelar
      </Button>
      <Button
        type='submit'
        variant='primary'
        isLoading={loading}
        loadingText='Salvando...'
        onClick={handleSubmit(onSubmit)}
      >
        Salvar
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={locationToEdit ? 'Editar Localização' : 'Nova Localização'}
      footer={modalFooter}
    >
      <Form onSubmit={handleSubmit(onSubmit)} error={error}>
        <Input
          id='name'
          label='Nome'
          type='text'
          error={errors.name}
          {...register('name', { required: 'Nome é obrigatório' })}
        />
        <Input
          id='address'
          label='Endereço'
          type='text'
          error={errors.address}
          {...register('address')}
        />
      </Form>
    </Modal>
  );
};

export default LocationForm;
