import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, QUIZE_ROUTE } from "./utils/consts"
import ProfilePage from "./pages/ProfilePage"
import QuizPage from "./pages/QuizPage"
export const authRoutes = [
    {
        path: QUIZE_ROUTE,
        component: <QuizPage/>
    },
    {
        path: PROFILE_ROUTE,
        component: <ProfilePage/>
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
    {
        path: QUIZE_ROUTE,
        component: <QuizPage/>
    },
]