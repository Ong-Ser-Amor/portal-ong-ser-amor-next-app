'use client';

import { Lesson } from '@/interfaces/Lesson';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import IconButton from '@/components/ui/IconButton';
import Button from '@/components/ui/Button';
import { FiEdit, FiTrash2, FiClipboard } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { PaginationMeta } from '@/interfaces/Pagination';

interface LessonListProps {
  lessons: Lesson[];
  loading: boolean;
  meta: PaginationMeta;
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: number) => void;
  onPageChange: (page: number) => void;
}

export default function LessonList({
  lessons,
  loading,
  meta,
  onEdit,
  onDelete,
  onPageChange,
}: LessonListProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  const handleAttendanceClick = (lesson: Lesson) => {
    router.push(`/lessons/${lesson.id}`);
  };

  const lessonColumns = [
    {
      header: 'Data',
      accessor: (lesson: Lesson) => formatDate(lesson.date),
    },
    {
      header: 'Tema',
      accessor: (lesson: Lesson) => lesson.topic || '-',
    },
    {
      header: 'Ações',
      accessor: (lesson: Lesson) => (
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            size='small'
            onClick={() => handleAttendanceClick(lesson)}
          >
            <FiClipboard className='mr-1' /> Chamada
          </Button>
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
      {meta.totalPages > 0 && (
        <Pagination
          meta={meta}
          onPageChange={onPageChange}
          className='mt-5 flex justify-center'
        />
      )}
    </div>
  );
}
