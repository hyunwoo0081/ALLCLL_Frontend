import {Link, useLocation, useNavigate} from 'react-router-dom';
import useLogin from '../hooks/useLogin.ts';
import AuthControl from '../constant/AuthControl.ts';
import '@styles/components/Navigation.scss';

const NavRoutes = [
  {
    name: '홈',
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
  
  const {isLogin} = useLogin();

  return (
    <nav className='navigation'>
      <div className='navigation_flex'>
        <div className='logo'>
          <img src='vite.svg' alt=''/>
          <h2>ALLCLL</h2>
        </div>
        {isLogin ? (
          <div className='auth_layout'>
            <button onClick={() => AuthControl.logout(navigate)}>Logout</button>
          </div>
        ) : (
          <div className='auth_layout'>
            <button className='cancel' onClick={() => navigate('/login')}>Login</button>
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
  );
}

export default Navigation;