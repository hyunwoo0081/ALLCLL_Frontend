import {useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import NavModal from './NavModal.tsx';
import useNavHook from '../hooks/useNavHook.ts';
import '@styles/components/Navigation.scss';

const NavRoutes = [
  {
    name: '공지사항 수정',
    path: '/admin'
  },
  // {
  //   name: '수강 설정',
  //   path: '/admin/mock'
  // },
  {
    name: '과목 추가',
    path: '/admin/subject'
  },
  // {
  //   name: '아레나 설정',
  //   path: '/admin/arena'
  // }
];

function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const navListRef = useRef<HTMLUListElement>(null);

  const {memoUnderlineStyle, selected, setUnderlineTarget} = useNavHook(NavRoutes, navListRef, location, 20, 240);

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
          <ul ref={navListRef}onMouseLeave={() => setUnderlineTarget()}>
            {NavRoutes.map((route, index) => (
              <li key={index}>
                <Link to={route.path}
                      className={index === selected ? 'selected' : ''}
                      onMouseOver={e => setUnderlineTarget(e.target as HTMLAnchorElement)}
                      onFocus={e => setUnderlineTarget(e.target as HTMLAnchorElement)}
                      onBlur={() => setUnderlineTarget()}>
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className='nav_underline'
               style={memoUnderlineStyle}
               aria-disabled/>
        </div>
      </nav>
    </>
  );
}

export default AdminNavigation;