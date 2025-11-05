import { courseClassService } from '@/services/courseClass/courseClassService';
import { CourseClassDto, CourseClass } from '@/interfaces/CourseClass';
import { getApiErrorMessage } from '@/utils/errorUtils';

export const useCreateCourseClass = () => {
  const createCourseClass = async (data: CourseClassDto): Promise<CourseClass> => {
    try {
      const response = await courseClassService.createCourseClass(data);
      return response;
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error('Erro ao criar turma:', message);
      throw error;
    }
  };

  return createCourseClass;
};

export const useUpdateCourseClass = () => {
  const updateCourseClass = async (
    id: number,
    originalData: CourseClassDto,
    updatedData?: CourseClassDto,
  ): Promise<CourseClass> => {
    try {
      const response = await courseClassService.updateCourseClass(
        id,
        originalData,
        updatedData,
      );
      return response;
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error('Erro ao atualizar turma:', message);
      throw error;
    }
  };

  return updateCourseClass;
};

export const useDeleteCourseClass = () => {
  const deleteCourseClass = async (id: number): Promise<void> => {
    try {
      await courseClassService.deleteCourseClass(id);
    } catch (error) {
      const message = getApiErrorMessage(error);
      console.error('Erro ao excluir turma:', message);
      throw error;
    }
  };

  return deleteCourseClass;
};
