import { GetUserIsFollowingResponse, FakeData, GetUserIsFollowingRequest } from 'tweeter-shared'
import { UserService } from '../model/service/UserService'
export const handler = async (event: GetUserIsFollowingRequest): Promise<GetUserIsFollowingResponse> => {
    let userService = new UserService()
    let isFollowing = await userService.getIsFollowerStatus(FakeData.instance.authToken, event.followerUsername, event.followeeUsername)
    return { isFollower: isFollowing, success: true, message: null }
}
