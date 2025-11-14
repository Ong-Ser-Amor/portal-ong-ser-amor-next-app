'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';
import AreaFormContainer from '../area/AreaFormContainer';
import LocationFormContainer from './LocationFormContainer';
import LocationDetail from '@/components/features/location/LocationDetail';
import { useDeleteArea } from '@/hooks/area/useAreaMutations';
import { Area } from '@/interfaces/Area';
import { useArea, useAreas } from '@/hooks/area/useAreaQueries';
import { useLocation } from '@/hooks/location/useLocationQueries';

interface LocationDetailContainerProps {
  locationId: number;
}

export default function LocationDetailContainer({
  locationId,
}: LocationDetailContainerProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    location,
    loading: locationLoading,
    refetch: refetchLocation,
  } = useLocation(locationId);
  const {
    areas,
    loading: areasLoading,
    meta,
    refetch: refetchAreas,
  } = useAreas(locationId, currentPage, itemsPerPage);

  const [isEditLocationModalOpen, setIsEditLocationModalOpen] = useState(false);
  const [isAddAreaModalOpen, setIsAddAreaModalOpen] = useState(false);
  const [isEditAreaModalOpen, setIsEditAreaModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const handleBack = () => {
    router.push('/locations');
  };

  const handleEditLocation = () => {
    setIsEditLocationModalOpen(true);
  };

  const handleAddArea = () => {
    setIsAddAreaModalOpen(true);
  };

  const handleEditArea = (area: Area) => {
    setSelectedArea(area);
    setIsEditAreaModalOpen(true);
  };

  const { deleteArea } = useDeleteArea();

  const handleDeleteArea = async (areaId: number) => {
    if (confirm('Tem certeza que deseja excluir esta área?')) {
      try {
        await deleteArea(areaId);
        toast.success('Área excluída com sucesso!');
        refetchAreas();
      } catch (error) {
        const message = getApiErrorMessage(error);
        toast.error(message || 'Erro ao excluir área.');
        console.error('Erro ao deletar área:', error);
      }
    }
  };

  const handleLocationSuccess = () => {
    refetchLocation();
    setIsEditLocationModalOpen(false);
  };

  const handleAreaSuccess = () => {
    setCurrentPage(1);
    refetchAreas();
    setIsAddAreaModalOpen(false);
    setIsEditAreaModalOpen(false);
    setSelectedArea(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <LocationDetail
        location={location}
        areas={areas}
        loading={locationLoading || areasLoading}
        currentPage={currentPage}
        totalPages={meta?.totalPages ?? 0}
        onPageChange={handlePageChange}
        onBack={handleBack}
        onEditLocation={handleEditLocation}
        onAddArea={handleAddArea}
        onEditArea={handleEditArea}
        onDeleteArea={handleDeleteArea}
      />

      {/* Modal de Edição do Local */}
      <LocationFormContainer
        isOpen={isEditLocationModalOpen}
        onClose={() => setIsEditLocationModalOpen(false)}
        locationToEdit={location}
        onSuccess={handleLocationSuccess}
      />

      {/* Modal de Adicionar Área */}
      <AreaFormContainer
        isOpen={isAddAreaModalOpen}
        onClose={() => setIsAddAreaModalOpen(false)}
        locationId={locationId}
        onSuccess={handleAreaSuccess}
      />

      {/* Modal de Editar Área */}
      <AreaFormContainer
        isOpen={isEditAreaModalOpen}
        onClose={() => setIsEditAreaModalOpen(false)}
        locationId={locationId}
        areaToEdit={selectedArea}
        onSuccess={handleAreaSuccess}
      />
    </>
  );
}
