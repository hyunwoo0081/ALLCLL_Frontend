import {useEffect, useState} from 'react';
// import {useNavigate} from 'react-router-dom';
import AdminNavigation from '../../components/AdminNavigation.tsx';
// import API from '../../constant/API.ts';

function MockSetting() {
  // const navigate = useNavigate();
  
  const [semesters, setSemesters] = useState<string[]|null>(null);
  const [settedSemester, setSettedSemester] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  
  useEffect(() => {
    // 학기 목록 불러오기
    // API.fetch2Json('/api/v2/utils/semesters', 'GET', {}, [], navigate)
    //   .then(data => {
    //     setSemesters(data.semesters);
    //     setSelectedSemester(data.semesters[0] ?? '');
    //   })
    //   .catch(() => {
    //     setSemesters(null);
    //   });

    // 임시 데이터
    setSemesters(['2024년도 1학기', '2024년도 여름학기', '2024년도 2학기']);
    setSelectedSemester('2024년도 1학기');
    setSettedSemester('2024년도 1학기');
  }, []);

  function setSemester() {
    if (!selectedSemester) return;

    if (!confirm('설정하시겠습니까?')) return;

    // API.fetch2Json('/api/v2/utils/semesters', 'POST', {semester: selectedSemester}, [], navigate)
    //   .then(data => {
    //     setSettedSemester(data.semester);
    //   });
    // 임시 데이터
    setSettedSemester(selectedSemester);
  }

  return (
    <>
      <AdminNavigation/>

      <div className='responsive'>
        <div className='admin_main'>
          <h1>모의 수강 신청 설정</h1>

          <h2>수강 학기 설정</h2>
          <div className='container_box'>
            <p>현재 학기: {settedSemester}</p>
            {semesters === null ? (
              <p>학기 목록을 불러오는 중입니다.</p>
            ) : (
              <div style={{display: 'flex', gap: '8px'}}>
                <select name=''
                        id=''
                        value={selectedSemester}
                        onChange={e => setSelectedSemester(e.target.value)}
                >
                  {semesters?.map(semester =>
                    <option key={semester}
                            value={semester}>
                      {semester}
                    </option>
                  )}
                </select>
                <button onClick={setSemester}>
                  설정
                </button>
              </div>
            )}
          </div>


        </div>
      </div>
    </>
  );
}

export default MockSetting;