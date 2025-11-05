import { Lesson } from '@/interfaces/Lesson';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import IconButton from '@/components/ui/IconButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface LessonListProps {
  lessons: Lesson[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: number) => void;
  onPageChange: (page: number) => void;
}

export default function LessonList({
  lessons,
  loading,
  currentPage,
  totalPages,
  onEdit,
  onDelete,
  onPageChange,
}: LessonListProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  const lessonColumns = [
    {
      header: 'Data',
      accessor: (lesson: Lesson) => formatDate(lesson.date),
    },
    {
      header: 'Tópico',
      accessor: (lesson: Lesson) => lesson.topic || '-',
    },
    {
      header: 'Ações',
      accessor: (lesson: Lesson) => (
        <div className='flex justify-end space-x-1'>
          <IconButton
            icon={FiEdit}
            onClick={() => onEdit(lesson)}
            variant='primary'
            tooltip='Editar aula'
          />
          <IconButton
            icon={FiTrash2}
            onClick={() => onDelete(lesson.id)}
            variant='danger'
            tooltip='Excluir aula'
          />
        </div>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <div>
      <Table
        columns={lessonColumns}
        data={lessons}
        keyExtractor={(lesson) => lesson.id}
        isLoading={loading}
        emptyMessage='Nenhuma aula cadastrada ainda.'
      />
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className='mt-5 flex justify-center'
        />
      )}
    </div>
  );
}
