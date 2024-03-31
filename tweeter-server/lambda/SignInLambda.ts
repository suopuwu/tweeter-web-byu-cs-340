import { LoginRequest, AuthenticateResponse } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {
    try {
        let response = new AuthenticateResponse(true, ...(await new UserService().login(event.username, event.password)))
        return response
    } catch (e) {
        return new AuthenticateResponse(false, null, null, 'failed to get user')
    }
}
