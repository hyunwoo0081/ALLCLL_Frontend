import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import API from '../../constant/API.ts';

function NoticePage() {
  const navigate = useNavigate();
  const [htmlText, setLatestNotice] = useState<string|null>(null);

  document.title = 'ALLCLL | 공지사항';

  useEffect(() => {
    API.fetch2Json('/api/v2/notification/last', 'GET', {}, [], navigate)
      .then(res => setLatestNotice(res.content))
      .catch(e => {
        console.error(e);
        setLatestNotice(`<p>공지사항을 불러오지 못했습니다.</p>`);
      });
  }, [navigate]);

  return (
    <PageDefaultLayout className=''>
      <h1>공지사항</h1>
      <div className='container_box'>
        <div dangerouslySetInnerHTML={{__html: htmlText ?? ''}}></div>
      </div>
    </PageDefaultLayout>
  );
}

export default NoticePage;