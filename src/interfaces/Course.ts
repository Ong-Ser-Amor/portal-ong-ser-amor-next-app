export interface Course {
  id: number;
  name: string;
  activeClassesCount?: number;
}

export interface CourseDto {
  name: string;
}

export interface CoursePaginated {
  data?: Course[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}
