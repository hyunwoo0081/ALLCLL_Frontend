import {useNavigate} from 'react-router-dom';
import PageDefaultLayout from '../../layouts/PageDefaultLayout.tsx';
import '@styles/LoginPage.scss';

function signUp4EmailPage() {
  const navigate = useNavigate();
  document.title = 'AllCll | 이메일 로그인';

  return (
    <PageDefaultLayout className='login_page'>
      <div className='login_layout'>
        <h1>이메일로 회원가입</h1>

        <input type='text' placeholder='이메일'/>

        <div className='auth_input_layout'>
          <input type='text' placeholder='이메일 인증코드'/>
          <button>인증</button>
        </div>

        <input type='password' placeholder='비밀번호'/>
        <input type='password' placeholder='비밀번호 확인'/>

        <button onClick={() => navigate('/login', {replace: true})}>회원가입</button>
      </div>
    </PageDefaultLayout>
  );
}

export default signUp4EmailPage;