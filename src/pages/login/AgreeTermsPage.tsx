import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import Terms from '../../layouts/Terms.tsx';
import CheckStringType from '../../constant/CheckStringType.ts';
import AuthControl from '../../constant/AuthControl.ts';
import Controller from '../../constant/Controller.ts';
import '@styles/LoginPage.scss';

function AgreeTermsPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const UserIdInputRef = useRef<HTMLInputElement>(null);
  const PasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'ALLCLL | 회원가입';
  }, [navigate]);

  useEffect(() => {
    UserIdInputRef.current?.focus();
  }, []);

  function onEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter')
      register();
  }

  function register() {
    if (!agreed || fetching)
      return;

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
    Controller.signUp(userId, password, UserIdInputRef.current)
      .then(() => Controller.login(userId, password, navigate, UserIdInputRef.current))
      .then(token => AuthControl.login(navigate, token))
      .catch(e => setErrorMessage(e.message))
      .finally(() => setFetching(false));
  }

  return (
    <PageDefaultLayout>
      <div className='terms_layout'>
        <div className='terms_contents_layout'>
          <Terms/>
        </div>

        <label htmlFor='terms_agree'>
          <input type='checkbox'
                 id='terms_agree'
                 checked={agreed}
                 onChange={e => setAgreed(e.target.checked)}/>
          <span>위의 약관에 동의합니다</span>
        </label>
      </div>

      <div className='register_login_layout login_page'>
        <div className='login_layout'>
          <h1>ALLCLL 회원가입</h1>
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

          <button onClick={register} disabled={fetching || !agreed}>
            {agreed ? '회원가입' : '약관에 동의해주세요'}
          </button>
          <button className='link' onClick={() => navigate('/login', {replace: true})}>이미 회원이신가요? 로그인하기</button>
        </div>
      </div>
    </PageDefaultLayout>
  );
}

export default AgreeTermsPage;