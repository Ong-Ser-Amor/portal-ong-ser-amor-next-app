import { PaginatedResponse } from './Pagination';

export interface Student {
  id: number;
  name: string;
  birthDate: string;
}

export interface StudentDto {
  name: string;
  birthDate: string;
}

export type StudentPaginated = PaginatedResponse<Student>;
