import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import '@styles/LandingPage.scss';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'AllCll | 수강 신청 연습';
  }, []);
  
  return (
    <>
      <PageDefaultLayout className='landing_page'>
        <header>
          <h1>세종대학교 수강 신청 연습</h1>
          <p>실제와 똑같은 경험으로 수강 신청을 연습해보세요.</p>
        </header>
        <div>

          <section>
            <div className='container'>
              <p>
                안녕하세요! 세종대학교 수강 신청 연습 페이지에 오신 것을 환영합니다. 이 페이지는 수강 신청을 연습하고 각종 기능을 테스트할 수 있는 환경을 제공합니다.
              </p>
              <p>
                여러 과목을 탐험하고 원하는 수업을 찾아보세요. 실제 수강 신청과 비슷한 프로세스를 경험하면서 미리 준비해보세요!
              </p>
              <button onClick={() => navigate('/login')}>로그인 하기</button>
            </div>
          </section>
        </div>
      </PageDefaultLayout>

      <footer>
        <div className='container'>
          <p>© 2021 ALLCLL. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;