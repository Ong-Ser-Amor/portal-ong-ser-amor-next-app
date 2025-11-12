export interface Location {
  id: number;
  name?: string;
  address: string;
}

export interface LocationDto {
  name: string;
  address?: string;
}

export interface LocationPaginated {
  data?: Location[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
