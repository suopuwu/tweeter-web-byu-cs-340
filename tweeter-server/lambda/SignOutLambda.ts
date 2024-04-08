import { AuthenticateResponse, LogoutRequest, requestParser } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: LogoutRequest): Promise<AuthenticateResponse> => {
    verifyFields([], event)
    event = requestParser.authenticated(event)

    let userService = new UserService()
    await userService.logout(event.authToken)
    return { user: null, token: null, success: true, message: null }
}
