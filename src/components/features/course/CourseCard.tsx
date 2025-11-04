import { Course } from '@/interfaces/Course';
import IconButton from '@/components/ui/IconButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: number) => void;
}

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <div className='rounded-lg border-l-4 border-blue-500 bg-white p-6 shadow-md transition-shadow hover:shadow-lg'>
      <div className='mb-4 flex items-start justify-between'>
        <h3 className='text-lg font-semibold text-gray-800'>{course.name}</h3>
        <div className='flex space-x-1'>
          <IconButton
            icon={FiEdit}
            onClick={() => onEdit(course)}
            variant='primary'
            tooltip='Editar curso'
          />
          <IconButton
            icon={FiTrash2}
            onClick={() => onDelete(course.id)}
            variant='danger'
            tooltip='Excluir curso'
          />
        </div>
      </div>

      <div className='inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1'>
        <span className='text-xs font-medium text-blue-800'>
          {course.activeClassesCount ?? 0} Turmas
        </span>
      </div>
    </div>
  );
}
