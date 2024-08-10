import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Login4PasswordPage from './Login4PasswordPage.tsx';
import useLogin from '@hooks/useLogin.ts';

function LoginRouter() {
  const navigate = useNavigate();
  const LoginType = localStorage.getItem('loginType') ?? 'email';

  const {isLogin} = useLogin();
  useEffect(() => {
    if (isLogin) {
      navigate('/', {replace: true});
      return;
    }

    if (LoginType === 'email')
      navigate('/login/email', {replace: true});
    else
      navigate('/login/password', {replace: true});
  }, []);

  return (
    <Login4PasswordPage />
  );
}

export default LoginRouter;