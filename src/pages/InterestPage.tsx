import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {DataFormats, ISubject} from '../constant/types.ts';
import API from '../constant/API.ts';
import '@styles/InterestPage.scss';
import '@styles/components/TableStyle.scss';
import Controller from "../constant/Controller.ts";

enum LazyStatus {
  Changed, Fetching, Accepted, Rejected
}

const SearchTitles: Array<keyof ISubject> = ['courseTitle', 'instructorName', 'offeringDepartment', 'classTime'];
const SearchDisabled: Array<keyof ISubject> = ['offeringDepartment', 'classTime'];
const InitSearchValue = {
  courseTitle: '',
  instructorName: '',
  offeringDepartment: '',
  classTime: '',
};

function InterestPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchOpened, setSearchOpened] = useState<boolean>(false);
  const [searchedSubjects, setSearchedSubjects] = useState<ISubject[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const [currSearchValues, setCurrSearchValues] = useState(InitSearchValue);
  const [searchValues, setSearchValues] = useState(InitSearchValue);
  const [lazyStatus, setLazyStatus] = useState<LazyStatus>(LazyStatus.Accepted);

  useEffect(() => {
    const errors = [
      {errorBody: '관심 과목이 존재하지 않습니다. 관심 과목을 등록해 주세요.', errorMessage: '관심 과목이 존재하지 않습니다', action: () => setSubjects([])},
    ]
    setFetching(true);
    API.fetch2Json('/api/v2/interestedCourse', 'GET', {}, errors, navigate)
      .then(res => setSubjects(res.courses))
      .catch(e => console.error(e))
      .finally(() => setFetching(false));

    document.title = 'ALLCLL | 관심과목';
  }, [navigate]);

  useEffect(() => {
    if (lazyStatus !== LazyStatus.Changed) return;

    const debounceTimer = setTimeout(() => {
      const req = {
        numberOfCourses: subjects.length,
        courses: subjects.map(sub => ({
          courseId: sub.courseId,
          classId: sub.classId,
          offeringDepartment: sub.offeringDepartment,
        })),
      }

      setLazyStatus(LazyStatus.Fetching);
      API.fetch('/api/v2/interestedCourse', 'POST', req, [], navigate)
        .then(() => {
            setLazyStatus(prev => prev !== LazyStatus.Changed ? LazyStatus.Accepted : prev);
        })
        .catch(() => {
          setLazyStatus(prev => prev !== LazyStatus.Changed ? LazyStatus.Rejected : prev);
        });
    }, 1500);

    return () => clearTimeout(debounceTimer);
  }, [subjects.length, lazyStatus]);

  function searchSubjects() {
    let isValid = true;
    SearchTitles.filter(title => !SearchDisabled.includes(title)).forEach(title => {
      if (searchValues[title as keyof typeof searchValues].split(' ').join('').length < 2) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert('교과목명과 교수명을 공백 제외 두 글자 이상 입력해주세요');
      return;
    }

    const searchParams: { [key: string]: string } = {};
    for (const key in searchValues) {
      if (searchValues[key as keyof typeof searchValues]) {
        searchParams[key] = searchValues[key as keyof typeof searchValues].split(' ').join('');
      }
    }

    setSearching(true);
    setCurrSearchValues(prev => ({...prev, ...searchParams}));
    API.fetch2Json('/api/v2/course', 'GET', searchParams, [], navigate)
      .then(res => {
        setSearchedSubjects(res.courses.filter((subject: ISubject) => !subjects.some(value => sameSubjectExact(value, subject))));
        setSearchOpened(true);
      })
      .catch(e => console.error(e))
      .finally(() => setSearching(false));
  }

  function AddRandomSubject() {
    setLazyStatus(LazyStatus.Fetching);
    Controller.setRandomSubject()
      .then((res) => {
        setSubjects(res);
        setLazyStatus(LazyStatus.Accepted);
      })
      .catch(e => {
        console.error(e);
        setLazyStatus(LazyStatus.Rejected);
      });
  }

  function addSubject(subject: ISubject) {
    setSearchedSubjects(prev => prev.filter(s => !sameSubjectExact(s, subject)));
    setSubjects(prev => [...prev, subject]);
    setLazyStatus(LazyStatus.Changed);
  }

  function removeSubject(subject: ISubject) {
    setSubjects(prev => prev.filter(s => !sameSubject(s, subject)));
    if (currSearchValues.courseTitle.length >= 2 && currSearchValues.instructorName.length >= 2
      && subject.courseTitle.startsWith(currSearchValues.courseTitle) && subject.instructorName.startsWith(currSearchValues.instructorName))
      setSearchedSubjects(prev => [...prev, subject]);
    setLazyStatus(LazyStatus.Changed);
  }

  function sameSubject(a: ISubject, b: ISubject) {
    return a.courseId === b.courseId;
  }
  function sameSubjectExact(a: ISubject, b: ISubject) {
    return a.courseId === b.courseId && a.classId === b.classId && a.offeringDepartment === b.offeringDepartment;
  }

  function enterSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      searchSubjects();
    }
  }

  return (
    <PageDefaultLayout className='interest_page'>
      <div className='search_layout'>
        <div className='inputs_layout'>
          {SearchTitles.map((title, index) => (
            <input key={index}
                   onKeyDown={enterSearch}
                   placeholder={DataFormats.SubjectTitles[title]}
                   value={searchValues[title as keyof typeof searchValues]}
                   onChange={e => setSearchValues(prev => ({...prev, [title]: e.target.value}))}
                   type='text'
                   disabled={SearchDisabled.includes(title)}/>
          ))}
        </div>
        <button onClick={searchSubjects}>
          <img src='/Search.svg' alt=''/>
          검색
        </button>
      </div>

      <div className='title_container_box'>
        <div className='container_header_layout'>
          <h2>과목 검색</h2>
          <button className='image_button' onClick={() => setSearchOpened(prev => !prev)}>
            <img className={searchOpened ? 'rotate_90' : ''}
                  src='/ArrowRight.svg' alt=''/>
          </button>
        </div>

        {!searchOpened ? (
          <></>
        ) : searching ? (
          <div className='container_box'>로딩 중...</div>
        ) : !searchedSubjects.length ? (
          <div className='container_box'>검색 결과가 없습니다</div>
        ) : (
          <table className='container_box'>
            <thead>
            <tr>
              <th></th>
              {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {searchedSubjects.map((subject, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => addSubject(subject)}
                          disabled={subjects.some(value => sameSubject(value, subject))}>신청</button>
                </td>
                <td>{String(subject.courseId).padStart(6, '0')}</td>
                <td>{String(subject.classId).padStart(3, '0')}</td>
                <td>{subject.courseTitle}</td>
                <td>{subject.credit}</td>
                <td>{subject.offeringDepartment}</td>
                <td>{subject.instructorName}</td>
                <td>{subject.classTime}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>


      <div className='title_container_box'>
        <div className='container_header_layout'>
          <h2>선택된 과목</h2>
          <button className='small' onClick={AddRandomSubject}>랜덤 선택</button>
        </div>

        {fetching ? (
          <div className='container_box'>로딩 중...</div>
        ) : !subjects.length ? (
          <div className='container_box'>관심 과목이 없습니다</div>
        ) : (
          <table className='container_box'>
            <thead>
            <tr>
              <th></th>
              {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {subjects.map((subject, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => removeSubject(subject)}>삭제</button>
                </td>
                <td>{String(subject.courseId).padStart(6, '0')}</td>
                <td>{String(subject.classId).padStart(3, '0')}</td>
                <td>{subject.courseTitle}</td>
                <td>{subject.credit}</td>
                <td>{subject.offeringDepartment}</td>
                <td>{subject.instructorName}</td>
                <td>{subject.classTime}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}

        {lazyStatus == LazyStatus.Fetching || lazyStatus === LazyStatus.Changed ? (
          <div className='status_text'>
            <img src='/Refresh.svg' alt=''/>
            저장 중...
          </div>
        ) : lazyStatus == LazyStatus.Accepted ? (
          <div className='status_text'>
            <img src='/RoundColor.svg' alt=''/>
            관심 과목이 저장되었습니다
          </div>
        ) : lazyStatus == LazyStatus.Rejected ? (
          <div className='status_text'>
            <img src='/CloseColor.svg' alt=''/>
            관심 과목 저장에 실패했습니다
          </div>
        ) : null}
      </div>
    </PageDefaultLayout>
  );
}

export default InterestPage;