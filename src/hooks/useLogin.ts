import {useEffect, useState} from 'react';

function useLogin() {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  const [isLogin, setIsLogin] = useState(!!token);

  useEffect(() => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    setIsLogin(!!token);
  }, [document.cookie]);
  
  
  return {isLogin};
}

export default useLogin;