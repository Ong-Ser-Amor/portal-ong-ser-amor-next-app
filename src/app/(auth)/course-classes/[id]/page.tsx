import { use } from 'react';
import CourseClassDetailContainer from '@/containers/courseClass/CourseClassDetailContainer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourseClassDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const courseClassId = parseInt(id, 10);

  return <CourseClassDetailContainer courseClassId={courseClassId} />;
}
