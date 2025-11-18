import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { AssetCategory } from '@/interfaces/AssetCategory';

interface AssetCategoryCardProps {
  assetCategory: AssetCategory;
  onEdit: (assetCategory: AssetCategory) => void;
  onDelete: (assetCategoryId: number) => void;
}

export default function AssetCategoryCard({
  assetCategory,
  onEdit,
  onDelete,
}: AssetCategoryCardProps) {
  const router = useRouter();
  const handleEdit = () => {
    onEdit(assetCategory);
  };
  const handleDelete = () => {
    onDelete(assetCategory.id);
  };
  const handleCardClick = () => {
    router.push(`/asset-categories/${assetCategory.id}`);
  };
  return (
    <Card
      title={assetCategory.name || ''}
      onClick={handleCardClick}
      onEdit={handleEdit}
      onDelete={handleDelete}
    ></Card>
  );
}
