import { User } from '@/interfaces/User';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import IconButton from '@/components/ui/IconButton';
import { FiTrash2 } from 'react-icons/fi';

interface CourseClassTeacherListProps {
  teachers: User[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRemoveTeacher: (teacherId: number) => void;
}

export default function CourseClassTeacherList({
  teachers,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onRemoveTeacher,
}: CourseClassTeacherListProps) {
  const teacherColumns = [
    {
      header: 'Nome',
      accessor: (teacher: User) => teacher.name,
    },
    {
      header: 'Ações',
      accessor: (teacher: User) => (
        <div className='flex justify-end space-x-1' onClick={(e) => e.stopPropagation()}>
          <IconButton
            icon={FiTrash2}
            onClick={() => onRemoveTeacher(teacher.id)}
            variant='danger'
            tooltip='Remover professor da turma'
          />
        </div>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <div>
      <Table
        columns={teacherColumns}
        data={teachers}
        keyExtractor={(teacher) => teacher.id}
        isLoading={loading}
        emptyMessage='Nenhum professor atribuído ainda.'
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
