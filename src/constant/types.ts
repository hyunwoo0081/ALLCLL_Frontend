export interface ISubject {
  courseId: number;
  classId: number;
  courseTitle: string;
  credit: string;
  offeringDepartment: string;
  instructorName: string;
  classTime: string;
}

export interface IRecentData {
  id: number;
  date: string;
  numberOfCoursesToRegister: number;
  takenTime: string;
  numberOfRegisteredCourses: number;
  coursesDetail: string;
}

export interface IRecentDataResponse {
  results: IRecentData[];
}

export enum ApplyType {
  MACRO, APPLY, SUCCESS, FAILED, DONE, MACRO_FAILED, FINISHED
}

export const DataFormats = {
  SubjectTitles: {
    courseId: '학수번호',
    classId: '분반',
    courseTitle: '교과목명',
    credit: '학점',
    offeringDepartment: '개설학과',
    instructorName: '교수명',
    classTime: '요일 및 강의시간',
  },
  RecentDataTitles: {
    id: '',
    date: '날짜',
    numberOfCoursesToRegister: '신청할 과목 수',
    takenTime: '소요 시간',
    numberOfRegisteredCourses: '신청한 과목 수',
    coursesDetail: '과목 상세 정보',
  },
}