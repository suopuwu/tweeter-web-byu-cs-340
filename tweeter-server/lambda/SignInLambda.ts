import { AuthenticateResponse, LoginRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {
    let userService = new UserService()
    let [user, authToken] = await userService.login(event.username, event.password)
    return { user: user, token: authToken, success: true, message: null }
}
