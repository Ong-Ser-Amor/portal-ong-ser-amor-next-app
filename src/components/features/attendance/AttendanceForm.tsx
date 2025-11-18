import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';
import { Student } from '@/interfaces/Student';
import { Attendance, AttendanceItem } from '@/interfaces/Attendance';
import {
  useFormContext,
  Controller,
  useFieldArray,
  FieldArrayWithId,
} from 'react-hook-form';

export interface AttendanceFormData {
  attendances: {
    studentId: number;
    studentName: string;
    present: boolean;
    notes: string;
  }[];
}

interface AttendanceFormProps {
  students: Student[];
  existingAttendances: Attendance[];
  isLoading?: boolean;
  onSubmit: (data: AttendanceItem[]) => void | Promise<void>;
  onCancel: () => void;
}

export default function AttendanceForm({
  students,
  existingAttendances,
  isLoading = false,
  onSubmit,
  onCancel,
}: AttendanceFormProps) {
  const { control, handleSubmit } = useFormContext<AttendanceFormData>();
  const { fields } = useFieldArray({
    control,
    name: 'attendances',
  });

  const attendanceColumns = [
    {
      header: 'Aluno',
      accessor: (
        item: FieldArrayWithId<AttendanceFormData, 'attendances', 'id'>,
      ) => item.studentName,
    },
    {
      header: 'Presença',
      accessor: (
        item: FieldArrayWithId<AttendanceFormData, 'attendances', 'id'>,
      ) => {
        const idx = fields.findIndex((f) => f.studentId === item.studentId);
        return (
          <Controller
            name={`attendances.${idx}.present`}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  type='checkbox'
                  checked={field.value}
                  onChange={() => field.onChange(!field.value)}
                  disabled={isLoading}
                  className='h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                {fieldState.error && (
                  <div className='text-xs text-red-600'>
                    {fieldState.error.message}
                  </div>
                )}
              </>
            )}
          />
        );
      },
      align: 'center' as const,
    },
    {
      header: 'Observações',
      accessor: (
        item: FieldArrayWithId<AttendanceFormData, 'attendances', 'id'>,
      ) => {
        const idx = fields.findIndex((f) => f.studentId === item.studentId);
        return (
          <Controller
            name={`attendances.${idx}.notes`}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input
                  type='text'
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  placeholder='Observações...'
                  className='w-full rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100'
                />
                {fieldState.error && (
                  <div className='text-xs text-red-600'>
                    {fieldState.error.message}
                  </div>
                )}
              </>
            )}
          />
        );
      },
    },
  ];

  const handleFormSubmit = (data: AttendanceFormData) => {
    const attendanceItems: AttendanceItem[] = data.attendances.map((att) => ({
      studentId: att.studentId,
      present: att.present,
      notes: att.notes.trim(),
    }));
    onSubmit(attendanceItems);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
      <div className='max-h-96 overflow-y-auto'>
        <Table
          columns={attendanceColumns}
          data={fields}
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
