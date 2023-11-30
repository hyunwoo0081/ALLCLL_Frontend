import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLoginErrorBox from '../../hooks/useLoginErrorBox.tsx';
import useLogin from '../../hooks/useLogin.ts';
import CheckFetchError from '../../constant/CheckFetchError.ts';
import CheckStringType from '../../constant/CheckStringType.ts';
import '@styles/LoginPage.scss';

function Login4EmailPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const EmailInputRef = useRef<HTMLInputElement>(null);

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin)
      navigate('', {replace: true});
    document.title = 'AllCll | 이메일 로그인';
  }, [isLogin, navigate]);
  
  function nextstep() {
    if (!CheckStringType.email(email)) {
      setErrorMessage('이메일 형식이 올바르지 않습니다');
      EmailInputRef.current?.focus();
      return;
    }

    setFetching(true);
    fetch('/api/v2/auth/login/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    }).then(async res => {

      const errors = [
        {errorBody: 'Email address not found', errorMessage: '이메일이 존재하지 않습니다', action: () => EmailInputRef.current?.focus()},
        {errorBody: 'Invalid email format', errorMessage: '이메일 형식이 올바르지 않습니다', action: () => EmailInputRef.current?.focus()},
      ];
      await CheckFetchError(res, errors, navigate);

      navigate(`/login/email/auth?email=${email}`, {replace: true});
    })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setFetching(false));
  }

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>AllCll 이메일 로그인</h1>

        {ErrorBox}

        <input type='text'
               placeholder='이메일'
               ref={EmailInputRef}
               disabled={fetching}
               value={email}
               onChange={e => setEmail(e.target.value)}/>

        <button onClick={nextstep} disabled={fetching}>다음</button>
        <button className='link' onClick={() => navigate('/login/password', {replace: true})}>비밀번호로 로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default Login4EmailPage;