import { User, AuthToken } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

export interface RegisterView {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void
}

export class RegisterPresenter {
    private navigate
    private service
    private view
    private rememberMeRef
    private rememberMe = false
    constructor(view: RegisterView) {
        this.navigate = useNavigate()
        this.view = view
        this.service = new UserService()
        this.rememberMeRef = useRef(this.rememberMe)
        this.rememberMeRef.current = this.rememberMe
    }

    async doRegister(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array) {
        try {
            let [user, authToken] = await this.service.register(firstName, lastName, alias, password, imageBytes)

            this.view.updateUserInfo(user, user, authToken, this.rememberMeRef.current)
            this.navigate('/')
        } catch (error) {
            this.view.displayErrorMessage(`Failed to register user because of exception: ${error}`)
        }
    }

    setRememberMe(val: boolean) {
        this.rememberMe = val
    }
}
