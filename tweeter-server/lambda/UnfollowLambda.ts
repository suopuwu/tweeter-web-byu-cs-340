import { FakeData, ToggleFollowRequest, ToggleFollowResponse } from 'tweeter-shared'
import { FollowService } from '../model/service/FollowService'
export const handler = async (event: ToggleFollowRequest): Promise<ToggleFollowResponse> => {
    let followService = new FollowService()
    let success = await followService.unfollowUser(FakeData.instance.authToken, event.user, event.usernameToToggle)
    return { success: success, message: null }
}
