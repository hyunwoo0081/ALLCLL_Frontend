export interface Notification {
  content: string;
  author: string;
  createAt: string;
}

export interface MockRecentResult {
  id: number;
  date: string;
  numberOfCoursesToRegister: number;
  takenTime: string;
  numberOfRegisteredCourses: number;
  coursesDetail: string;
}

export interface CaptchaImage {
  image: string;
}

export interface SubjectKeys {
  courseId: number;
  classId: number;
  offeringDepartment: string;
}

export interface SubjectNames {
  courseTitle: string;
  instructorName: string;
}

export interface Subject extends SubjectKeys {
  courseTitle: string;
  credit: string;
  instructorName: string;
  classTime: string;
}

export interface MockRecentResults {
  results: MockRecentResult[];
}

export interface SearchedSubjects {
  numberOfCourses: number;
  courses: Subject[];
}

export interface MockStartResponse {
  playId: number;
  interestedCourse: SearchedSubjects;
}

export interface MockStatusResponse {
  interestedCourseToRegister: SearchedSubjects;
  registeredCourse: {
    numberOfCourses: number;
    courses: SubjectNames[];
  };
}

export interface MockStatus {
  finished: boolean;
  succeed: boolean;
}

export interface MockResult {
  takenTime: string;
  numberOfCoursesToRegister: number;
  numberOfRegisteredCourses: number;
  registeredCoursesDetails: string;
}