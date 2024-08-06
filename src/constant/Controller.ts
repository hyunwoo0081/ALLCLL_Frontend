import {NavigateFunction} from 'react-router-dom';
import FetchException from './FetchException.ts';
import {MockResults, Notification, SearchedSubjects, SubjectKeys} from './fetchTypes.ts';
import {ISubject} from './types.ts';
import AuthControl from './AuthControl.ts';
import API from './API.ts';

export default {
  ////// 공지사항 관련 API //////

  /** 새로운 공지사항을 저장합니다
   * @param content 공지사항 내용
   * @param navigate 페이지 이동 함수
   * @returns {Promise<Response>} 200 OK - No Content */
  addNewNotification(content: string, navigate: NavigateFunction): Promise<Response> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(403, 'AUTHENTICATION_FAILED', 'LOW', () => navigate(AuthControl.getDefaultPage())),
    ];

    return API.fetch('/api/v2/notification/new', 'POST', {content}, errors);
  },

  /** 마지막 공지사항을 가져옵니다
   * @param navigate 페이지 이동 함수
   * @returns {Promise<Notification>} 200 OK - {Notification} */
  getLastNotification(navigate: NavigateFunction): Promise<Notification> {
    const errors = [
      new FetchException(400, 'NOTIFICATION_NOT_EXIST', 'LOW'),
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
    ];

    return API.fetch2Json('/api/v2/notification/last', 'GET', {}, errors);
  },

  // /** 공지사항을 수정합니다
  //  * @param notificationId 수정할 공지사항의 ID
  //  * @param content 수정할 공지사항 내용
  //  * @param navigate 페이지 이동 함수
  //  * @returns {Promise<Notification>} 200 OK - {Notification} */
  // updateNotification(notificationId: number, content: string, navigate: NavigateFunction): Promise<Notification> {
  //   const errors = [
  //     new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
  //     new FetchException(403, 'AUTHENTICATION_FAILED', 'LOW', () => navigate(AuthControl.getDefaultPage())),
  //   ];
  //
  //   return API.fetch2Json('/api/v2/notification/modify', 'POST', {notificationId, content}, errors);
  // },

  ////// 로그인 회원 관련 API //////

  /** 약관동의 및 학생인증을 통한 회원가입
   * @param userId 학번
   * @param password 비밀번호
   * @param ref 아이디 비밀번호가 다를 때 포커스를 줄 ref
   * @returns {Promise<Response>} 200 OK - No Content */
  signUp(userId: string, password: string, ref: HTMLInputElement | null): Promise<Response> {
    const errors = [
      new FetchException(400, 'SEJONG_API_UNAUTHENTICATED', 'LOW', () => ref?.focus()),
      new FetchException(400, 'USER_REGISTERED_OR_WITHDRAWN', 'LOW'),
    ];

    return API.fetch('/api/v2/auth/signup', 'POST', {userId, password}, errors);
  },

  /** 로그인
   * @param userId 학번
   * @param password 비밀번호
   * @param navigate 페이지 이동 함수
   * @param ref 아이디 비밀번호가 다를 때 포커스를 줄 ref
   * @returns {Promise<string>} 200 OK - 로그인 토큰 */
  login(userId: string, password: string, navigate: NavigateFunction, ref: HTMLInputElement | null): Promise<string> {
    const errors = [
      new FetchException(400, 'USER_UNREGISTERED_OR_WITHDRAWN', 'LOW', () => navigate('/register', {replace: true})),
      new FetchException(400, 'SEJONG_API_UNAUTHENTICATED', 'LOW', () => ref?.focus()),
    ];

    return API.fetch2Text('/api/v2/auth/login', 'POST', {userId, password}, errors);
  },

  /** 회원 탈퇴 (로그인 상태에서만 가능)
   * @param password 비밀번호
   * @param navigate 페이지 이동 함수
   * @param reject 회원 탈퇴 실패 시 실행할 함수
   * @returns {Promise<Response>} 200 OK - No Content */
  unregister(password: string, navigate: NavigateFunction, reject: () => void): Promise<Response> {
    const errors = [
      new FetchException(400, 'USER_UNREGISTERED_OR_WITHDRAWN', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(400, 'SEJONG_API_UNAUTHENTICATED', 'LOW', reject),
    ];

    return API.fetch('/api/v2/user', 'DELETE', {password}, errors);
  },

  ////// 대시보드 관련 API //////

  /** 사용자의 모의 수강 신청 결과 목록을 가져옵니다
   * @param navigate 페이지 이동 함수
   * @returns {Promise<MockResults>} 200 OK - {MockResults} */
  getMockResults(navigate: NavigateFunction): Promise<MockResults> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
    ];

    return API.fetch2Json('/api/v2/result/recent', 'GET', {}, errors);
  },

  ////// 관심 과목 관련 API //////

  /** 과목을 검색하고, 검색 결과를 반환합니다
   * @param courseTitle 검색할 과목 정보
   * @param instructorName 검색할 교수 정보
   * @param navigate 페이지 이동 함수
   * @returns {Promise<SearchedSubjects>} 200 OK - {SearchedSubjects} */
  searchSubjects(courseTitle: string, instructorName: string, navigate: NavigateFunction): Promise<SearchedSubjects> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
    ];

    return API.fetch2Json('/api/v2/course', 'GET', {courseTitle, instructorName}, errors);
  },

  /** 관심 과목을 조회합니다
   * @param navigate 페이지 이동 함수
   * @returns {Promise<SearchedSubjects>} 200 OK - {SearchedSubjects} */
  getInterestedSubjects(navigate: NavigateFunction): Promise<SearchedSubjects> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
    ];

    return API.fetch2Json('/api/v2/interestedCourse', 'GET', {}, errors);
  },

  /** 관심 과목을 추가합니다
   * @param courses 추가할 과목 리스트
   * @param navigate 페이지 이동 함수
   * @returns {Promise<Response>} 204 No Content */
  addInterestedSubject(courses: SubjectKeys[], navigate: NavigateFunction): Promise<Response> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
    ];

    return API.fetch('/api/v2/interestedCourse', 'POST', {
      numberOfCourses: courses.length,
      courses,
    }, errors);
  },

  /** 관심 과목이 8개가 되도록 랜덤으로 추가합니다
   * @param navigate 페이지 이동 함수
   * @returns {Promise<SearchedSubjects>} 200 OK - {SearchedSubjects} */
  addRandomInterestedSubject(navigate: NavigateFunction): Promise<SearchedSubjects> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
    ];

    return API.fetch2Json('/api/v2/interestCourse/random', 'POST', {}, errors);
  },











  //////////////////////////////////////////////////////////////////////////////

  ////// 사용자 관련 API //////



  ////// 관리자 관련 API //////

  /** 데이터 베이스에 있는 모든 학기를 리스트로 가져옵니다
   * @returns {Promise} 200 OK - {semester: string[]} */
  getSemesters() {
    return API.fetch2Json('/api/v2/semester', 'GET', {}, []);
  },
  /** 데이터 베이스에 학기를 추가합니다
   * @param semester 추가할 학기
   * @returns {Promise<''>} 204 No Content */
  addSemester(semester: string): Promise<''> {
    return API.fetch2Json('/api/v2/semester', 'POST', {semester}, []);
  },
  /** 수강 신청 학기를 설정합니다
   * @param semester 설정할 학기
   * @returns {Promise<''>} 204 No Content */
  setMockSemester(semester: string): Promise<''> {
    return API.fetch2Json('/api/v2/mock/semester', 'POST', {semester}, []);
  },
  /** 헤당 학기에 해당과목들을 추가합니다.
   * @param semester 추가할 학기
   * @param courses 추가할 과목 리스트
   * @returns {Promise<''>} 204 No Content */
  addCourseAtSemester(semester: string, courses: ISubject[]): Promise<''> {
    return API.fetch2Json('/api/v2/course', 'PUT', {semester, courses}, []);
  }
}