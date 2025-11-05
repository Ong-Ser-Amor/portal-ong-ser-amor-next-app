import { Course } from './Course';
import { User } from './User';

export enum CourseClassStatusEnum {
  EM_FORMACAO = 'EM_FORMACAO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
}

export interface CourseClass {
  id: number;
  course: Course;
  name: string;
  status: CourseClassStatusEnum;
  startDate: string;
  endDate: string;
  studentsCount?: number;
  teachers?: User[];
}

export interface CourseClassDto {
  courseId: number;
  name: string;
  startDate: string;
  endDate: string;
  status?: CourseClassStatusEnum;
}

export interface CourseClassPaginated {
  data?: CourseClass[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
