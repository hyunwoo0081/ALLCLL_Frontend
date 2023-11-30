import {NavigateFunction} from 'react-router-dom';

const AuthControl = {
  isLogin() {
    return document.cookie.includes('token=');
  },
  login(navigate: NavigateFunction, token: string) {
    const path = window.location.pathname;

    const {exp} = getJWTJson(token);
    document.cookie = `token=${token}; expires=${new Date(exp * 1000)}; path=/`;

    localStorage.setItem('loginType', path === '/login/password' ? 'password' : 'email');
    navigate('/dashboard');
  },
  logout(navigate: NavigateFunction) {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    navigate('/');
  },
};

function getJWTJson(token: string) {
  const base64Url = token.split('.')[1];
  if (!base64Url) return null;

  const base64 = base64Url.replace('-', '+').replace('_', '/');
  try {
    return JSON.parse(window.atob(base64));
  }
  catch (e) {
    return null;
  }
}

export default AuthControl;