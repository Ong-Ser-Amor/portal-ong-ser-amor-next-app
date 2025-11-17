import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import LocationForm, {
  LocationFormData,
} from '@/components/features/location/LocationForm';
import { Location, LocationDto } from '@/interfaces/Location';
import {
  useCreateLocation,
  useUpdateLocation,
} from '@/hooks/location/useLocationMutations';

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
  const methods = useForm<LocationFormData>({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const { mutateAsync: createLocation, isPending: isCreating } =
    useCreateLocation();
  const { mutateAsync: updateLocation, isPending: isUpdating } =
    useUpdateLocation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name: locationToEdit?.name || '',
        address: locationToEdit?.address || '',
      });
    }
  }, [isOpen, locationToEdit, methods]);

  const handleFormSubmit = async (data: LocationFormData) => {
    try {
      const formDto: LocationDto = {
        name: data.name,
        address: data.address,
      };

      if (locationToEdit) {
        const originalDto: LocationDto = {
          name: locationToEdit.name,
          address: locationToEdit.address,
        };

        await updateLocation({
          id: locationToEdit.id,
          originalData: originalDto,
          updatedData: formDto,
        });
      } else {
        await createLocation(formDto);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Falha ao salvar local:', error);
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
