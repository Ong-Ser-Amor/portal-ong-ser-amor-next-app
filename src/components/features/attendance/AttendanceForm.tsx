'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import { Student } from '@/interfaces/Student';
import { Attendance, AttendanceItem } from '@/interfaces/Attendance';

interface AttendanceFormData {
  studentId: number;
  studentName: string;
  present: boolean;
  notes: string;
}

interface AttendanceFormProps {
  students: Student[];
  existingAttendances: Attendance[];
  isLoading?: boolean;
  onSubmit: (data: AttendanceItem[]) => void;
  onCancel: () => void;
}

export default function AttendanceForm({
  students,
  existingAttendances,
  isLoading = false,
  onSubmit,
  onCancel,
}: AttendanceFormProps) {
  const [attendances, setAttendances] = useState<AttendanceFormData[]>([]);

  useEffect(() => {
    const initialData: AttendanceFormData[] = students.map((student) => {
      const existing = existingAttendances.find(
        (att) => att.student.id === student.id,
      );
      return {
        studentId: student.id,
        studentName: student.name,
        present: existing?.present ?? false,
        notes: existing?.notes ?? '',
      };
    });
    setAttendances(initialData);
  }, [students, existingAttendances]);

  const handleTogglePresence = (studentId: number) => {
    setAttendances((prev) =>
      prev.map((att) =>
        att.studentId === studentId ? { ...att, present: !att.present } : att,
      ),
    );
  };

  const handleNotesChange = (studentId: number, notes: string) => {
    setAttendances((prev) =>
      prev.map((att) =>
        att.studentId === studentId ? { ...att, notes } : att,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const attendanceItems: AttendanceItem[] = attendances.map((att) => ({
      studentId: att.studentId,
      present: att.present,
      notes: att.notes.trim() || undefined,
    }));

    onSubmit(attendanceItems);
  };

  const attendanceColumns = [
    {
      header: 'Aluno',
      accessor: (attendance: AttendanceFormData) => attendance.studentName,
    },
    {
      header: 'Presença',
      accessor: (attendance: AttendanceFormData) => (
        <input
          type='checkbox'
          checked={attendance.present}
          onChange={() => handleTogglePresence(attendance.studentId)}
          disabled={isLoading}
          className='h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
        />
      ),
      align: 'center' as const,
    },
    {
      header: 'Observações',
      accessor: (attendance: AttendanceFormData) => (
        <input
          type='text'
          value={attendance.notes}
          onChange={(e) =>
            handleNotesChange(attendance.studentId, e.target.value)
          }
          disabled={isLoading}
          placeholder='Observações...'
          className='w-full rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100'
        />
      ),
    },
  ];

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='max-h-96 overflow-y-auto'>
        <Table
          columns={attendanceColumns}
          data={attendances}
          keyExtractor={(attendance) => attendance.studentId}
          isLoading={false}
          emptyMessage='Nenhum aluno encontrado'
        />
      </div>

      <div className='flex justify-end space-x-2 border-t pt-4'>
        <Button
          type='button'
          variant='secondary'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type='submit' isLoading={isLoading} loadingText='Salvando...'>
          Salvar Chamada
        </Button>
      </div>
    </form>
  );
}
