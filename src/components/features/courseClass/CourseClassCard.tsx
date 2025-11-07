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
    bg: string;
    color: string;
  }
> = {
  [CourseClassStatusEnum.EM_FORMACAO]: {
    label: 'Em Formação',
    bg: '#e1f5fe',
    color: '#01579b',
  },
  [CourseClassStatusEnum.EM_ANDAMENTO]: {
    label: 'Em Andamento',
    bg: '#e8f5e9',
    color: '#2e7d32',
  },
  [CourseClassStatusEnum.FINALIZADA]: {
    label: 'Finalizada',
    bg: '#f5f5f5',
    color: '#757575',
  },
  [CourseClassStatusEnum.CANCELADA]: {
    label: 'Cancelada',
    bg: '#ffebee',
    color: '#c62828',
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
      onClick={handleCardClick}
      onEdit={() => onEdit(courseClass)}
      onDelete={() => onDelete(courseClass.id)}
    >
      <div 
        className='space-y-1 text-sm'
        style={{ color: 'var(--text-secondary, #666666)' }}
      >
        <div>
          <strong style={{ color: 'var(--text-primary, #333333)' }}>Professores:</strong>{' '}
          {courseClass.teachers && courseClass.teachers.length > 0
            ? courseClass.teachers.map((t) => t.name).join(', ')
            : 'Não atribuído'}
        </div>
        <div>
          <strong style={{ color: 'var(--text-primary, #333333)' }}>Alunos:</strong> {courseClass.studentsCount || 0}
        </div>
        <div>
          <strong style={{ color: 'var(--text-primary, #333333)' }}>Período:</strong> {formatDate(courseClass.startDate)} -{' '}
          {formatDate(courseClass.endDate)}
        </div>
      </div>
      
      <div 
        className='mt-3 inline-block rounded-full'
        style={{
          padding: '6px 14px',
          background: status.bg,
          color: status.color,
          fontSize: '12px',
          fontWeight: '600',
        }}
      >
        {status.label}
      </div>
    </Card>
  );
}
