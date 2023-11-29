import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLogin from '../../hooks/useLogin.ts';
import AuthControl from '../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function LoginEmailAuthPage() {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState<string>('');

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin)
      navigate('/', {replace: true});
  }, []);
  
  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>AllCll 이메일 로그인</h1>

        <p>
          이메일로 인증번호를 발송했습니다. <br/>
          인증번호를 입력해주세요.
        </p>
        <input type='text' placeholder='인증번호' value={authCode} onChange={e => setAuthCode(e.target.value)}/>

        <button onClick={() => AuthControl.login(navigate)}>로그인</button>
        <button className='link' onClick={() => navigate('/login/password')}>비밀번호로 로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default LoginEmailAuthPage;