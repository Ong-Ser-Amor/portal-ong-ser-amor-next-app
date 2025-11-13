import { Location } from '@/interfaces/Location';
import Card from '@/components/ui/Card';
import React from 'react';

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
  const handleEdit = () => {
    onEdit(location);
  };
  const handleDelete = () => {
    onDelete(location.id);
  };
  return (
    <Card
      title={location.name || ''}
      onEdit={handleEdit}
      onDelete={handleDelete}
    >
      {location.address && (
        <p className='text-sm text-gray-600'>{location.address}</p>
      )}
    </Card>
  );
}
