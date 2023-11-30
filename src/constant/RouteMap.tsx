import LandingPage from '../pages/LandingPage.tsx';
import Login4PasswordPage from '../pages/login/Login4PasswordPage.tsx';
import Login4EmailPage from '../pages/login/Login4EmailPage.tsx';
import LoginEmailAuthPage from '../pages/login/LoginEmailAuthPage.tsx';
import LoginRouter from '../pages/login/LoginRouter.tsx';
import DashBoardPage from '../pages/DashBoardPage.tsx';
import SimulationPage from '../pages/SimulationPage.tsx';
import InterestPage from '../pages/InterestPage.tsx';
import Page404 from '../pages/Page404.tsx';

const RouteMap = [
    {
        path: '/',
        element: (<LandingPage />)
    },
    {
        path: '/dashboard',
        element: (<DashBoardPage />)
    },
    {
        path: '/interest',
        element: (<InterestPage />)
    },
    {
        path: '/simulation',
        element: (<SimulationPage />)
    },
    {
        path: '/login',
        element: (<LoginRouter />)
    },
    {
        path: '/login/email',
        element: (<Login4EmailPage />)
    },
    {
        path: '/login/email/auth',
        element: (<LoginEmailAuthPage />)
    },
    {
        path: '/login/password',
        element: (<Login4PasswordPage />)
    },
    {
        path: '*',
        element: (<Page404 />)
    },
]

export default RouteMap;