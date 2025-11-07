import { Student } from '@/interfaces/Student';
import ListItem from '@/components/ui/ListItem';
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
  const calculateAge = (dateString: string) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} anos`;
  };

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

  if (students.length === 0) {
    return (
      <div className='text-center p-8' style={{ color: 'var(--text-secondary)' }}>
        Nenhum aluno matriculado ainda.
      </div>
    );
  }

  return (
    <div>
      <div className='space-y-3'>
        {students.map((student) => (
          <ListItem
            key={student.id}
            title={student.name}
            subtitle={calculateAge(student.birthDate)}
            actions={
              <IconButton
                icon={FiTrash2}
                onClick={() => onRemoveStudent(student.id)}
                variant='danger'
                tooltip='Remover aluno da turma'
              />
            }
          />
        ))}
      </div>
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
