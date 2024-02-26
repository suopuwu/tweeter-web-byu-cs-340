import { useNavigate } from 'react-router-dom'
import { UserService } from '../model/UserService'
import { useRef } from 'react'
import { User, AuthToken } from 'tweeter-shared'

export interface LoginView {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void
}

export class LoginPresenter {
    private navigate
    private view
    private service
    private rememberMeRef
    private rememberMe = false
    constructor(view: LoginView) {
        this.navigate = useNavigate()
        this.view = view
        this.service = new UserService()
        this.rememberMeRef = useRef(this.rememberMe)
        this.rememberMeRef.current = this.rememberMe
    }

    async doLogin(alias: string, password: string, originalUrl: string | undefined) {
        try {
            let [user, authToken] = await this.service.login(alias, password)

            this.view.updateUserInfo(user, user, authToken, this.rememberMeRef.current)

            if (!!originalUrl) {
                this.navigate(originalUrl)
            } else {
                this.navigate('/')
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to log user in because of exception: ${error}`)
        }
    }

    setRememberMe(val: boolean) {
        this.rememberMe = val
    }
}
