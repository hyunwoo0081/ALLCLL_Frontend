import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLogin from '../../hooks/useLogin.ts';
import CheckFetchError from '../../constant/CheckFetchError.ts';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import {AUTH_LIMIT_TIME} from './Login4EmailPage.tsx';
import CheckStringType from '../../constant/CheckStringType.ts';
import AuthControl from '../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function LoginEmailAuthPage() {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [leftTimeString, setLeftTimeString] = useState<string>(`${Math.floor(AUTH_LIMIT_TIME/60/1000)}:00`)
  const email = new URLSearchParams(window.location.search).get('email') ?? '';
  const deadline = Number(new URLSearchParams(window.location.search).get('deadline'));

  const AuthCodeInputRef = useRef<HTMLInputElement>(null);
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin)
      navigate('/', {replace: true});
    document.title = 'ALLCLL | 이메일 로그인';
  }, [isLogin, navigate]);

  useEffect(() => {
    AuthCodeInputRef.current?.focus();

    function onEnter(e: KeyboardEvent) {
      if (e.key === 'Enter')
        login();
    }

    function updateTimer() {
      const leftTime = deadline - new Date().getTime();
      const minute = Math.floor(leftTime / (60 * 1000));
      const second = Math.floor((leftTime % (60 * 1000)) / 1000);

      setLeftTimeString(
        leftTime <= 0 ? '0:00' : `${minute}:${String(second).padStart(2, '0')}`);
    }
    updateTimer();

    AuthCodeInputRef.current?.addEventListener('keydown', onEnter);
    const timer = setInterval(updateTimer, 1000);
    return () => {
      AuthCodeInputRef.current?.removeEventListener('keydown', onEnter);
      clearInterval(timer);
    };
  }, [deadline, login]);

  function login() {
    if (!CheckStringType.authCode(authCode)) {
      setErrorMessage('인증번호 형식이 올바르지 않습니다');
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

  function resendAuthCode() {
    setSending(true);
    fetch('/api/v2/auth/login/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    }).then(async res => {
      const errors = [
        {errorBody: 'Email address not found', errorMessage: '가입 시도한 적 없는 메일 주소입니다'},
        {errorBody: 'Invalid email format', errorMessage: '이메일 형식이 올바르지 않습니다'},
      ];
      await CheckFetchError(res, errors, navigate);

      const deadline = new Date(new Date().getTime() + AUTH_LIMIT_TIME).getTime();
      navigate(`/login/email/auth?email=${email}&deadline=${deadline}`, {replace: true});
    })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setSending(false));
  }

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>ALLCLL 이메일 로그인</h1>

        {ErrorBox}

        {!sending && !ErrorBox && (
          <p className='message_box'>
            {email} 로 <br/>
            인증번호를 발송했습니다
          </p>
        )}
        <div className='auth_input_layout'>
          <input type='text'
                 placeholder='인증번호'
                 ref={AuthCodeInputRef}
                 disabled={fetching}
                 value={authCode}
                 onChange={e => setAuthCode(e.target.value)}/>
          <span className={leftTimeString === '0:00' ? 'disabled' : ''}
            onClick={e => {
            e.preventDefault();
            AuthCodeInputRef.current?.focus();
          }}>{leftTimeString}</span>
        </div>

        <button onClick={login} disabled={fetching || leftTimeString === '0:00'}>로그인</button>
        <div className='flex_row'>
          <button className='link' onClick={() => navigate('/login/password')}>비밀번호로 로그인</button>
          <button className='link' onClick={resendAuthCode} disabled={sending}>인증번호 재전송</button>
        </div>
      </div>
    </PageDefaultLayout>
  );
}

export default LoginEmailAuthPage;