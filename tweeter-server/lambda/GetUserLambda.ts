import { GetUserResponse, GetUserRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    verifyFields(['username'], event, false)

    let userService = new UserService()
    let user = await userService.findUserByAlias(event.username)
    return { user: user, success: true, message: null }
}
