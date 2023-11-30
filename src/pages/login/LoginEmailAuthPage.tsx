import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLogin from '../../hooks/useLogin.ts';
import CheckFetchError from '../../constant/CheckFetchError.ts';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import CheckStringType from "../../constant/CheckStringType.ts";
import AuthControl from '../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function LoginEmailAuthPage() {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('');
  const email = new URLSearchParams(window.location.search).get('email') ?? '';

  const AuthCodeInputRef = useRef<HTMLInputElement>(null);
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin)
      navigate('/', {replace: true});
    document.title = 'AllCll | 이메일 로그인';
  }, [isLogin, navigate]);

  function login() {
    if (!CheckStringType.authCode(authCode)) {
      setErrorMessage('인증번호를 입력해주세요');
      AuthCodeInputRef.current?.focus();
      return;
    }

    setFetching(true);
    fetch('/api/v2/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, authCode})
    }).then(async res => {

      const errors = [
        {errorBody: 'Email address not found', errorMessage: '가입 시도한 적 없는 메일 주소입니다'},
        {errorBody: 'Invalid email format', errorMessage: '이메일 형식이 올바르지 않습니다'},
        {errorBody: 'Authentication failed', errorMessage: '인증 번호가 일치하지 않음', action: () => AuthCodeInputRef.current?.focus()},
      ];
      await CheckFetchError(res, errors, navigate);

      AuthControl.login(navigate, await res.text());
    })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setFetching(false));
  }

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>AllCll 이메일 로그인</h1>

        {ErrorBox}

        <p>
          이메일로 인증번호를 발송했습니다. <br/>
          인증번호를 입력해주세요.
        </p>
        <input type='text'
               placeholder='인증번호'
               ref={AuthCodeInputRef}
               disabled={fetching}
               value={authCode}
               onChange={e => setAuthCode(e.target.value)}/>

        <button onClick={login} disabled={fetching}>로그인</button>
        <button className='link' onClick={() => navigate('/login/password')}>비밀번호로 로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default LoginEmailAuthPage;