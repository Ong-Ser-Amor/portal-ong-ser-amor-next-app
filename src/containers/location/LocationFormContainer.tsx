import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import LocationForm, { LocationFormData } from '@/components/features/location/LocationForm';
import { Location, LocationDto } from '@/interfaces/Location';
import { locationService } from '@/services/location/locationService';
import { toast } from 'react-toastify';

interface LocationFormContainerProps {
  isOpen: boolean;
  onClose: () => void;
  locationToEdit?: Location | null;
  onSuccess: () => void;
}

const LocationFormContainer: React.FC<LocationFormContainerProps> = ({
  isOpen,
  onClose,
  locationToEdit,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<LocationFormData>({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: locationToEdit?.name || '',
        address: locationToEdit?.address || '',
      });
    }
  }, [isOpen, locationToEdit, methods]);

  const handleFormSubmit = async (data: LocationFormData) => {
    setIsLoading(true);
    try {
      if (locationToEdit && locationToEdit.id) {
        await locationService.updateLocation(locationToEdit.id, data);
      } else {
        await locationService.createLocation(data);
      }
      toast.success('Localização salva com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Erro ao salvar localização.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={locationToEdit ? 'Editar Localização' : 'Nova Localização'}
      size='md'
    >
      <FormProvider {...methods}>
        <LocationForm
          locationToEdit={locationToEdit}
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
          onCancel={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default LocationFormContainer;
