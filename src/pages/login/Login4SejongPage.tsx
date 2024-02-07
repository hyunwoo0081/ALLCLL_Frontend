import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import CheckFetchError from '../../constant/CheckFetchError.ts';
import CheckStringType from '../../constant/CheckStringType.ts';
import AuthControl from '../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function Login4PasswordPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const UserIdInputRef = useRef<HTMLInputElement>(null);
  const PasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'ALLCLL | 로그인';
  }, [navigate]);

  useEffect(() => {
    UserIdInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onEnter(e: KeyboardEvent) {
      if (e.key === 'Enter')
        login();
    }

    UserIdInputRef.current?.addEventListener('keydown', onEnter);
    PasswordInputRef.current?.addEventListener('keydown', onEnter);
    return () => {
      UserIdInputRef.current?.removeEventListener('keydown', onEnter);
      PasswordInputRef.current?.removeEventListener('keydown', onEnter);
    };
  }, [login]);

  function login() {
    if (!CheckStringType.studentId(userId)) {
      setErrorMessage('학번 형식이 올바르지 않습니다');
      PasswordInputRef.current?.blur();
      UserIdInputRef.current?.focus();
      return;
    }
    if (!CheckStringType.password(password)) {
      setErrorMessage('비밀번호가 적절하지 않습니다');
      UserIdInputRef.current?.blur();
      PasswordInputRef.current?.focus();
      return;
    }

    setFetching(true);
    fetch('/api/v2/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId, password})
    }).then(async res => {

      const errors = [
        {errorBody: '학생 인증에 실패했습니다. ', errorMessage: '학번 또는 비밀번호가 일치하지 않습니다', action: () => UserIdInputRef.current?.focus()},
        {errorBody: '먼저 가입해 주세요! ', errorMessage: '회원가입이 되지 않은 사용자입니다', action: () => navigate('/register', {replace: true})},
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
               placeholder='학번'
               autoComplete='username'
               ref={UserIdInputRef}
               disabled={fetching}
               value={userId}
               onChange={e => setUserId(e.target.value)}/>
        <input type='password'
               placeholder='비밀번호'
               autoComplete='current-password'
               ref={PasswordInputRef}
               disabled={fetching}
               value={password}
               onChange={e => setPassword(e.target.value)}/>

        <button onClick={login} disabled={fetching}>로그인</button>
        <button className='link' onClick={() => navigate('/register', {replace: true})}>처음 오셨나요? 회원가입 하기</button>
      </div>
    </PageDefaultLayout>
  );
}

export default Login4PasswordPage;