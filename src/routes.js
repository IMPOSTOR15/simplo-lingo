import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE } from "./utils/consts"
import ProfilePage from "./pages/ProfilePage"

export const authRoutes = [
    
]

export const publicRoutes = [
    {
        path: PROFILE_ROUTE,
        component: <ProfilePage/>
    },
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