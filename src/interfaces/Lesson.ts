export interface Lesson {
  id: number;
  courseClassId: number;
  date: string;
  topic?: string;
}

export interface LessonDto {
  courseClassId: number;
  date: string;
  topic?: string;
}

export interface LessonPaginated {
  data: Lesson[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}
