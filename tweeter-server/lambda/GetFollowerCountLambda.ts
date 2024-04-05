import { GetCountResponse, FakeData, GetCountRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: GetCountRequest): Promise<GetCountResponse> => {
    let userService = new UserService()
    let count = await userService.getFolloweesCount(FakeData.instance.authToken, event.user)
    return { count: count, success: true, message: null }
}
