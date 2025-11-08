'use client';

import { Lesson } from '@/interfaces/Lesson';
import { Attendance } from '@/interfaces/Attendance';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AttendanceList from '../attendance/AttendanceList';
import { useThemeObserver } from '@/hooks/useThemeObserver';

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
  useThemeObserver();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  if (loading && !lesson) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center py-12'>
          <div
            className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2'
            style={{ borderColor: 'var(--accent-primary)' }}
          ></div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <PageHeader title='Aula não encontrada' onBack={onBack} />
        <div className='mt-4 text-center' style={{ color: 'var(--text-secondary)' }}>
          Aula não encontrada.
        </div>
      </div>
    );
  }

  const hasAttendances = attendances.length > 0;

  return (
    <div className='container mx-auto px-4 py-8'>
      <PageHeader
        title={`Chamada - ${formatDate(lesson.date)}`}
        breadcrumb={lesson.topic ? `Tema: ${lesson.topic}` : undefined}
        onBack={onBack}
      >
        <Button
          onClick={onRegisterAttendance}
          variant='primary'
          size='small'
        >
          <FiEdit className='mr-1' /> {hasAttendances ? 'Editar' : 'Registrar Chamada'}
        </Button>
        {hasAttendances && (
          <Button
            onClick={onDeleteAttendance}
            variant='secondary'
            size='small'
          >
            <FiTrash2 className='mr-1' /> Excluir Chamada
          </Button>
        )}
      </PageHeader>

      <div
        className='rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary)',
          boxShadow: '0 2px 8px var(--card-shadow)',
        }}
      >
        <AttendanceList attendances={attendances} loading={loading} />
      </div>
    </div>
  );
}
