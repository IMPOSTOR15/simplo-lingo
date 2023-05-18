import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        component: ''
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        component: <HomePage/>
    },
    {
        path: LOGIN_ROUTE,
        component: <LoginPage/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <LoginPage/>
    },
]