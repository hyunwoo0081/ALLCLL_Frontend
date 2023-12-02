import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../layouts/PageDefaultLayout.tsx';
import useLoginErrorBox from '../hooks/useLoginErrorBox.tsx';
import CheckFetchError from '../constant/CheckFetchError.ts';
import CheckStringType from '../constant/CheckStringType.ts';

function RefreshPasswordPage() {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const authCode = new URLSearchParams(window.location.search).get('authCode') ?? '';

  const PasswordInputRef = useRef<HTMLInputElement>(null);
  const CheckPasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    PasswordInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onEnter(e: KeyboardEvent) {
      if (e.key === 'Enter')
        refreshPassword();
    }

    PasswordInputRef.current?.addEventListener('keydown', onEnter);
    CheckPasswordInputRef.current?.addEventListener('keydown', onEnter);
    return () => {
      PasswordInputRef.current?.removeEventListener('keydown', onEnter);
      CheckPasswordInputRef.current?.removeEventListener('keydown', onEnter);
    };
  }, [refreshPassword]);

  function refreshPassword() {
    if (!CheckStringType.password(password)) {
      setErrorMessage('비밀번호가 적절하지 않습니다\n8~16자 문자 숫자로 입력해주세요');
      CheckPasswordInputRef.current?.blur();
      PasswordInputRef.current?.focus();
      return;
    }

    if (password !== checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다');
      CheckPasswordInputRef.current?.blur();
      PasswordInputRef.current?.focus();
      return;
    }

    setFetching(true);
    fetch('/api/v2/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({authCode, password})
    }).then(async res => {

      const errors = [
        {errorBody: 'Authentication failed', errorMessage: '잘못된 인증번호 입니다.'},
        {errorBody: 'Invalid password format', errorMessage: '비밀번호가 적절하지 않습니다\n8~16자 문자 숫자로 입력해주세요', action: () => PasswordInputRef.current?.focus()},
      ];
      await CheckFetchError(res, errors, navigate);

      alert('비밀번호가 변경되었습니다');
      navigate('/', {replace: true});
    })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setFetching(false));
  }

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>AllCll 비밀번호 변경</h1>

        {ErrorBox}

        <input type='password'
               placeholder='비밀번호(8~16자 문자 숫자)'
               ref={PasswordInputRef}
               disabled={fetching}
               value={password}
               onChange={e => setPassword(e.target.value)}/>
        <input type='password'
               placeholder='비밀번호 확인'
               ref={CheckPasswordInputRef}
               disabled={fetching}
               value={checkPassword}
               onChange={e => setCheckPassword(e.target.value)}/>

        <button onClick={refreshPassword} disabled={fetching}>로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default RefreshPasswordPage;