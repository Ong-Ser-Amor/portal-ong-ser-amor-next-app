import { PaginatedResponse } from './Pagination';

export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface LocationDto {
  name: string;
  address?: string;
}

export type LocationPaginated = PaginatedResponse<Location>;
