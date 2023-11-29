export interface ISubject {
  courseId: number;
  classId: number;
  courseTitle: string;
  credit: string;
  offeringDepartment: string;
  instructorName: string;
  classTime: string;
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
  }
}