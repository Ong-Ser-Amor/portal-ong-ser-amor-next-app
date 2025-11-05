'use client';

import CourseDetailContainer from '@/containers/course/CourseDetailContainer';
import { use } from 'react';

interface CourseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = use(params);
  const courseId = parseInt(id, 10);

  return (
    <div className='container mx-auto px-4 py-6'>
      <CourseDetailContainer courseId={courseId} />
    </div>
  );
}
