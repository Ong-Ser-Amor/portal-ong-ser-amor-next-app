import { Student } from './Student';
import { Lesson } from './Lesson';

export interface Attendance {
  id: number;
  present: boolean;
  notes?: string;
  student: Student;
  lesson: Lesson;
}

export interface AttendanceItem {
  studentId: number;
  present: boolean;
  notes?: string;
}

export interface BulkAttendanceDto {
  attendances: AttendanceItem[];
}
