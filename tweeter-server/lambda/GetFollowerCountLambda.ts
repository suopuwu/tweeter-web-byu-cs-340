import { GetCountResponse, FakeData, GetCountRequest, requestParser } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetCountRequest): Promise<GetCountResponse> => {
    verifyFields(['user'], event)
    event = requestParser.getCount(event)

    let userService = new UserService()
    let count = await userService.getFolloweesCount(FakeData.instance.authToken, event.user)
    return { count: count, success: true, message: null }
}
