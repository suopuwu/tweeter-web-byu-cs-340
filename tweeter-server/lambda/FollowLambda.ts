import { ToggleFollowResponse, FakeData, ToggleFollowRequest } from 'tweeter-shared'
import { FollowService } from '../model/service/FollowService'
export const handler = async (event: ToggleFollowRequest): Promise<ToggleFollowResponse> => {
    let followService = new FollowService()
    await followService.followUser(FakeData.instance.authToken, event.user, event.usernameToToggle) //todo make this throw if something goes wrong
    return { success: true, message: null }
}
