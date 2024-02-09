import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import NavModal from './NavModal.tsx';
import '@styles/components/Navigation.scss';

const NavRoutes = [
  {
    name: '아레나 설정',
    path: '/admin/arena'
  },
];

function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <>
      <NavModal isOpen={modalOpened} setIsOpen={setModalOpened}/>
      <nav className='navigation admin'>
        <div className='navigation_flex'
             tabIndex={0}
             onClick={() => navigate('/admin')}>
          <div className='logo'>
            <h2>ALLCLL</h2>
          </div>
          <h2>관리자</h2>
        </div>

        <div className='navigation_shortcuts'>
          <ul>
            {NavRoutes.map((route, index) => (
              <li key={index}
                  onClick={() => {
                    if (location.pathname !== route.path)
                      navigate(route.path);
                  }}
                  className={location.pathname === route.path ? 'selected' : ''}>
                <Link to={route.path}
                      className={location.pathname === route.path ? 'selected' : ''}>
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default AdminNavigation;