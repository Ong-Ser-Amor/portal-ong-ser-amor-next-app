import { Lesson } from '@/interfaces/Lesson';
import { Attendance } from '@/interfaces/Attendance';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AttendanceList from '../attendance/AttendanceList';

interface LessonDetailProps {
  lesson: Lesson | null;
  attendances: Attendance[];
  loading: boolean;
  onBack: () => void;
  onRegisterAttendance: () => void;
  onDeleteAttendance: () => void;
}

export default function LessonDetail({
  lesson,
  attendances,
  loading,
  onBack,
  onRegisterAttendance,
  onDeleteAttendance,
}: LessonDetailProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  if (loading && !lesson) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center py-12'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500'></div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <BackButton onClick={onBack} />
        <div className='mt-4 text-center text-gray-500'>
          Aula não encontrada.
        </div>
      </div>
    );
  }

  const hasAttendances = attendances.length > 0;

  return (
    <div className='container mx-auto px-4 py-8'>
      <BackButton onClick={onBack} />

      <div className='mt-6 rounded-lg bg-white p-6 shadow-md'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Aula - {formatDate(lesson.date)}
          </h1>
          {lesson.topic && (
            <p className='mt-2 text-lg text-gray-600'>
              <strong>Tema:</strong> {lesson.topic}
            </p>
          )}
        </div>

        <hr className='my-6' />

        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            Lista de Chamada
          </h2>
          <div className='flex gap-2'>
            {hasAttendances && (
              <Button
                onClick={onDeleteAttendance}
                variant='secondary'
                className='flex items-center gap-2'
              >
                <FiTrash2 />
                Excluir Chamada
              </Button>
            )}
            <Button onClick={onRegisterAttendance} className='flex items-center gap-2'>
              <FiEdit />
              {hasAttendances ? 'Editar Chamada' : 'Registrar Chamada'}
            </Button>
          </div>
        </div>

        <AttendanceList attendances={attendances} loading={loading} />
      </div>
    </div>
  );
}
