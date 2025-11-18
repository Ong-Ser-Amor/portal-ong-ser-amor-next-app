import { PaginatedResponse } from './Pagination';

export interface Course {
  id: number;
  name: string;
  activeClassesCount?: number;
}

export interface CourseDto {
  name: string;
}

export type CoursePaginated = PaginatedResponse<Course>;
