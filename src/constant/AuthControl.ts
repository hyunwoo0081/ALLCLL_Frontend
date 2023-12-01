import {NavigateFunction} from 'react-router-dom';

const AuthControl = {
  isLogin() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return !!token;
  },
  saveToken(token: string) {
    const {exp} = getJWTJson(token);
    document.cookie = `token=${token}; expires=${new Date(exp * 1000)}; path=/`;
    console.log('token expired: ', new Date(exp * 1000));
  },
  login(navigate: NavigateFunction, token: string) {
    this.saveToken(token);

    const path = window.location.pathname;
    localStorage.setItem('loginType', path === '/login/password' ? 'password' : 'email');
    navigate('/dashboard');
  },
  logout(navigate: NavigateFunction, path?: string) {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    console.log('isLogin -> logout | token', token);
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    navigate(path ?? '/');
  },
  getHeader() {
    let header: object = {'Content-Type': 'application/json'};
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log('getHeader -> token', token);

    if (token)
      header = {...header, Authorization: `Bearer ${token}`};

    return header;
  },
  getDefaultPage() {
    const isLogin = this.isLogin();
    if (isLogin)
      return '/dashboard';
    else
      return '/';
  },
  getInfoFromToken() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (!token) return null;

    return getJWTJson(token);
  }
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