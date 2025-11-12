import Pagination from '@/components/ui/Pagination';
import Table from '@/components/ui/Table';
import IconButton from '@/components/ui/IconButton';
import { Student } from '@/interfaces/Student';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import PageHeader from '@/components/layout/PageHeader';
import SearchBar from '@/components/ui/SearchBar';
import Button from '@/components/ui/Button';

interface StudentListProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  currentPage: number;
  totalPages: number;
  onSearchInputChange: (value: string) => void;
  onFilterClick: () => void;
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteClick: (studentId: number) => void;
  onPageChange: (page: number) => void;
}

export default function StudentList({
  students,
  loading,
  error,
  searchInput,
  currentPage,
  totalPages,
  onSearchInputChange,
  onFilterClick,
  onAddStudent,
  onEditStudent,
  onDeleteClick,
  onPageChange,
}: StudentListProps) {
  const studentColumns = [
    { header: 'Nome', accessor: (student: Student) => student.name },
    {
      header: 'Ações',
      accessor: (student: Student) => (
        <div className='flex justify-end space-x-1'>
          <IconButton
            icon={FiEdit}
            onClick={() => onEditStudent(student)}
            variant='primary'
            tooltip='Editar aluno'
          />
          <IconButton
            icon={FiTrash2}
            onClick={() => onDeleteClick(student.id)}
            variant='danger'
            tooltip='Excluir aluno'
          />
        </div>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <div className='container mx-auto px-4 py-5'>
      <PageHeader title='Alunos' breadcrumb='Gestão de Alunos'>
        <SearchBar
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder='Buscar alunos...'
          onSearch={onFilterClick}
        />
        <Button variant='secondary' size='small' onClick={onFilterClick}>
          <FaFilter className='mr-2' /> Filtrar
        </Button>
        <Button variant='gradient' size='small' onClick={onAddStudent}>
          <FaPlus className='mr-2' /> Novo Aluno
        </Button>
      </PageHeader>

      <div
        className='rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        {loading ? (
          <div className='py-8 text-center'>
            <div
              className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2'
              style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
            />
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Carregando alunos...
            </p>
          </div>
        ) : error ? (
          <div className='py-8 text-center text-red-500'>{error}</div>
        ) : students.length === 0 ? (
          <div className='py-8 text-center'>
            <p style={{ color: 'var(--text-secondary, #666666)' }}>
              Nenhum aluno encontrado.
            </p>
          </div>
        ) : (
          <Table
            columns={studentColumns}
            data={students}
            keyExtractor={(student) => student.id}
            isLoading={loading}
            emptyMessage='Nenhum aluno encontrado.'
          />
        )}
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}
