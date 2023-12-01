import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {DataFormats, ISubject} from '../constant/types.ts';
import API from '../constant/API.ts';
import '@styles/components/TableStyle.scss';


const SearchTitles: Array<keyof ISubject> = ['courseTitle', 'instructorName', 'offeringDepartment', 'classTime'];
const SearchDisabled: Array<keyof ISubject> = ['offeringDepartment', 'classTime'];

function InterestPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchOpened, setSearchOpened] = useState<boolean>(false);
  const [searchedSubjects, setSearchedSubjects] = useState<ISubject[]>([]);
  const [subjects, setSubjects] = useState<ISubject[]>([]);

  const [searchValues, setSearchValues] = useState({
    courseTitle: '',
    instructorName: '',
    offeringDepartment: '',
    classTime: '',
  });

  useEffect(() => {
    setFetching(true);
    API.fetch2Json('/api/v2/interestedCourse', 'GET', {}, [], navigate)
      .then(res => setSubjects(res.courses))
      .catch(e => console.error(e))
      .finally(() => setFetching(false));

    document.title = 'AllCll | 관심과목';
  }, [navigate]);

  function searchSubjects() {
    let isValid = true;
    SearchTitles.filter(title => !SearchDisabled.includes(title)).forEach(title => {
      if (searchValues[title as keyof typeof searchValues].length < 2) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert('교과목명과 교수명을 두 글자 이상 입력해주세요');
      return;
    }

    const searchParams: { [key: string]: string } = {};
    for (const key in searchValues) {
      if (searchValues[key as keyof typeof searchValues]) {
        searchParams[key] = searchValues[key as keyof typeof searchValues];
      }
    }

    setSearching(true);
    API.fetch2Json('/api/v2/course', 'GET', searchParams, [], navigate)
      .then(res => {
        setSearchedSubjects(res.courses);
        setSearchOpened(true);
      })
      .catch(e => console.error(e))
      .finally(() => setSearching(false));
  }

  function changeSubjectStatus(subject: ISubject) {
    const {courseId, classId, offeringDepartment} = subject;
    const req = {
      numberOfCourses: 1,
      courses: [{courseId, classId, offeringDepartment}],
    }

    API.fetch2Json('/api/v2/interestedCourse', 'POST', req, [], navigate)
      .then(res => {
        setSearchedSubjects(res.courses);
        setSearchOpened(true);
      })
      .catch(e => console.error(e))
      .finally(() => setSearching(false));
  }

  function addSubject(subject: ISubject) {
    setSearchedSubjects(prev => prev.filter(s => s.courseId !== subject.courseId));
    setSubjects(prev => [...prev, subject]);
    changeSubjectStatus(subject);
  }

  function removeSubject(subject: ISubject) {
    setSubjects(prev => prev.filter(s => s.courseId !== subject.courseId));
    if (subject.courseTitle.startsWith(searchValues.courseTitle) && subject.instructorName.startsWith(searchValues.instructorName))
      setSearchedSubjects(prev => [...prev, subject]);
    changeSubjectStatus(subject);
  }

  return (
    <PageDefaultLayout className=''>
      <div className='search_layout'>
        <div className='inputs_layout'>
          {SearchTitles.map((title, index) => (
            <input key={index}
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
            <img src='/Close.svg' alt=''/>
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
                  <button onClick={() => addSubject(subject)}>신청</button>
                </td>
                {Object.keys(subject).map((key: string, index) => (
                  <td key={index}>{subject[key as keyof ISubject]}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>


      <div className='title_container_box'>
        <h2>선택된 과목</h2>

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
                {Object.values(DataFormats.SubjectTitles).map((title, index) => (
                  <td key={index}>{title}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </PageDefaultLayout>
  );
}

export default InterestPage;