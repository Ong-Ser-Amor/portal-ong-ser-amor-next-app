export interface AssetCategory {
  id: number;
  name: string;
}

export interface AssetCategoryDto {
  name: string;
}

export interface AssetCategoryPaginated {
  data?: AssetCategory[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
