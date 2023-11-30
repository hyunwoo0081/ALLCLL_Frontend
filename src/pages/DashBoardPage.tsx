import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import {DataFormats, IRecentData} from '../constant/types.ts';
import API from '../constant/API.ts';

function DashBoardPage() {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState<boolean>(false);
  const [recentRecords, setRecentRecords] = useState<IRecentData[]>([]);

  useEffect(() => {
    setFetching(true);
    API.fetch2Json('/api/v2/result/recent', 'GET', {}, [], navigate)
      .then(res => setRecentRecords(res.results))
      .catch(e => console.error(e))
      .finally(() => setFetching(false));
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
              {Object.values(DataFormats.RecentDataTitles).map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {recentRecords.map((record, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                {Object.keys(record).map((key: string, index) => (
                  <td key={index}>{record[key as keyof IRecentData]}</td>
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

export default DashBoardPage;