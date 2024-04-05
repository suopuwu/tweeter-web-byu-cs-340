import { AuthenticateResponse, LogoutRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: LogoutRequest): Promise<AuthenticateResponse> => {
    let userService = new UserService()
    await userService.logout(event.token)
    return { user: null, token: null, success: true, message: null }
}
