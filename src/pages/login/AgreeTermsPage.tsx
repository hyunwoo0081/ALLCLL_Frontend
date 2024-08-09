import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import LoginForm from '../../components/LoginForm.tsx';
import Terms from '../../layouts/Terms.tsx';
import AuthControl from '../../constant/AuthControl.ts';
import Controller from '../../constant/Controller.ts';
import '@styles/LoginPage.scss';

function AgreeTermsPage() {
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'ALLCLL | 회원가입';
  }, [navigate]);

  function register(userId: string, password: string,
                    inputRef: HTMLInputElement|null,
                    setErrorMessage: (_:string) => void,
                    setFetching: (_:boolean) => void) {
    Controller.signUp(userId, password,inputRef)
      .then(() => Controller.login(userId, password, navigate, inputRef))
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
        <LoginForm title='회원가입' loginApi={register} agreed={agreed}>
          <Link to='/login' replace={true}>이미 회원이신가요? 로그인하기</Link>
        </LoginForm>
      </div>
    </PageDefaultLayout>
  );
}

export default AgreeTermsPage;