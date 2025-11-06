import { Attendance } from '@/interfaces/Attendance';
import Table from '@/components/ui/Table';

interface AttendanceListProps {
  attendances: Attendance[];
  loading: boolean;
}

export default function AttendanceList({
  attendances,
  loading,
}: AttendanceListProps) {
  const attendanceColumns = [
    {
      header: 'Aluno',
      accessor: (attendance: Attendance) => attendance.student.name,
    },
    {
      header: 'Presença',
      accessor: (attendance: Attendance) => (
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
            attendance.present
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {attendance.present ? 'Presente' : 'Ausente'}
        </span>
      ),
    },
    {
      header: 'Observações',
      accessor: (attendance: Attendance) => attendance.notes || '-',
    },
  ];

  return (
    <Table
      columns={attendanceColumns}
      data={attendances}
      keyExtractor={(attendance) => attendance.id}
      isLoading={loading}
      emptyMessage='Nenhuma chamada registrada ainda.'
    />
  );
}
