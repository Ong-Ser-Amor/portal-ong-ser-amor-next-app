import { User } from '@/interfaces/User';
import ListItem from '@/components/ui/ListItem';
import Pagination from '@/components/ui/Pagination';
import IconButton from '@/components/ui/IconButton';
import { FiTrash2 } from 'react-icons/fi';
import { PaginationMeta } from '@/interfaces/Pagination';

interface CourseClassTeacherListProps {
  teachers: User[];
  loading: boolean;
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onRemoveTeacher: (teacherId: number) => void;
}

export default function CourseClassTeacherList({
  teachers,
  loading,
  meta,
  onPageChange,
  onRemoveTeacher,
}: CourseClassTeacherListProps) {
  if (loading) {
    return (
      <div className='flex justify-center p-8'>
        <div
          className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2'
          style={{ borderColor: 'var(--accent-primary)' }}
        ></div>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div
        className='p-8 text-center'
        style={{ color: 'var(--text-secondary)' }}
      >
        Nenhum professor atribuído ainda.
      </div>
    );
  }

  return (
    <div>
      <div className='space-y-3'>
        {teachers.map((teacher) => (
          <ListItem
            key={teacher.id}
            title={teacher.name}
            subtitle={teacher.email}
            actions={
              <IconButton
                icon={FiTrash2}
                onClick={() => onRemoveTeacher(teacher.id)}
                variant='danger'
                tooltip='Remover professor da turma'
              />
            }
          />
        ))}
      </div>
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
