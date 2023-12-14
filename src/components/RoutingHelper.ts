import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useMobile from '../hooks/useMobile.ts';
import useLogin from '../hooks/useLogin.ts';
import RouteMap from "../constant/RouteMap.tsx";
import authControl from "../constant/AuthControl.ts";

function RoutingHelper() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {isMobile} = useMobile();
  const {isLogin} = useLogin();
  
  useEffect(() => {
    if (isMobile) {
      window.location.href = '/';
      return;
    }

    const route = RouteMap.find(v => v.path === location.pathname);

    if (!route) return;
    if (route.auth.includes('GUEST') && isLogin) {
      navigate('/dashboard');
      return;
    }
    if (route.auth.includes('USER') && !isLogin) {
      authControl.logout(navigate, '/');
      return;
    }
    
  }, [location]);

  return null;
}

export default RoutingHelper;