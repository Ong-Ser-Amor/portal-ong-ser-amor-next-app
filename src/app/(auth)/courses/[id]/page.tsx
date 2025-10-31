'use client';

import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

interface CourseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGoBack = () => {
    router.push('/courses');
  };

  if (error) {
    return (
      <div className='container mx-auto px-4'>
        <div className='my-4 rounded-lg bg-white p-6 shadow-md'>
          <h2 className='mb-4 text-xl font-bold text-black'>Erro</h2>
          <p className='text-red-500'>{error}</p>
          <div className='mt-4'>
            <Button onClick={handleGoBack}>
              <FaArrowLeft className='mr-2' /> Voltar para Cursos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 pb-8'>
      {/* Botão voltar */}
      <div className='mb-5'>
        <Button
          variant='secondary'
          onClick={handleGoBack}
          className='flex items-center'
        >
          <FaArrowLeft className='mr-2' /> Voltar para Cursos
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailPage;
