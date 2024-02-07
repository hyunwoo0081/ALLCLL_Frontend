import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../../layouts/PageDefaultLayout.tsx';
import useLoginErrorBox from '../../../hooks/useLoginErrorBox.tsx';
import CheckFetchError from '../../../constant/CheckFetchError.ts';
import CheckStringType from '../../../constant/CheckStringType.ts';
import AuthControl from '../../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function Login4PasswordPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const EmailInputRef = useRef<HTMLInputElement>(null);
  const PasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'ALLCLL | 로그인';
  }, [navigate]);

  useEffect(() => {
    EmailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onEnter(e: KeyboardEvent) {
      if (e.key === 'Enter')
        login();
    }

    EmailInputRef.current?.addEventListener('keydown', onEnter);
    PasswordInputRef.current?.addEventListener('keydown', onEnter);
    return () => {
      EmailInputRef.current?.removeEventListener('keydown', onEnter);
      PasswordInputRef.current?.removeEventListener('keydown', onEnter);
    };
  }, [login]);

  function login() {
    if (!CheckStringType.email(email)) {
      setErrorMessage('이메일 형식이 올바르지 않습니다');
      PasswordInputRef.current?.blur();
      EmailInputRef.current?.focus();
      return;
    }
    if (!CheckStringType.password(password)) {
      setErrorMessage('비밀번호가 적절하지 않습니다\n8~16자 문자 숫자로 입력해주세요');
      EmailInputRef.current?.blur();
      PasswordInputRef.current?.focus();
      return;
    }

    setFetching(true);
    fetch('/api/v2/auth/login/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }).then(async res => {

      const errors = [
        {errorBody: 'Authentication failed', errorMessage: '이메일 또는 비밀번호가 일치하지 않음', action: () => EmailInputRef.current?.focus()},
        {errorBody: 'Invalid email format', errorMessage: '이메일 형식이 잘못되었습니다', action: () => EmailInputRef.current?.focus()},
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
        <h1>ALLCLL 로그인</h1>

        {ErrorBox}

        <input type='text'
               placeholder='이메일'
               autoComplete='email'
               ref={EmailInputRef}
               disabled={fetching}
               value={email}
               onChange={e => setEmail(e.target.value)}/>
        <input type='password'
               placeholder='비밀번호(8~16자 문자 숫자)'
               autoComplete='current-password'
               ref={PasswordInputRef}
               disabled={fetching}
               value={password}
               onChange={e => setPassword(e.target.value)}/>

        <button onClick={login} disabled={fetching}>로그인</button>
        <button className='link' onClick={() => navigate('/login/email', {replace: true})}>이메일 로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default Login4PasswordPage;