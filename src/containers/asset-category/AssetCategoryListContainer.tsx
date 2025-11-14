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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const deleteAssetCategory = useDeleteAssetCategory();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
    refetch(1, itemsPerPage);
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
      setIsSubmitting(true);
      await deleteAssetCategory.deleteAssetCategory(assetCategoryToDelete);
      setCurrentPage(1);
      refetch(1, itemsPerPage);
      setAssetCategoryToDelete(null);
      setDeleteConfirmOpen(false);
    } catch (err) {
      console.error('Erro ao excluir categoria de patrimônio:', err);
      alert(
        'Erro ao excluir categoria de patrimônio. Verifique o console para mais detalhes.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssetCategory(null);
    setDeleteConfirmOpen(false);
    setAssetCategoryToDelete(null);
  };

  const handleAssetCategorySuccess = async () => {
    setCurrentPage(1);
    refetch(1, itemsPerPage);
    setIsModalOpen(false);
    setEditingAssetCategory(null);
  };

  return (
    <>
      <AssetCategoryList
        assetCategories={assetCategories}
        loading={loading}
        error={error}
        searchInput={searchInput}
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
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
