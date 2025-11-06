import { Student } from '@/interfaces/Student';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import IconButton from '@/components/ui/IconButton';
import { FiTrash2 } from 'react-icons/fi';

interface CourseClassStudentListProps {
  students: Student[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRemoveStudent: (studentId: number) => void;
}

export default function CourseClassStudentList({
  students,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onRemoveStudent,
}: CourseClassStudentListProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  const studentColumns = [
    {
      header: 'Nome',
      accessor: (student: Student) => student.name,
    },
    {
      header: 'Data de Nascimento',
      accessor: (student: Student) => formatDate(student.birthDate),
    },
    {
      header: 'Ações',
      accessor: (student: Student) => (
        <div className='flex justify-end space-x-1' onClick={(e) => e.stopPropagation()}>
          <IconButton
            icon={FiTrash2}
            onClick={() => onRemoveStudent(student.id)}
            variant='danger'
            tooltip='Remover aluno da turma'
          />
        </div>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <div>
      <Table
        columns={studentColumns}
        data={students}
        keyExtractor={(student) => student.id}
        isLoading={loading}
        emptyMessage='Nenhum aluno matriculado ainda.'
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
