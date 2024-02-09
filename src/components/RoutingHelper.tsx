import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useMobile from '../hooks/useMobile.ts';
import NoticeDialog from '../layouts/dialog/NoticeDialog.tsx';
import RouteMap from '../constant/RouteMap.tsx';
import AuthControl from '../constant/AuthControl.ts';
import API from '../constant/API.ts';

function RoutingHelper() {
  const location = useLocation();
  const navigate = useNavigate();

  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementLatest, setAnnouncementLatest] = useState('');

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

    // check user role
    let role = isLogin ? 'USER' : 'GUEST';
    if (isLogin) {
      const tokenInfo = AuthControl.getInfoFromToken();
      if (tokenInfo) {
        // 문자열 앞 뒤 한글자 씩 제거
        const newRole = tokenInfo.role?.slice(1, -1);
        role = newRole ?? 'USER';
      }
    }

    // check auth
    if (route && !route.auth.includes(role)) {
      navigate(role == 'GUEST' ? '/' : '/dashboard', {replace: true});
    }

    // check announcement
    const announcementOpen = localStorage.getItem('announcementOpen') == 'true';
    const announcementLatest = localStorage.getItem('announcementLatest');

    if (announcementOpen) {
      API.fetch2Json('/api/v2/notification/last', 'GET', {}, [], navigate)
        .then((data) => {
          // console.log('announcement', data?.createAt, announcementLatest);
          if (data?.content && data?.createAt !== announcementLatest) {
            setAnnouncementContent(data.content);
            setAnnouncementLatest(data.createAt);
            setAnnouncementOpen(true);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => {
          localStorage.setItem('announcementOpen', 'false');
        });
    }

  }, [location, isMobile, navigate]);

  function handleAnnouncementClose(dontShowAgain: boolean) {
    if (dontShowAgain)
      localStorage.setItem('announcementLatest', announcementLatest);

    setAnnouncementOpen(false);
  }

  return (
    <>
      <NoticeDialog isOpen={announcementOpen} closeDialog={handleAnnouncementClose} contents={announcementContent}/>
    </>
  );
}

export default RoutingHelper;