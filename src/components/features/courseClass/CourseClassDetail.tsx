import { CourseClass } from '@/interfaces/CourseClass';
import { Lesson } from '@/interfaces/Lesson';
import { Student } from '@/interfaces/Student';
import BackButton from '@/components/ui/BackButton';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import { FiEdit, FiPlus } from 'react-icons/fi';
import LessonList from '../lesson/LessonList';
import CourseClassStudentList from './CourseClassStudentList';

interface CourseClassDetailProps {
  courseClass: CourseClass | null;
  lessons: Lesson[];
  students: Student[];
  loading: boolean;
  studentsLoading: boolean;
  currentLessonPage: number;
  totalLessonPages: number;
  currentStudentPage: number;
  totalStudentPages: number;
  onLessonPageChange: (page: number) => void;
  onStudentPageChange: (page: number) => void;
  onBack: () => void;
  onEditCourseClass: () => void;
  onAddLesson: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: number) => void;
  onAddStudent: () => void;
  onRemoveStudent: (studentId: number) => void;
}

export default function CourseClassDetail({
  courseClass,
  lessons,
  students,
  loading,
  studentsLoading,
  currentLessonPage,
  totalLessonPages,
  currentStudentPage,
  totalStudentPages,
  onLessonPageChange,
  onStudentPageChange,
  onBack,
  onEditCourseClass,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onAddStudent,
  onRemoveStudent,
}: CourseClassDetailProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  if (loading && !courseClass) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center py-12'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500'></div>
        </div>
      </div>
    );
  }

  if (!courseClass) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <BackButton onClick={onBack} />
        <div className='mt-4 text-center text-gray-500'>
          Turma não encontrada.
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <BackButton onClick={onBack} />

      <div className='mt-6 rounded-lg bg-white p-6 shadow-md'>
        <div className='mb-6 flex items-start justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              {courseClass.name}
            </h1>
            <p className='mt-2 text-sm text-gray-600'>
              <strong>Curso:</strong> {courseClass.course?.name || 'N/A'}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              <strong>Período:</strong> {formatDate(courseClass.startDate)} -{' '}
              {formatDate(courseClass.endDate)}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              <strong>Status:</strong> {courseClass.status}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              <strong>Professores:</strong>{' '}
              {courseClass.teachers && courseClass.teachers.length > 0
                ? courseClass.teachers.map((t) => t.name).join(', ')
                : 'Não atribuído'}
            </p>
            <p className='mt-1 text-sm text-gray-600'>
              <strong>Alunos:</strong> {courseClass.studentsCount || 0}
            </p>
          </div>
          <IconButton
            icon={FiEdit}
            onClick={onEditCourseClass}
            variant='primary'
            tooltip='Editar turma'
          />
        </div>

        <hr className='my-6' />

        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>Aulas</h2>
          <Button onClick={onAddLesson}>
            <FiPlus className='mr-2' />
            Nova Aula
          </Button>
        </div>

        <LessonList
          lessons={lessons}
          loading={loading}
          currentPage={currentLessonPage}
          totalPages={totalLessonPages}
          onEdit={onEditLesson}
          onDelete={onDeleteLesson}
          onPageChange={onLessonPageChange}
        />

        <hr className='my-6' />

        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>Alunos</h2>
          <Button onClick={onAddStudent}>
            <FiPlus className='mr-2' />
            Adicionar Aluno
          </Button>
        </div>

        <CourseClassStudentList
          students={students}
          loading={studentsLoading}
          currentPage={currentStudentPage}
          totalPages={totalStudentPages}
          onPageChange={onStudentPageChange}
          onRemoveStudent={onRemoveStudent}
        />
      </div>
    </div>
  );
}
