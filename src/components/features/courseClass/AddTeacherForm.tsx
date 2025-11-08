import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AddTeacherFormProps {
  loading?: boolean;
  onSubmit: (teacherId: number) => void;
  onCancel: () => void;
}

export default function AddTeacherForm({
  loading = false,
  onSubmit,
  onCancel,
}: AddTeacherFormProps) {
  const [teacherId, setTeacherId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId && !isNaN(Number(teacherId))) {
      onSubmit(Number(teacherId));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Input
          id='teacherId'
          label='ID do Professor'
          type='number'
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          disabled={loading}
          placeholder='Digite o ID do professor'
          required
        />
        <p className='mt-1 text-xs text-gray-500'>
          Informe o ID do usuário que será professor desta turma
        </p>
      </div>

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
          disabled={!teacherId || loading}
          isLoading={loading}
          loadingText='Adicionando...'
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
}
