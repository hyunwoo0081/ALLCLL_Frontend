import {useEffect, useState} from 'react';
import AuthControl from '../constant/AuthControl.ts';

function useLogin() {
  const [isLogin, setIsLogin] = useState(AuthControl.isLogin());

  useEffect(() => {
    setIsLogin(AuthControl.isLogin());
  }, [document.cookie]);
  
  return {isLogin};
}

export default useLogin;