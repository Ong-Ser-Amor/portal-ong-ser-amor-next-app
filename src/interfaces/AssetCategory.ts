import { PaginatedResponse } from './Pagination';

export interface AssetCategory {
  id: number;
  name: string;
}

export interface AssetCategoryDto {
  name: string;
}

export type AssetCategoryPaginated = PaginatedResponse<AssetCategory>;
