import { Course } from '@/interfaces/Course';
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
        <div className='flex space-x-2'>
          <button
            onClick={() => onEdit(course)}
            className='text-blue-600 transition-colors hover:text-blue-900'
            title='Editar curso'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(course.id)}
            className='text-red-600 transition-colors hover:text-red-900'
            title='Excluir curso'
          >
            <FiTrash2 size={18} />
          </button>
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
