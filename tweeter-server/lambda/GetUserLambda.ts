import { GetUserResponse, GetUserRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {
    let userService = new UserService()
    let user = await userService.findUserByAlias(event.username)
    return { user: user, success: true, message: null }
}
