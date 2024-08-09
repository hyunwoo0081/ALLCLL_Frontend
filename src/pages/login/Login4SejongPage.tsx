import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import LoginForm from '../../components/LoginForm.tsx';
import AuthControl from '../../constant/AuthControl.ts';
import Controller from '../../constant/Controller.ts';
import '@styles/LoginPage.scss';

function Login4PasswordPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'ALLCLL | 로그인';
  }, [navigate]);


  function login(userId: string, password: string,
                 inputRef: HTMLInputElement|null,
                 setErrorMessage: (_:string) => void,
                 setFetching: (_:boolean) => void) {
    Controller.login(userId, password, navigate, inputRef)
      .then(token => AuthControl.login(navigate, token))
      .catch(e => setErrorMessage(e.message))
      .finally(() => setFetching(false));
  }

  return (
    <PageDefaultLayout className='login_page'>
      <LoginForm title='로그인' loginApi={login}>
        <Link to='/register' replace={true}>처음 오셨나요? 회원가입 하기</Link>
      </LoginForm>
    </PageDefaultLayout>
  );
}

export default Login4PasswordPage;