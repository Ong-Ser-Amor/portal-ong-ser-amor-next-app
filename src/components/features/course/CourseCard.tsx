'use client';

import { Course } from '@/interfaces/Course';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: number) => void;
}

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/courses/${course.id}`);
  };

  const handleEdit = () => {
    onEdit(course);
  };

  const handleDelete = () => {
    onDelete(course.id);
  };

  return (
    <Card
      title={course.name}
      onClick={handleCardClick}
      onEdit={handleEdit}
      onDelete={handleDelete}
    >
      <div
        className='mt-3 inline-block rounded-full'
        style={{
          padding: '6px 14px',
          background: '#e1f5fe',
          color: '#01579b',
          fontSize: '12px',
          fontWeight: '600',
        }}
      >
        {course.activeClassesCount ?? 0} Turmas
      </div>
    </Card>
  );
}
