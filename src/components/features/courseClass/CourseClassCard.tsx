'use client';

import { CourseClass, CourseClassStatusEnum } from '@/interfaces/CourseClass';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

interface CourseClassCardProps {
  courseClass: CourseClass;
  onEdit: (courseClass: CourseClass) => void;
  onDelete: (courseClassId: number) => void;
}

const statusConfig: Record<
  CourseClassStatusEnum,
  {
    label: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
> = {
  [CourseClassStatusEnum.EM_FORMACAO]: {
    label: 'Em Formação',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-500',
  },
  [CourseClassStatusEnum.EM_ANDAMENTO]: {
    label: 'Em Andamento',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-500',
  },
  [CourseClassStatusEnum.FINALIZADA]: {
    label: 'Finalizada',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-500',
  },
  [CourseClassStatusEnum.CANCELADA]: {
    label: 'Cancelada',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-500',
  },
};

export default function CourseClassCard({
  courseClass,
  onEdit,
  onDelete,
}: CourseClassCardProps) {
  const router = useRouter();
  const status = statusConfig[courseClass.status];

  const handleCardClick = () => {
    router.push(`/course-classes/${courseClass.id}`);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Card
      title={courseClass.name}
      borderColor={status.borderColor}
      onClick={handleCardClick}
      onEdit={() => onEdit(courseClass)}
      onDelete={() => onDelete(courseClass.id)}
      badge={{
        label: status.label,
        bgColor: status.bgColor,
        textColor: status.textColor,
      }}
    >
      <div className='space-y-1 text-sm text-gray-700'>
        <div>
          <strong>Professores:</strong>{' '}
          {courseClass.teachers && courseClass.teachers.length > 0
            ? courseClass.teachers.map((t) => t.name).join(', ')
            : 'Não atribuído'}
        </div>
        <div>
          <strong>Alunos:</strong> {courseClass.studentsCount || 0}
        </div>
        <div>
          <strong>Período:</strong> {formatDate(courseClass.startDate)} -{' '}
          {formatDate(courseClass.endDate)}
        </div>
      </div>
    </Card>
  );
}
