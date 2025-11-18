import { CourseClass } from '@/interfaces/CourseClass';
import { Lesson } from '@/interfaces/Lesson';
import { Student } from '@/interfaces/Student';
import { User } from '@/interfaces/User';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/layout/PageHeader';
import { FiPlus } from 'react-icons/fi';
import LessonList from '../lesson/LessonList';
import CourseClassStudentList from './CourseClassStudentList';
import CourseClassTeacherList from './CourseClassTeacherList';
import { PaginationMeta } from '@/interfaces/Pagination';

interface CourseClassDetailProps {
  courseClass: CourseClass | null;
  lessons: Lesson[];
  students: Student[];
  teachers: User[];
  loading: boolean;
  studentsLoading: boolean;
  teachersLoading: boolean;
  lessonMeta: PaginationMeta;
  studentMeta: PaginationMeta;
  teacherMeta: PaginationMeta;
  onLessonPageChange: (page: number) => void;
  onStudentPageChange: (page: number) => void;
  onTeacherPageChange: (page: number) => void;
  onBack: () => void;
  onEditCourseClass: () => void;
  onAddLesson: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: number) => void;
  onAddStudent: () => void;
  onRemoveStudent: (studentId: number) => void;
  onAddTeacher: () => void;
  onRemoveTeacher: (teacherId: number) => void;
}

export default function CourseClassDetail({
  courseClass,
  lessons,
  students,
  teachers,
  loading,
  studentsLoading,
  teachersLoading,
  lessonMeta,
  studentMeta,
  teacherMeta,
  onLessonPageChange,
  onStudentPageChange,
  onTeacherPageChange,
  onBack,
  onEditCourseClass,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onAddStudent,
  onRemoveStudent,
  onAddTeacher,
  onRemoveTeacher,
}: CourseClassDetailProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  if (loading && !courseClass) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div
          className='h-12 w-12 animate-spin rounded-full border-4 border-t-transparent'
          style={{ borderColor: 'var(--accent-primary, #2196f3)' }}
        ></div>
      </div>
    );
  }

  if (!courseClass) {
    return (
      <div className='rounded-lg bg-red-50 p-6 text-center'>
        <p className='text-red-600'>Turma não encontrada.</p>
      </div>
    );
  }

  const teachersNames =
    courseClass.teachers && courseClass.teachers.length > 0
      ? courseClass.teachers.map((t) => t.name).join(', ')
      : 'Não atribuído';

  return (
    <div className='container mx-auto px-4 py-5'>
      <PageHeader
        title={courseClass.name}
        breadcrumb={`${courseClass.course?.name || 'N/A'} • ${teachersNames}`}
        onBack={onBack}
      >
        <Button variant='gradient' size='small' onClick={onAddLesson}>
          <FiPlus className='mr-2' /> Nova Aula
        </Button>
      </PageHeader>

      {/* Aulas Section */}
      <div
        className='mb-5 rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        <div className='mb-6 flex items-center justify-between'>
          <h2
            className='text-xl font-semibold'
            style={{ color: 'var(--text-primary, #333333)' }}
          >
            Aulas Realizadas
          </h2>
        </div>

        <LessonList
          lessons={lessons}
          loading={loading}
          meta={lessonMeta}
          onEdit={onEditLesson}
          onDelete={onDeleteLesson}
          onPageChange={onLessonPageChange}
        />
      </div>

      {/* Professores Section */}
      <div
        className='mb-5 rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        <div className='mb-6 flex items-center justify-between'>
          <h2
            className='text-xl font-semibold'
            style={{ color: 'var(--text-primary, #333333)' }}
          >
            Professores
          </h2>
          <Button variant='gradient' size='small' onClick={onAddTeacher}>
            <FiPlus className='mr-2' /> Adicionar Professor
          </Button>
        </div>

        <CourseClassTeacherList
          teachers={teachers}
          loading={teachersLoading}
          meta={teacherMeta}
          onPageChange={onTeacherPageChange}
          onRemoveTeacher={onRemoveTeacher}
        />
      </div>

      {/* Alunos Section */}
      <div
        className='rounded-[15px] p-8'
        style={{
          background: 'var(--bg-secondary, #ffffff)',
          boxShadow: '0 2px 8px var(--card-shadow, rgba(0, 0, 0, 0.05))',
        }}
      >
        <div className='mb-6 flex items-center justify-between'>
          <h2
            className='text-xl font-semibold'
            style={{ color: 'var(--text-primary, #333333)' }}
          >
            Alunos Matriculados
          </h2>
          <Button variant='gradient' size='small' onClick={onAddStudent}>
            <FiPlus className='mr-2' /> Adicionar Alunos
          </Button>
        </div>

        <CourseClassStudentList
          students={students}
          loading={studentsLoading}
          meta={studentMeta}
          onPageChange={onStudentPageChange}
          onRemoveStudent={onRemoveStudent}
        />
      </div>
    </div>
  );
}
