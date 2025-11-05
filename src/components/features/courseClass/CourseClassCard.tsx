import { CourseClass, CourseClassStatusEnum } from '@/interfaces/CourseClass';
import IconButton from '@/components/ui/IconButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

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
  const status = statusConfig[courseClass.status];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`rounded-lg border-l-4 ${status.borderColor} bg-white p-6 shadow-md transition-shadow hover:shadow-lg`}
    >
      {/* Header com título */}
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {courseClass.name}
        </h3>
      </div>

      {/* Informações */}
      <div className='mb-4 space-y-1 text-sm text-gray-700'>
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

      {/* Badge de status e Botões de ação */}
      <div className='flex items-center justify-between'>
        <span
          className={`inline-block rounded-full ${status.bgColor} px-3 py-1 text-xs font-medium ${status.textColor}`}
        >
          {status.label}
        </span>
        <div className='flex space-x-1'>
          <IconButton
            icon={FiEdit}
            onClick={() => onEdit(courseClass)}
            variant='primary'
            tooltip='Editar turma'
          />
          <IconButton
            icon={FiTrash2}
            onClick={() => onDelete(courseClass.id)}
            variant='danger'
            tooltip='Excluir turma'
          />
        </div>
      </div>
    </div>
  );
}
