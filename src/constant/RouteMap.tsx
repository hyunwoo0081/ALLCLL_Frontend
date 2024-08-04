import LandingPage from '../pages/LandingPage.tsx';
import Login4SejongPage from '../pages/login/Login4SejongPage.tsx';
import AgreeTermsPage from '../pages/login/AgreeTermsPage.tsx';
import Developers from '../pages/InfoPages/Developers.tsx';
import NoticePage from '../pages/InfoPages/NoticePage.tsx';
import FAQ from '../pages/InfoPages/FAQ.tsx';
import TermsPage from '../pages/InfoPages/TermsPage.tsx';
import DashBoardPage from '../pages/DashBoardPage.tsx';
import InterestPage from '../pages/InterestPage.tsx';
import SimulationPage from '../pages/SimulationPage.tsx';
import MyPage from '../pages/MyPage.tsx';
import AnnouncementSetting from '../pages/admin/AnnouncementSetting.tsx';
import MockSetting from '../pages/admin/MockSetting.tsx';
import AddSubjectData from '../pages/admin/AddSubjectData.tsx';
import ArenaSetting from '../pages/admin/ArenaSetting.tsx';
import Page404 from '../pages/Page404.tsx';

const RouteMap = [
    {
        path: '/',
        element: (<LandingPage />),
        auth: ['GUEST']
    },
    {
        path: '/login',
        element: (<Login4SejongPage />),
        auth: ['GUEST']
    },
    {
        path: '/register',
        element: (<AgreeTermsPage />),
        auth: ['GUEST']
    },
    {
        path: '/developer',
        element: (<Developers />),
        auth: ['GUEST', 'USER', 'ADMIN']
    },
    {
        path: '/notice',
        element: (<NoticePage />),
        auth: ['GUEST', 'USER', 'ADMIN']
    },
    {
        path: '/faq',
        element: (<FAQ />),
        auth: ['GUEST', 'USER', 'ADMIN']
    },
    {
        path: '/privacy',
        element: (<TermsPage />),
        auth: ['GUEST', 'USER', 'ADMIN']
    },
    // {
    //     path: '/login/dev',
    //     element: (<JwtLogin />)
    // },
    {
        path: '/dashboard',
        element: (<DashBoardPage />),
        auth: ['USER', 'ADMIN']
    },
    {
        path: '/interest',
        element: (<InterestPage />),
        auth: ['USER', 'ADMIN']
    },
    {
        path: '/simulation',
        element: (<SimulationPage />),
        auth: ['USER', 'ADMIN']
    },
    {
        path: '/mypage',
        element: (<MyPage />),
        auth: ['USER', 'ADMIN']
    },
    {
        path: '/admin',
        element: (<AnnouncementSetting />),
        auth: ['ADMIN']
    },
    {
        path: '/admin/arena',
        element: (<ArenaSetting />),
        auth: ['ADMIN']
    },
    {
        path: '/admin/subject',
        element: (<AddSubjectData />),
        auth: ['ADMIN']
    },
    {
        path: '/admin/mock',
        element: (<MockSetting />),
        auth: ['ADMIN']
    },
    {
        path: '*',
        element: (<Page404 />),
        auth: ['GUEST', 'USER']
    },
]

export default RouteMap;