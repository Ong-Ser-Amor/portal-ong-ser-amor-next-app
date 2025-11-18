'use client';

import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import { useState } from 'react';
import AssetCategoryList from '@/components/features/asset-category/AssetCategoryList';
import { useDeleteAssetCategory } from '@/hooks/assetCategory/useAssetCategoryMutations';
import { useAssetCategories } from '@/hooks/assetCategory/useAssetCategoryQueries';
import AssetCategoryFormContainer from './AssetCategoryFormContainer';
import { AssetCategory } from '@/interfaces/AssetCategory';

const AssetCategoryListContainer: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  // Estados para o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssetCategory, setEditingAssetCategory] =
    useState<AssetCategory | null>(null);

  // Estados para confirmação de exclusão
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [assetCategoryToDelete, setAssetCategoryToDelete] = useState<
    number | null
  >(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Hooks customizados
  const { assetCategories, loading, error, meta, refetch } = useAssetCategories(
    currentPage,
    itemsPerPage,
  );
  const { mutateAsync: deleteAssetCategory, isPending: isSubmitting } =
    useDeleteAssetCategory();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
  };

  const handleAddAssetCategory = () => {
    setEditingAssetCategory(null);
    setIsModalOpen(true);
  };

  const handleEditAssetCategory = (assetCategory: AssetCategory) => {
    setEditingAssetCategory(assetCategory);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (assetCategoryId: number) => {
    setAssetCategoryToDelete(assetCategoryId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (assetCategoryToDelete === null) return;

    try {
      await deleteAssetCategory(assetCategoryToDelete);

      setAssetCategoryToDelete(null);
      setDeleteConfirmOpen(false);

      // Paginação Inteligente
      if (assetCategories.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Erro ao excluir categoria de patrimônio:', err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssetCategory(null);
    setDeleteConfirmOpen(false);
    setAssetCategoryToDelete(null);
  };

  const handleAssetCategorySuccess = () => {
    setIsModalOpen(false);
    setEditingAssetCategory(null);

    if (!editingAssetCategory && currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <>
      <AssetCategoryList
        assetCategories={assetCategories}
        loading={loading}
        error={error}
        searchInput={searchInput}
        meta={meta}
        onSearchInputChange={setSearchInput}
        onFilterClick={handleFilterClick}
        onAddAssetCategory={handleAddAssetCategory}
        onEditAssetCategory={handleEditAssetCategory}
        onDeleteClick={handleDeleteClick}
        onPageChange={handlePageChange}
      />

      <AssetCategoryFormContainer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        assetCategoryToEdit={editingAssetCategory}
        onSuccess={handleAssetCategorySuccess}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        message='Tem certeza que deseja excluir esta categoria de patrimônio?'
        isLoading={isSubmitting}
      />
    </>
  );
};

export default AssetCategoryListContainer;
