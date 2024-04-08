import { GetUserIsFollowingResponse, FakeData, GetUserIsFollowingRequest, requestParser } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetUserIsFollowingRequest): Promise<GetUserIsFollowingResponse> => {
    verifyFields(['followerUsername', 'followeeUsername'], event)
    event = requestParser.authenticated(event)

    let userService = new UserService()
    let isFollowing = await userService.getIsFollowerStatus(FakeData.instance.authToken, event.followerUsername, event.followeeUsername)
    return { isFollower: isFollowing, success: true, message: null }
}
