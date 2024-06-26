import { FakeData, requestParser, ToggleFollowRequest, ToggleFollowResponse } from 'tweeter-shared'
import { FollowService } from '../model/service/FollowService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: ToggleFollowRequest): Promise<ToggleFollowResponse> => {
    verifyFields(['user', 'usernameToToggle'], event)
    event = requestParser.toggleFollow(event)

    let followService = new FollowService()
    let success = await followService.unfollowUser(FakeData.instance.authToken, event.user, event.usernameToToggle)
    return { success: success, message: null }
}
