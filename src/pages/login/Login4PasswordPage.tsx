import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLogin from '../../hooks/useLogin.ts';
import AuthControl from '../../constant/AuthControl.ts';
import '@styles/LoginPage.scss';

function Login4PasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin)
      navigate('/', {replace: true});
  }, []);

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>AllCll 로그인</h1>

        <input type='text' placeholder='이메일' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type='password' placeholder='비밀번호' value={password} onChange={e => setPassword(e.target.value)}/>

        <button onClick={() => AuthControl.login(navigate)}>로그인</button>
        <button className='link' onClick={() => navigate('/login/email', {replace: true})}>이메일 로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default Login4PasswordPage;