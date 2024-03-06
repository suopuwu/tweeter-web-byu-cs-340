import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../model/UserService'
import { BasePresenter, BaseView } from './BasePresenter'
import { AuthToken, User } from 'tweeter-shared'
export interface AuthenticationView extends BaseView {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
}

export abstract class AuthenticationPresenter<ViewType extends AuthenticationView> extends BasePresenter<ViewType> {
    protected navigate
    protected service
    protected rememberMeRef
    protected rememberMe = false
    constructor(view: ViewType) {
        super(view)
        this.navigate = useNavigate()
        this.service = new UserService()
        this.rememberMeRef = useRef(this.rememberMe)
        this.rememberMeRef.current = this.rememberMe
    }

    protected finishAuthentication(user: User, authToken: AuthToken, originalUrl: null | string = null) {
        this.view.updateUserInfo(user, user, authToken, this.rememberMeRef.current)
        if (!!originalUrl) {
            this.navigate(originalUrl)
        } else {
            this.navigate('/')
        }
    }

    attemptAuthentication(authFunction: () => Promise<[User, AuthToken]>, originalUrl: null | string = null) {
        this.tryWithReporting('register user', async () => {
            let [user, authToken] = await authFunction()
            this.finishAuthentication(user, authToken, originalUrl)
        })
    }

    setRememberMe(val: boolean) {
        this.rememberMe = val
    }
}
