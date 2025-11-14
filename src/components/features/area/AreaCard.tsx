'use client';

import Card from '@/components/ui/Card';
import { Area } from '@/interfaces/Area';
import { useRouter } from 'next/navigation';

interface AreaCardProps {
  area: Area;
  onEdit: (area: Area) => void;
  onDelete: (areaId: number) => void;
}

export default function AreaCard({ area, onEdit, onDelete }: AreaCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/areas/${area.id}`);
  };

  const handleEdit = () => {
    onEdit(area);
  };

  const handleDelete = () => {
    onDelete(area.id);
  };

  return (
    <Card
      title={area.name}
      onClick={handleCardClick}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
