import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import useLogin from '../../hooks/useLogin.ts';
import '@styles/LoginPage.scss';

function Login4EmailPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin)
      navigate('/', {replace: true});
  }, []);

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>AllCll 이메일 로그인</h1>

        <input type='text' placeholder='이메일' value={email} onChange={e => setEmail(e.target.value)}/>

        <button onClick={() => navigate('/login/email/auth', {replace: true})}>다음</button>
        <button className='link' onClick={() => navigate('/login/password', {replace: true})}>비밀번호로 로그인</button>
      </div>
    </PageDefaultLayout>
  );
}

export default Login4EmailPage;