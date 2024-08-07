import {NavigateFunction} from 'react-router-dom';
import FetchException from './FetchException.ts';
import {
  CaptchaImage,
  MockRecentResults, MockResult,
  MockStartResponse, MockStatus,
  MockStatusResponse,
  Notification,
  SearchedSubjects,
  Subject,
  SubjectKeys
} from './fetchTypes.ts';
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
   * @returns {Promise<MockRecentResults>} 200 OK - {MockResults} */
  getRecentResults(navigate: NavigateFunction): Promise<MockRecentResults> {
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
      new FetchException(401, 'INTERESTED_COURSE_NOT_EXIST', 'LOW'),
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


  //////////////////////////////////////////////////////////////////////////////\
  // Todo: IErrorTypes API 나오면 모두 FetchException 으로 변경

  ////// 모의 수강 신청 관련 API //////

  /** 모의 수강 신청을 시작하고, 플레이 아이디와 관심 과목을 반환합니다
   * @param navigate 페이지 이동 함수
   * @param reject 모의 수강 신청 시작 실패 시 실행할 함수
   * @returns {Promise<MockStartResponse>} 200 OK - {MockStartResponse} */
  startMockRegistration(navigate: NavigateFunction, reject: () => void): Promise<MockStartResponse> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(401, 'INTERESTED_COURSE_NOT_EXIST', 'LOW', reject),
      {errorBody: '관심 과목이 존재하지 않습니다. 관심 과목을 등록해 주세요.',
        errorMessage: '관심 과목이 존재하지 않습니다. 관심 과목을 등록해 주세요.', action: reject}
    ];

    return API.fetch2Json('/api/v2/mock/start', 'GET', {}, errors);
  },

  /** 모의 수강 신청 플레이 아이디에 대한 연습 상태를 반환합니다. 만약 존재한다면 현재 상태를 반환합니다
   * @param playId 플레이 아이디
   * @param navigate 페이지 이동 함수
   * @returns {Promise<MockStatusResponse>} 200 OK - {MockStatusResponse} */
  getMockStatus(playId: number, navigate: NavigateFunction): Promise<MockStatusResponse> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(400, '모의 수강 신청을 진행하고 있지 않습니다.', 'LOW'),
      {errorBody: '모의 수강 신청을 진행하고 있지 않습니다.', errorMessage: '모의 수강 신청을 진행하고 있지 않습니다.'}
    ];

    return API.fetch2Json('/api/v2/mock/status', 'GET', {playId}, errors);
  },

  /** 캡차 코드를 생성합니다
   * @param playId 플레이 아이디
   * @param navigate 페이지 이동 함수
   * @returns {Promise<CaptchaImage>} 200 OK - {CaptchaImage} */
  getMockCaptcha(playId: number, navigate: NavigateFunction): Promise<CaptchaImage> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(400, '모의 수강 신청을 진행하고 있지 않습니다.', 'HIGH'),
      {errorBody: 'Mock not found', errorMessage: '시뮬레이션을 찾을 수 없습니다.\n시뮬레이션을 초기화 합니다.'},
    ];

    return API.fetch2Json('/api/v2/mock/captcha', 'GET', {playId}, errors);
  },

  /** 캡차 코드를 인증하고, 해당 과목의 수강 신청을 시도합니다.
   * @param playId 플레이 아이디
   * @param answer 캡차 코드
   * @param courseId 수강 신청할 과목 ID
   * @param classId 수강 신청할 과목의 수업 ID
   * @param offeringDepartment 수강 신청할 과목의 개설 학과
   * @param navigate 페이지 이동 함수
   * @returns {Promise<MockStatus>} 200 OK - {MockStatus} */
  submitMockRegistration(playId: number, answer: string, courseId: number, classId: number, offeringDepartment: string, navigate: NavigateFunction): Promise<MockStatus> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),

      {errorBody: 'Mock not found', errorMessage: '수강신청이 존재하지 않습니다'},
      {errorBody: 'Course not found', errorMessage: '존재하지 않는 과목입니다'},
      {errorBody: 'Registered already', errorMessage: '이미 신청된 과목입니다'},
      {errorBody: 'Captcha authentication failed', errorMessage: '캡챠 인증 실패'},
    ];

    return API.fetch2Json('/api/v2/mock/register', 'POST', {playId, answer, courseId, classId, offeringDepartment}, errors);
  },

  /** 종료된 모의 수강 신청에 대해 결과를 가져옵니다
   * @param playId 플레이 아이디
   * @param navigate 페이지 이동 함수
   * @returns {Promise<MockResult>} 200 OK - {MockResult} */
  getMockResult(playId: number, navigate: NavigateFunction): Promise<MockResult> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(400, '모의 수강 신청을 진행하고 있지 않습니다.', 'HIGH'),

      {errorBody: 'Mock did not terminate successfully', errorMessage: '종료되지 않은 시뮬레이션입니다'},
    ];

    return API.fetch2Json('/api/v2/mock/result', 'GET', {playId}, errors);
  },

  ////// 관리자 관련 API //////

  /** 데이터 베이스에 있는 모든 학기를 리스트로 가져옵니다
   * @deprecated
   * @returns {Promise} 200 OK - {semester: string[]} */
  getSemesters(navigate: NavigateFunction): Promise<{semesters: string[]}> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(403, 'AUTHENTICATION_FAILED', 'LOW', () => navigate(AuthControl.getDefaultPage())),
    ];

    return API.fetch2Json('/api/v2/semesters', 'GET', {}, errors);
  },
  // /** 데이터 베이스에 학기를 추가합니다
  //  * @deprecated
  //  * @param semester 추가할 학기
  //  * @returns {Promise<''>} 204 No Content */
  // addSemester(semester: string): Promise<''> {
  //   return API.fetch2Json('/api/v2/semester', 'POST', {semester}, []);
  // },
  /** 수강 신청 학기를 설정합니다
   * @deprecated
   * @param semester 설정할 학기
   * @returns {Promise<''>} 204 No Content */
  setMockSemester(semester: string): Promise<''> {
    return API.fetch2Json('/api/v2/mock/semester', 'POST', {semester}, []);
  },
  /** 헤당 학기에 해당과목들을 추가합니다.
   * @param courses 추가할 과목 리스트
   * @param navigate 페이지 이동 함수
   * @returns {Promise<Response>} 204 No Content */
  addCourseAtSemester(courses: Subject[], navigate: NavigateFunction): Promise<Response> {
    const errors = [
      new FetchException(401, 'AUTHENTICATION_FAILED', 'LOW', () => AuthControl.logout(navigate, '/login')),
      new FetchException(403, 'AUTHENTICATION_FAILED', 'LOW', () => navigate(AuthControl.getDefaultPage())),
    ];

    return API.fetch('/api/v2/utils/courses', 'POST', {courses}, errors);
  }
}