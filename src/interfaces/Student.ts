export interface Student {
  id: number;
  name: string;
  birthDate: string;
}

export interface StudentDto {
  name: string;
  birthDate: string;
}

export interface StudentPaginated {
  data?: Student[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
