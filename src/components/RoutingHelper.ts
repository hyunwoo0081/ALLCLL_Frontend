import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useMobile from '../hooks/useMobile.ts';
import useLogin from '../hooks/useLogin.ts';
import RouteMap from '../constant/RouteMap.tsx';
import authControl from '../constant/AuthControl.ts';

function RoutingHelper() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {isMobile} = useMobile();
  const {isLogin} = useLogin();
  
  useEffect(() => {
    if (isMobile) {
      if (location.pathname !== '/') {
        authControl.logout(navigate, '/');
      }
      return;
    }

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
    
  }, [location, isMobile, isLogin]);

  return null;
}

export default RoutingHelper;