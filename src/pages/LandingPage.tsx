import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '@layouts/PageDefaultLayout.tsx';
import useMobile from '@hooks/useMobile.ts';
import '@styles/LandingPage.scss';

function LandingPage() {
  const navigate = useNavigate();
  const {isMobile} = useMobile();

  useEffect(() => {
    document.title = 'ALLCLL | 수강 신청 연습';
  }, []);
  
  return (
    <>
      <PageDefaultLayout className='landing_page no_responsive'>
        <section>
          <div className='container figma'>
            <div className='center_contents'>
              <div>
                <h1>
                  세종대학교 <br/>
                  수강 신청 연습
                </h1>
                <p>
                  실제 수강 신청 방식과 유사한 <br/>
                  수강 신청을 연습해보세요.
                </p>
                {isMobile ? (
                  <button disabled>데스크탑에서 실행하세요</button>
                ) : (
                  <button onClick={() => navigate('/login')}>로그인 하기</button>
                )}
              </div>
              <div>
                <img src='/Logo.png' alt=''/>
              </div>
            </div>
          </div>
        </section>

        {/*<section>*/}
        {/*  <div className='container'>*/}
        {/*    <div>*/}
        {/*      <img src='/Logo.png' alt=''/>*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <h2>실제와 비슷한 환경</h2>*/}
        {/*      <p>*/}
        {/*        ALLCLL는 수강 신청을 연습하고 각종 기능을 테스트할 수 있는 환경을 제공합니다.*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<section>*/}
        {/*  <div className='container'>*/}
        {/*    <div>*/}
        {/*      <h2>다양한 과목</h2>*/}
        {/*      <p>*/}
        {/*        여러 과목을 탐험하고 원하는 수업을 찾아보세요. 실제 수강 신청과 비슷한 프로세스를 경험하면서 미리 준비해보세요!*/}
        {/*      </p>*/}
        {/*      <button onClick={() => navigate('/login')}>로그인 하기</button>*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <img src='/Logo.png' alt=''/>*/}

        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/*<footer>*/}
        {/*  <div className='container'>*/}
        {/*    <p>© 2023 ALLCLL. All rights reserved.</p>*/}
        {/*  </div>*/}
        {/*</footer>*/}
      </PageDefaultLayout>

    </>
  );
}

export default LandingPage;