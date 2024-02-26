import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import MainLayout from './components/mainLayout/MainLayout'
import Toaster from './components/toaster/Toaster'
import FeedScroller from './components/mainLayout/FeedScroller'
import StoryScroller from './components/mainLayout/StoryScroller'
import UserItemScroller from './components/mainLayout/UserItemScroller'
import useUserInfo from './components/userInfo/UserInfoHook'
import { FollowingPresenter } from './presenter/FollowingPresenter'
import { FollowerPresenter } from './presenter/FollowersPresenter'

const App = () => {
    const { currentUser, authToken } = useUserInfo()

    const isAuthenticated = (): boolean => {
        return !!currentUser && !!authToken
    }

    return (
        <div>
            <Toaster position="top-right" />
            <BrowserRouter>{isAuthenticated() ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}</BrowserRouter>
        </div>
    )
}

const AuthenticatedRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/feed" />} />
                <Route path="feed" element={<FeedScroller />} />
                <Route path="story" element={<StoryScroller />} />
                <Route
                    path="following"
                    element={<UserItemScroller presenterGenerator={(view) => new FollowingPresenter(view)} />}
                />
                <Route
                    path="followers"
                    element={<UserItemScroller presenterGenerator={(view) => new FollowerPresenter(view)} />}
                />
                <Route path="logout" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/feed" />} />
            </Route>
        </Routes>
    )
}

const UnauthenticatedRoutes = () => {
    const location = useLocation()

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login originalUrl={location.pathname} />} />
        </Routes>
    )
}

export default App
