import {ISubject} from './types.ts';
import API from './API.ts';

export default {
  /** 관심 과목을 랜덤으로 설정하여 반환합니다
   * @returns {Promise} 200 OK - {subject: string[]} */
  setRandomSubject() {
    return API.fetch2Json('/api/v2/mock/random', 'POST', {}, [], () => {});
  },
  /** 데이터 베이스에 있는 모든 학기를 리스트로 가져옵니다
   * @returns {Promise} 200 OK - {semester: string[]} */
  getSemesters() {
    return API.fetch2Json('/api/v2/semester', 'GET', {}, [], () => {});
  },
  /** 데이터 베이스에 학기를 추가합니다
   * @param semester 추가할 학기
   * @returns {Promise} 204 No Content */
  addSemester(semester: string) {
    return API.fetch2Json('/api/v2/semester', 'POST', {semester}, [], () => {});
  },
  /** 수강 신청 학기를 설정합니다
   * @param semester 설정할 학기
   * @returns {Promise} 204 No Content */
  setMockSemester(semester: string) {
    return API.fetch2Json('/api/v2/mock/semester', 'POST', {semester}, [], () => {});
  },
  /** 헤당 학기에 해당과목들을 추가합니다.
   * @param semester 추가할 학기
   * @param courses 추가할 과목 리스트
   * @returns {Promise} 204 No Content */
  addCourseAtSemester(semester: string, courses: ISubject[]) {
    return API.fetch2Json('/api/v2/course', 'PUT', {semester, courses}, [], () => {});
  }
}