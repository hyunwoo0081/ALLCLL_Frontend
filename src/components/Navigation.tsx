import React, {useLayoutEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import useMobile from '../hooks/useMobile.ts';
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
  const ref = useRef<HTMLButtonElement>(null);

  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>(
    getUnderlineStyleDefault()
  );
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  
  const {isLogin} = useLogin();
  const {isMobile} = useMobile();

  // Todo: 네비게이션 underlineStyle 객체 업데이트 될 때마다 바뀌는 버그 수정
  //  리렌더링 방지 할 것
  // console.log('Navigation rendered', underlineStyle);

  function openModal() {
    setModalOpened(true);
    ref.current?.blur();
  }

  function getUnderlineStyle(target: HTMLAnchorElement) {
    const width = target.offsetWidth - 20*2;
    const transformX = target.offsetLeft - 64 + 20;

    return {
      width: width + 'px',
      transform: `translate(${transformX}px, -2px)`
    };
  }

  function getUnderlineStyleDefault() {
    const target = document.querySelector('.selected') as HTMLAnchorElement;

    if (target)
      return getUnderlineStyle(target);
    return {};
  }

  function setUnderlineTarget(target?: HTMLAnchorElement) {
    const style = target ? getUnderlineStyle(target) : getUnderlineStyleDefault();

    setUnderlineStyle(style);
  }

  useLayoutEffect(() => {
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
            <ul onMouseLeave={() => setUnderlineTarget()}>
              {NavRoutes.map((route, index) => (
                <li key={index}>
                  <Link to={route.path}
                        className={location.pathname === route.path ? 'selected' : ''}

                        onMouseOver={e => setUnderlineTarget(e.target as HTMLAnchorElement)}
                        onFocus={e => setUnderlineTarget(e.target as HTMLAnchorElement)}
                        onBlur={() => setUnderlineTarget()}>
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='nav_underline'
                  style={underlineStyle}
                  aria-disabled/>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navigation;