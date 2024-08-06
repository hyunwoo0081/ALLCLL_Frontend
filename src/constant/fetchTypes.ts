export interface Notification {
  content: string;
  author: string;
  createAt: string;
}

export interface MockResult {
  id: number;
  date: string;
  numberOfCoursesToRegister: number;
  takenTime: string;
  numberOfRegisteredCourses: number;
  coursesDetail: string;
}

export interface SubjectKeys {
  courseId: string;
  classId: string;
  offeringDepartment: string;
}

export interface Subject extends SubjectKeys {
  courseTitle: string;
  credit: string;
  instructorName: string;
  classTime: string;
}

export interface MockResults {
  results: MockResult[];
}

export interface SearchedSubjects {
  numberOfCourses: number;
  courses: Subject[];
}