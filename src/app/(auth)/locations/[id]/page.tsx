'use client';

import LocationDetailContainer from '@/containers/location/LocationDetailContainer';
import { use } from 'react';

interface LocationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function LocationDetailPage({
  params,
}: LocationDetailPageProps) {
  const { id } = use(params);
  const locationId = parseInt(id, 10);

  return (
    <div className='container mx-auto px-4 py-6'>
      <LocationDetailContainer locationId={locationId} />
    </div>
  );
}
