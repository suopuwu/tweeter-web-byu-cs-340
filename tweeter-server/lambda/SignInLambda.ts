import { AuthenticateResponse, LoginRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {
    verifyFields(['username', 'password'], event, false)

    let userService = new UserService()
    let [user, authToken] = await userService.login(event.username, event.password)
    return { user: user, token: authToken, success: true, message: null }
}
