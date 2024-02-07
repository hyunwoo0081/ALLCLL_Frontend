import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../../layouts/PageDefaultLayout.tsx';
import AuthControl from '../../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function JwtLogin() {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState<string>('');

  const AuthCodeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'ALLCLL | 개발자 로그인';
  }, [navigate]);

  useEffect(() => {
    AuthCodeInputRef.current?.focus();

    function onEnter(e: KeyboardEvent) {
      if (e.key === 'Enter')
        login();
    }

    AuthCodeInputRef.current?.addEventListener('keydown', onEnter);
    return () => {
      AuthCodeInputRef.current?.removeEventListener('keydown', onEnter);
    };
  }, [login]);

  function login() {
    AuthControl.login(navigate, authCode);
  }

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>ALLCLL 개발자 로그인</h1>

        <input type='text'
               placeholder='JWT 인증번호'
               ref={AuthCodeInputRef}
               value={authCode}
               onChange={e => setAuthCode(e.target.value)}/>

        <button onClick={login}>로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default JwtLogin;