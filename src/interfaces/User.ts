export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserPaginated {
  data?: User[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
