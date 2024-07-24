import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useMobile from '../hooks/useMobile.ts';
import useLogin from '../hooks/useLogin.ts';
import NavModal from './NavModal.tsx';
import AuthControl from '../constant/AuthControl.ts';
import '@styles/components/Navigation.scss';

interface IUnderlineStyle {
  width: number;
  transform: number;
}

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

// Fixme: 네비게이션 underlineStyle 객체 업데이트 될 때마다 바뀌는 버그 수정
function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const {isLogin} = useLogin();
  const {isMobile} = useMobile();

  const navListRef = useRef<HTMLUListElement>(null)
  const ref = useRef<HTMLButtonElement>(null);

  const [selected, setSelected] = useState<number>(
    NavRoutes.findIndex(route => route.path === location.pathname)
  );
  const [underlineStyle, setUnderlineStyle] = useState<IUnderlineStyle>(
    getUnderlineStyleDefault()
  );
  const memoUnderlineStyle = useMemo<React.CSSProperties>(() => {
    // console.log('Underline style updated', selected, underlineStyle.width, underlineStyle.transform);

    return {
      width: underlineStyle.width + 'px',
      transform: `translate(${underlineStyle.transform}px, -2px)`
    };
  }, [underlineStyle.width, underlineStyle.transform]);
  const [modalOpened, setModalOpened] = useState<boolean>(false);


  function openModal() {
    setModalOpened(true);
    ref.current?.blur();
  }

  function getUnderlineStyle(target: HTMLAnchorElement) {
    const width = target.offsetWidth - 20*2;
    const transformX = target.offsetLeft - 64 + 20;

    return {
      width: width,
      transform: transformX
    };
  }

  function getUnderlineStyleDefault() {
    // console.log('Underline style default');
    const $ul = navListRef.current ? navListRef.current :
      document.querySelector('.navigation_shortcuts ul') as HTMLUListElement;

    if (!$ul || selected < 0)
      return {width: 0, transform: 0};

    const target = $ul.children[selected].children[0] as HTMLAnchorElement;

    if (target)
      return getUnderlineStyle(target);
    return {width: 0, transform: 0};
  }

  function setUnderlineTarget(target?: HTMLAnchorElement) {
    const style = target ? getUnderlineStyle(target) : getUnderlineStyleDefault();

    if (style)
      setUnderlineStyle(style);
  }

  useEffect(() => {
    setSelected(NavRoutes.findIndex(route => route.path === location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    setUnderlineTarget();
  }, []);


  return (
    <>
      <NavModal isOpen={modalOpened} setIsOpen={setModalOpened}/>
      <nav className='navigation'>
        <div className='navigation_flex'>
          <div className='logo' tabIndex={0} onClick={() => navigate(AuthControl.getDefaultPage())}>
            {/*<img src='/CI.svg' alt=''/>*/}
            <h2>ALLCLL</h2>
          </div>
          {isMobile ? (
            <div className='auth_layout'>
            </div>
          ) : isLogin ? (
            <div className='auth_layout'>
              <button className='image_button' onClick={openModal} ref={ref}>
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
            <ul ref={navListRef} onMouseLeave={() => setUnderlineTarget()}>
              {NavRoutes.map((route, index) => (
                <li key={index}>
                  <Link to={route.path}
                        className={selected == index ? 'selected' : ''}

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
        )}
      </nav>
    </>
  );
}

export default Navigation;