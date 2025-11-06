import { use } from 'react';
import LessonDetailContainer from '@/containers/lesson/LessonDetailContainer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function LessonDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const lessonId = parseInt(id, 10);

  return <LessonDetailContainer lessonId={lessonId} />;
}
