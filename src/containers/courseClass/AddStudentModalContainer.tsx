'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import AddStudentForm from '@/components/features/courseClass/AddStudentForm';
import { useStudents } from '@/hooks/student/useStudentQueries';
import { useAddStudentToCourseClass } from '@/hooks/courseClass/useCourseClassMutations';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '@/utils/errorUtils';

interface AddStudentModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  courseClassId: number;
  enrolledStudentIds: number[];
  onSuccess: () => void;
}

export default function AddStudentModalContainer({
  isOpen,
  onClose,
  courseClassId,
  enrolledStudentIds,
  onSuccess,
}: AddStudentModalContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { students, loading: loadingStudents } = useStudents(1, 1000);
  const addStudent = useAddStudentToCourseClass();

  const availableStudents = students.filter(
    (student) => !enrolledStudentIds.includes(student.id),
  );

  const handleSubmit = async (studentId: number) => {
    try {
      setIsSubmitting(true);
      await addStudent(courseClassId, studentId);
      toast.success('Aluno adicionado à turma com sucesso!');
      onSuccess();
      onClose();
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message || 'Erro ao adicionar aluno à turma.');
      console.error('Erro ao adicionar aluno:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Adicionar Aluno à Turma'
      size='md'
    >
      {loadingStudents ? (
        <div className='flex justify-center py-8'>
          <div className='h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : availableStudents.length === 0 ? (
        <div className='py-4 text-center text-gray-500'>
          Todos os alunos já estão matriculados nesta turma.
        </div>
      ) : (
        <AddStudentForm
          students={availableStudents}
          loading={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
}
