import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useMobile from '../hooks/useMobile.ts';
import RouteMap from '../constant/RouteMap.tsx';
// import authControl from '../constant/AuthControl.ts';

function RoutingHelper() {
  const location = useLocation();
  const navigate = useNavigate();

  const {isMobile} = useMobile();

  // Todo: 모바일 대응 - 검색창, table 등
  useEffect(() => {
    // if (isMobile) {
    //   if (location.pathname !== '/') {
    //     authControl.logout(navigate, '/');
    //   }
    //   return;
    // }

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const isLogin = !!token;

    const route = RouteMap.find(v => v.path === location.pathname);

    if (!route) return;
    if (route.auth.length === 1 && route.auth[0] === 'GUEST' && isLogin) {
      navigate('/dashboard');
      return;
    }
    else if (!route.auth.includes('GUEST') && !isLogin) {
      navigate('/');
      return;
    }
    
  }, [location, isMobile]);

  return null;
}

export default RoutingHelper;