'use client';

import LocationList from '@/components/features/location/LocationList';
import LocationFormContainer from './LocationFormContainer';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import { Location } from '@/interfaces/Location';
import { useDeleteLocation } from '@/hooks/location/useLocationMutations';
import { useLocations } from '@/hooks/location/useLocationQueries';
import { useState } from 'react';

const LocationListContainer: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Hooks customizados
  const { locations, loading, error, meta, refetch } = useLocations(
    currentPage,
    itemsPerPage,
  );
  const { mutateAsync: deleteLocation, isPending: isSubmitting } =
    useDeleteLocation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setIsModalOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (locationId: number) => {
    setLocationToDelete(locationId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (locationToDelete === null) return;

    try {
      await deleteLocation(locationToDelete);

      setLocationToDelete(null);
      setDeleteConfirmOpen(false);

      if (locations.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Erro ao excluir local:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
    setDeleteConfirmOpen(false);
    setLocationToDelete(null);
  };

  const handleLocationSuccess = async () => {
    setIsModalOpen(false);
    setEditingLocation(null);

    if (!editingLocation && currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <>
      <LocationList
        locations={locations}
        loading={loading}
        error={error}
        searchInput={searchInput}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        onSearchInputChange={setSearchInput}
        onFilterClick={handleFilterClick}
        onAddLocation={handleAddLocation}
        onEditLocation={handleEditLocation}
        onDeleteClick={handleDeleteClick}
        onPageChange={handlePageChange}
      />

      <LocationFormContainer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        locationToEdit={editingLocation}
        onSuccess={handleLocationSuccess}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        message='Tem certeza que deseja excluir esta localização?'
        isLoading={isSubmitting}
      />
    </>
  );
};

export default LocationListContainer;
