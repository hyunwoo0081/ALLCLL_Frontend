import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import CheckStringType from '../../constant/CheckStringType.ts';
import AuthControl from '../../constant/AuthControl.ts';
import Controller from '../../constant/Controller.ts';
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

  function onEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter')
      login();
  }

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
    Controller.login(userId, password, navigate, UserIdInputRef.current)
      .then(token => AuthControl.login(navigate, token))
      .catch(e => setErrorMessage(e.message))
      .finally(() => setFetching(false));
  }

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>ALLCLL 로그인</h1>
        <h2>
          대양휴머니티칼리지에 로그인하여 인증합니다 <br/>
          <b>ALLCLL</b>은 로그인 정보를 서버에 저장하지 않습니다
        </h2>

        {ErrorBox}

        <input type='text'
               placeholder='학번'
               autoComplete='username'
               ref={UserIdInputRef}
               disabled={fetching}
               value={userId}
               onChange={e => setUserId(e.target.value)}
               onKeyDown={onEnter}/>
        <input type='password'
               placeholder='비밀번호'
               autoComplete='current-password'
               ref={PasswordInputRef}
               disabled={fetching}
               value={password}
               onChange={e => setPassword(e.target.value)}
               onKeyDown={onEnter}/>

        <button onClick={login} disabled={fetching}>로그인</button>
        <button className='link' onClick={() => navigate('/register', {replace: true})}>처음 오셨나요? 회원가입 하기</button>
      </div>
    </PageDefaultLayout>
  );
}

export default Login4PasswordPage;