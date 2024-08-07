import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {DataFormats, IRecentData} from '../constant/types.ts';
import {getDateString, getTimerString} from '../constant/TimeString.ts';
import Controller from '../constant/Controller.ts';

function DashBoardPage() {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState<boolean>(false);
  const [recentRecords, setRecentRecords] = useState<IRecentData[]>([]);

  useEffect(() => {
    setFetching(true);
    Controller.getRecentResults(navigate)
      .then(res => setRecentRecords(res.results))
      .finally(() => setFetching(false));

    document.title = 'ALLCLL | 대시보드';
  }, [navigate]);

  return (
    <PageDefaultLayout className=''>
      <div className='container_box'>
        <h2>최근 기록</h2>

        {fetching ? (
          <div className='loading'>로딩 중...</div>
        ) : !recentRecords.length ? (
          <div className='no_record'>기록이 없습니다</div>
        ) : (
          <table className='width_100'>
            <thead>
              <tr>
                {Object.values(DataFormats.RecentDataTitles).map((_, index) => (
                  <th key={index}></th>
                ))}
              </tr>
            </thead>
            <tbody>
            {recentRecords.map((record, index) => (
              <tr key={index} className={record.numberOfRegisteredCourses >= record.numberOfCoursesToRegister ? 'highlight' : ''}>
                <td className='bold center'>{record.id}</td>
                <td className='center'>{getDateString(record.date)}</td>
                <td className={record.numberOfRegisteredCourses >= record.numberOfCoursesToRegister ? 'center bold red' : 'center'}>
                  {record.numberOfRegisteredCourses >= record.numberOfCoursesToRegister ? '올클' : `${record.numberOfRegisteredCourses}/${record.numberOfCoursesToRegister}개`}
                </td>
                <td className='red'>{getTimerString(record.takenTime)}</td>
                <td className='width_50_overflow'>{record.coursesDetail}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>

    </PageDefaultLayout>
  );
}

export default DashBoardPage;