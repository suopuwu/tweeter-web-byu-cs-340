import { AuthenticateResponse, RegisterRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: RegisterRequest): Promise<AuthenticateResponse> => {
    let userService = new UserService()
    let [user, authToken] = await userService.register(event.firstName, event.lastName, event.alias, event.password, event.userImageBytes)
    return { user: user, token: authToken, success: true, message: null }
}
