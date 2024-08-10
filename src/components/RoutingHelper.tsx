import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useMobile from '@hooks/useMobile.ts';
import NoticeDialog from '@layouts/dialog/NoticeDialog.tsx';
import RouteMap from '@constant/RouteMap.tsx';
import Controller from '@constant/Controller.ts';
import AuthControl from '@constant/AuthControl.ts';

function RoutingHelper() {
  const location = useLocation();
  const navigate = useNavigate();

  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementLatest, setAnnouncementLatest] = useState('');

  const {isMobile} = useMobile();

  // Todo: 모바일 대응 - 검색창, table 등
  // useEffect(() => {
  //   if (isMobile) {
  //     if (location.pathname !== '/') {
  //       authControl.logout(navigate, '/');
  //     }
  //     return;
  //   }
  // }, []);

  // 페이지 별 권한 체크
  useEffect(() => {
    // check user role
    const role = AuthControl.getRole();
    const route = RouteMap.find(v => v.path === location.pathname);

    // check auth
    if (route && !route.auth.includes(role)) {
      navigate(role == 'GUEST' ? '/' : '/dashboard', {replace: true});
    }
  }, [location, isMobile, navigate]);


  // check announcement
  useEffect(() => {
    const announcementOpen = localStorage.getItem('announcementOpen') == 'true';
    const announcementLatest = localStorage.getItem('announcementLatest');

    if (announcementOpen) {
      Controller.getLastNotification(navigate)
        .then((data) => {
          // console.log('announcement', data?.createAt, announcementLatest);
          if (data?.content && data?.createAt !== announcementLatest) {
            setAnnouncementContent(data.content);
            setAnnouncementLatest(data.createAt);
            setAnnouncementOpen(true);
          }
        })
        .finally(() => {
          localStorage.setItem('announcementOpen', 'false');
        });
    }
  }, [navigate]);

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