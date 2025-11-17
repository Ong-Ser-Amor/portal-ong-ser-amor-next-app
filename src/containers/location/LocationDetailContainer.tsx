'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AreaFormContainer from '../area/AreaFormContainer';
import LocationFormContainer from './LocationFormContainer';
import LocationDetail from '@/components/features/location/LocationDetail';
import { useDeleteArea } from '@/hooks/area/useAreaMutations';
import { Area } from '@/interfaces/Area';
import { useAreas } from '@/hooks/area/useAreaQueries';
import { useLocation } from '@/hooks/location/useLocationQueries';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';

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

  const { mutateAsync: deleteArea, isPending: isSubmitting } = useDeleteArea();

  const [isEditLocationModalOpen, setIsEditLocationModalOpen] = useState(false);

  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<number | null>(null);

  const handleBack = () => {
    router.push('/locations');
  };

  const handleEditLocation = () => {
    setIsEditLocationModalOpen(true);
  };

  const handleAddArea = () => {
    setSelectedArea(null);
    setIsAreaModalOpen(true);
  };

  const handleEditArea = (area: Area) => {
    setSelectedArea(area);
    setIsAreaModalOpen(true);
  };

  const handleDeleteAreaClick = (areaId: number) => {
    setAreaToDelete(areaId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteAreaConfirm = async () => {
    if (areaToDelete === null) return;

    try {
      await deleteArea(areaToDelete);

      setAreaToDelete(null);
      setDeleteConfirmOpen(false);

      if (areas.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('Erro ao deletar área:', error);
    }
  };

  const handleLocationSuccess = () => {
    refetchLocation();
    setIsEditLocationModalOpen(false);
  };

  const handleAreaSuccess = () => {
    setIsAreaModalOpen(false);
    // Se estava criando um novo (selectedArea era null), volta pra pag 1
    if (!selectedArea && currentPage !== 1) {
      setCurrentPage(1);
    }
    setSelectedArea(null);
  };

  const handleCloseAreaModal = () => {
    setIsAreaModalOpen(false);
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
        onDeleteArea={handleDeleteAreaClick}
      />

      {/* Modal de Edição do Local */}
      <LocationFormContainer
        isOpen={isEditLocationModalOpen}
        onClose={() => setIsEditLocationModalOpen(false)}
        locationToEdit={location}
        onSuccess={handleLocationSuccess}
      />

      {/* Modal de editar Área */}
      <AreaFormContainer
        isOpen={isAreaModalOpen}
        onClose={handleCloseAreaModal}
        locationId={locationId}
        areaToEdit={selectedArea}
        onSuccess={handleAreaSuccess}
      />

      {/* Modal de Deleção Padronizado */}
      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteAreaConfirm}
        message='Tem certeza que deseja excluir este ambiente?'
        isLoading={isSubmitting}
      />
    </>
  );
}
