import { Location } from '@/interfaces/Location';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

interface LocationCardProps {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (locationId: number) => void;
}

export default function LocationCard({
  location,
  onEdit,
  onDelete,
}: LocationCardProps) {
  const router = useRouter();
  const handleEdit = () => {
    onEdit(location);
  };
  const handleDelete = () => {
    onDelete(location.id);
  };
  const handleCardClick = () => {
    router.push(`/locations/${location.id}`);
  };
  return (
    <Card
      title={location.name || ''}
      onClick={handleCardClick}
      onEdit={handleEdit}
      onDelete={handleDelete}
    >
      {location.address && (
        <p className='text-sm text-gray-600'>{location.address}</p>
      )}
    </Card>
  );
}
