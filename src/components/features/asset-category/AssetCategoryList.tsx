import PageHeader from '@/components/layout/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';
import { FaFilter } from 'react-icons/fa6';
import Pagination from '@/components/ui/Pagination';
import { AssetCategory } from '@/interfaces/AssetCategory';
import AssetCategoryCard from './AssetCategoryCard';

interface AssetCategoryListProps {
  assetCategories: AssetCategory[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  currentPage: number;
  totalPages: number;
  onSearchInputChange: (value: string) => void;
  onFilterClick: () => void;
  onAddAssetCategory: () => void;
  onEditAssetCategory: (assetCategory: AssetCategory) => void;
  onDeleteClick: (assetCategoryId: number) => void;
  onAssetCategoryClick?: (assetCategory: AssetCategory) => void;
  onPageChange: (page: number) => void;
}

export default function AssetCategoryList({
  assetCategories,
  loading,
  error,
  searchInput,
  currentPage,
  totalPages,
  onSearchInputChange,
  onFilterClick,
  onAddAssetCategory,
  onEditAssetCategory,
  onDeleteClick,
  onPageChange,
}: AssetCategoryListProps) {
  return (
    <div className='container mx-auto px-4 py-5'>
      <PageHeader
        title='Categorias de Ativos'
        breadcrumb='Gestão de Categorias de Ativos'
      >
        <SearchBar
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder='Buscar categorias de ativos...'
          onSearch={onFilterClick}
        />
        <Button variant='secondary' size='small' onClick={onFilterClick}>
          <FaFilter className='mr-2' /> Filtrar
        </Button>
        <Button variant='gradient' size='small' onClick={onAddAssetCategory}>
          + Nova Categoria de Patrimônio
        </Button>
      </PageHeader>

      <div
        className='rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        {loading ? (
          <div className='py-8 text-center'>
            <div
              className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2'
              style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
            />
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Carregando categorias de patrimônio...
            </p>
          </div>
        ) : error ? (
          <div className='py-8 text-center text-red-500'>{error}</div>
        ) : assetCategories.length === 0 ? (
          <div className='py-8 text-center'>
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Nenhuma categoria de patrimônio encontrada.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {assetCategories.map((assetCategory) => (
              <AssetCategoryCard
                key={assetCategory.id}
                assetCategory={assetCategory}
                onEdit={onEditAssetCategory}
                onDelete={onDeleteClick}
              />
            ))}
          </div>
        )}
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
