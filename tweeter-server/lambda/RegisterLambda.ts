import { AuthenticateResponse, RegisterRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: RegisterRequest): Promise<AuthenticateResponse> => {
    verifyFields(['firstName', 'lastName', 'alias', 'password', 'imageStringBase64'], event, false)

    let userService = new UserService()
    let [user, authToken] = await userService.register(
        event.firstName,
        event.lastName,
        event.alias,
        event.password,
        event.imageStringBase64
    )
    return { user: user, token: authToken, success: true, message: null }
}
