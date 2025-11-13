export interface Area {
  id: number;
  name: string;
  locationId: number;
}

export interface CreateAreaDto {
  name: string;
  locationId: number;
}

export interface UpdateAreaDto {
  name: string;
}

export interface AreaPaginated {
  data?: Area[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
