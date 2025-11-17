import { PaginatedResponse } from './Pagination';

export interface Lesson {
  id: number;
  courseClassId: number;
  date: string;
  topic?: string;
}

export interface LessonDto {
  courseClassId: number;
  date: string;
  topic?: string;
}

export interface UpdateLessonDto {
  date: string;
  topic?: string;
}

export type LessonPaginated = PaginatedResponse<Lesson>;
