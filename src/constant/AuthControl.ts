import {NavigateFunction} from 'react-router-dom';

const AuthControl = {
  isLogin() {
    return document.cookie.includes('token=');
  },
  login(navigate: NavigateFunction) {
    const path = window.location.pathname;
    document.cookie = `token=${'dummy_token'}; expires=${new Date()}; path=/`;

    localStorage.setItem('loginType', path === '/login/password' ? 'password' : 'email');
    navigate('/dashboard');
  },
  logout(navigate: NavigateFunction) {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    navigate('/');
  },
};

export default AuthControl;