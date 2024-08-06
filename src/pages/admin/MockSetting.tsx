import {useEffect, useState} from 'react';
import AdminNavigation from '../../components/AdminNavigation.tsx';
import Controller from '../../constant/Controller.ts';

function MockSetting() {
  const [semesters, setSemesters] = useState<string[]|null>(null);
  const [settedSemester, setSettedSemester] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  // 학기 목록 불러오기
  useEffect(() => {
    Controller.getSemesters()
      .then(data => {
        setSemesters(data.semesters);
        setSelectedSemester(data.semesters[0] ?? '');
      })
      .catch(() => {
        alert('학기 목록을 불러오는 데 실패했습니다');
        // setSemesters(null);

        // Fixme: 임시 데이터 제거
        setSemesters(['2024년도 1학기', '2024년도 여름학기', '2024년도 2학기']);
        setSelectedSemester('2024년도 1학기');
        setSettedSemester('2024년도 1학기');
      });
  }, []);

  function setSemester() {
    if (!selectedSemester) return;

    if (!confirm('설정하시겠습니까?')) return;

    Controller.setMockSemester(selectedSemester)
      .then(() => {
        setSettedSemester(selectedSemester);
      })
      .catch(() => alert('설정에 실패했습니다.'));
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