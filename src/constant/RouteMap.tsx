import LandingPage from '../pages/LandingPage.tsx';
import Login4PasswordPage from '../pages/login/Login4PasswordPage.tsx';
import Login4EmailPage from '../pages/login/Login4EmailPage.tsx';
import LoginEmailAuthPage from '../pages/login/LoginEmailAuthPage.tsx';
import RefreshPasswordPage from '../pages/RefreshPasswordPage.tsx';
import LoginRouter from '../pages/login/LoginRouter.tsx';
import DashBoardPage from '../pages/DashBoardPage.tsx';
import SimulationPage from '../pages/SimulationPage.tsx';
import InterestPage from '../pages/InterestPage.tsx';
import Page404 from '../pages/Page404.tsx';

const RouteMap = [
    {
        path: '/',
        element: (<LandingPage />),
        auth: ['GUEST']
    },
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
        path: '/login',
        element: (<LoginRouter />),
        auth: ['GUEST']
    },
    {
        path: '/login/email',
        element: (<Login4EmailPage />),
        auth: ['GUEST']
    },
    {
        path: '/login/email/auth',
        element: (<LoginEmailAuthPage />),
        auth: ['GUEST']
    },
    {
        path: '/login/password',
        element: (<Login4PasswordPage />),
        auth: ['GUEST']
    },
    {
        path: '/refresh/password',
        element: (<RefreshPasswordPage />),
        auth: ['GUEST']
    },
    // {
    //     path: '/login/dev',
    //     element: (<JwtLogin />)
    // },
    {
        path: '*',
        element: (<Page404 />),
        auth: ['USER']
    },
]

export default RouteMap;