import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, QUIZE_LIST_ROUTE, QUIZE_ITEM_ROUTE, LEADERBOARD_ROUTE } from "./utils/consts"
import ProfilePage from "./pages/ProfilePage"
import QuizPage from "./pages/QuizPage"
import QuizItem from "./components/QuizItemComponents/QuizItem"
import LeaderboardPgae from "./pages/LeaderboardPgae"
export const authRoutes = [
    {
        path: QUIZE_LIST_ROUTE,
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
        path: QUIZE_LIST_ROUTE,
        component: <QuizPage/>
    },
    {
        path: QUIZE_ITEM_ROUTE + '/:id',
        component: <QuizItem/>
    },
    {
        path: LEADERBOARD_ROUTE,
        component: <LeaderboardPgae/>
    }
]