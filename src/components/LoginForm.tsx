import React, {useEffect, useRef, useState} from 'react';
import useLoginErrorBox from '@hooks/useLoginErrorBox.tsx';
import CheckStringType from '@constant/CheckStringType.ts';

interface ILoginForm {
  title: string;
  loginApi: (userId: string, password: string,
             UserIdInputRef: HTMLInputElement | null,
             setErrorMessage: (message: string) => void,
             setFetching: (fetching: boolean) => void) => void;
  agreed?: boolean;
  children: React.ReactNode;
}

function LoginForm({title, loginApi, agreed=true, children}: ILoginForm) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {setErrorMessage, ErrorBox} = useLoginErrorBox();

  const UserIdInputRef = useRef<HTMLInputElement>(null);
  const PasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    UserIdInputRef.current?.focus();
  }, []);

  function onEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter')
      login();
  }

  function login() {
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
    loginApi(userId, password, UserIdInputRef.current, setErrorMessage, setFetching);
  }

  return (
    <div className='login_layout'>
      <h1>ALLCLL {title}</h1>
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

      <button onClick={login} disabled={fetching || !agreed}>
        {agreed ? title : '약관에 동의해주세요'}
      </button>
      {children}
    </div>
  )
}

export default LoginForm;