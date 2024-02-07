import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import Terms from '../../layouts/Terms.tsx';
import CheckFetchError from '../../constant/CheckFetchError.ts';
import CheckStringType from '../../constant/CheckStringType.ts';
import AuthControl from '../../constant/AuthControl.ts';
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

  useEffect(() => {
    function onEnter(e: KeyboardEvent) {
      if (e.key === 'Enter')
        register();
    }

    UserIdInputRef.current?.addEventListener('keydown', onEnter);
    PasswordInputRef.current?.addEventListener('keydown', onEnter);
    return () => {
      UserIdInputRef.current?.removeEventListener('keydown', onEnter);
      PasswordInputRef.current?.removeEventListener('keydown', onEnter);
    };
  }, [register]);

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
    fetch('/api/v2/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId, password})
    }).then(async res => {

      const errors = [
        {errorBody: '학생 인증에 실패했습니다. ', errorMessage: '학번 또는 비밀번호가 일치하지 않습니다', action: () => UserIdInputRef.current?.focus()},
      ];
      await CheckFetchError(res, errors, navigate);

      // 로그인 처리
      await login();
    })
      .catch(async e => {
        if (e.message === '이미 가입한 사용자입니다. 로그인해 주세요! ')
          await login();
        else
          setErrorMessage(e.message);
      })
      .finally(() => setFetching(false));
  }

  async function login() {
    return fetch('/api/v2/auth/login', {
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
    });
  }

  return (
    <>
      <Navigation/>

      <div className='responsive'>
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

            <button onClick={register} disabled={fetching || !agreed}>
              {agreed ? '회원가입' : '약관에 동의해주세요'}
            </button>
            <button className='link' onClick={() => navigate('/login', {replace: true})}>이미 회원이신가요? 로그인하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgreeTermsPage;