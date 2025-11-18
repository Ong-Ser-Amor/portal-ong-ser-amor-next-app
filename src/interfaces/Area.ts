import { PaginatedResponse } from './Pagination';

export interface Area {
  id: number;
  name: string;
  locationId: number;
}

export interface AreaDto {
  name: string;
  locationId: number;
}

export interface UpdateAreaDto {
  name: string;
}

export type AreaPaginated = PaginatedResponse<Area>;
