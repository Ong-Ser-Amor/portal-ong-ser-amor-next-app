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
      borderColor='border-blue-500'
      onClick={handleCardClick}
      onEdit={handleEdit}
      onDelete={handleDelete}
      badge={{
        label: `${course.activeClassesCount ?? 0} Turmas`,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
      }}
    />
  );
}
