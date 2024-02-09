import LandingPage from '../pages/LandingPage.tsx';
import Login4SejongPage from '../pages/login/Login4SejongPage.tsx';
import AgreeTermsPage from '../pages/login/AgreeTermsPage.tsx';
import DashBoardPage from '../pages/DashBoardPage.tsx';
import SimulationPage from '../pages/SimulationPage.tsx';
import InterestPage from '../pages/InterestPage.tsx';
import AnnouncementSetting from '../pages/admin/AnnouncementSetting.tsx';
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
    // {
    //     path: '/login/dev',
    //     element: (<JwtLogin />)
    // },
    {
        path: '/dashboard',
        element: (<DashBoardPage />),
        auth: ['USER']
    },
    {
        path: '/interest',
        element: (<InterestPage />),
        auth: ['USER']
    },
    {
        path: '/simulation',
        element: (<SimulationPage />),
        auth: ['USER']
    },
    {
        path: '/admin',
        element: (<AnnouncementSetting />),
        auth: ['ADMIN', 'USER']
    },
    {
        path: '/admin/arena',
        element: (<ArenaSetting />),
        auth: ['ADMIN', 'USER']
    },
    {
        path: '*',
        element: (<Page404 />),
        auth: ['GUEST', 'USER']
    },
]

export default RouteMap;