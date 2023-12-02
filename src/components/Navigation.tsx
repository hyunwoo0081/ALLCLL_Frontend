import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useLogin from '../hooks/useLogin.ts';
import NavModal from './NavModal.tsx';
import AuthControl from '../constant/AuthControl.ts';
import '@styles/components/Navigation.scss';

const NavRoutes = [
  {
    name: '대시보드',
    path: '/dashboard'
  },
  {
    name: '관심과목',
    path: '/interest'
  },
  {
    name: '수강신청',
    path: '/simulation'
  }
];

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  
  const {isLogin} = useLogin();

  return (
    <>
      <NavModal isOpen={modalOpened} setIsOpen={setModalOpened}/>
      <nav className='navigation'>
        <div className='navigation_flex'>
          <div className='logo' tabIndex={0} onClick={() => navigate(AuthControl.getDefaultPage())}>
            {/*<img src='/CI.svg' alt=''/>*/}
            <h2>ALLCLL</h2>
          </div>
          {isLogin ? (
            <div className='auth_layout'>
              <button className='image_button' onClick={() => setModalOpened(true)}>
                <img src='/Darhboard.svg' alt=''/>
              </button>
            </div>
          ) : (
            <div className='auth_layout'>
              <button onClick={() => navigate('/login')}>Login</button>
            </div>
          )}
        </div>
        { isLogin && (
          <div className='navigation_shortcuts'>
            <ul>
              {NavRoutes.map((route, index) => (
                <li key={index}
                    className={location.pathname === route.path ? 'selected' : ''}>
                  <Link to={route.path}
                        className={location.pathname === route.path ? 'selected' : ''}>
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navigation;