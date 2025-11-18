import { Course } from './Course';
import { PaginatedResponse } from './Pagination';
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

export interface UpdateCourseClassDto {
  name: string;
  startDate: string;
  endDate: string;
  status?: CourseClassStatusEnum;
}

export type CourseClassPaginated = PaginatedResponse<CourseClass>;
