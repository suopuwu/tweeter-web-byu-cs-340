import { useNavigate } from 'react-router-dom'
import { UserService } from '../model/UserService'
import { useRef } from 'react'
import { User, AuthToken } from 'tweeter-shared'
import { BasePresenter, BaseView } from './BasePresenter'
import { AuthenticationPresenter, AuthenticationView } from './AuthenticationPresenter'

export interface LoginView extends AuthenticationView {}

export class LoginPresenter extends AuthenticationPresenter<LoginView> {
    async doLogin(alias: string, password: string, originalUrl: string | undefined) {
        this.attemptAuthentication(async () => await this.service.login(alias, password), originalUrl)
    }
}
