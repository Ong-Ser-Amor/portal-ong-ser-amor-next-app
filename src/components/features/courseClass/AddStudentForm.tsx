import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { Student } from '@/interfaces/Student';

interface AddStudentFormProps {
  students: Student[];
  loading?: boolean;
  onSubmit: (studentId: number) => void;
  onCancel: () => void;
}

export default function AddStudentForm({
  students,
  loading = false,
  onSubmit,
  onCancel,
}: AddStudentFormProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  useEffect(() => {
    if (students.length > 0 && !selectedStudentId) {
      setSelectedStudentId(String(students[0].id));
    }
  }, [students, selectedStudentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentId) {
      onSubmit(Number(selectedStudentId));
    }
  };

  const studentOptions = students.map((student) => ({
    value: student.id,
    label: student.name,
  }));

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <Select
        id='student'
        label='Aluno'
        options={studentOptions}
        value={selectedStudentId}
        onChange={(e) => setSelectedStudentId(e.target.value)}
        disabled={loading}
      />

      <div className='flex justify-end space-x-2'>
        <Button
          type='button'
          variant='secondary'
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={!selectedStudentId || loading}
          isLoading={loading}
          loadingText='Adicionando...'
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
}
