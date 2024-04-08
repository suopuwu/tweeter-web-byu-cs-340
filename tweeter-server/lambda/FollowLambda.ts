import { ToggleFollowResponse, FakeData, ToggleFollowRequest, requestParser } from 'tweeter-shared'
import { FollowService } from '../model/service/FollowService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: ToggleFollowRequest): Promise<ToggleFollowResponse> => {
    verifyFields(['user', 'usernameToToggle'], event)
    event = requestParser.toggleFollow(event)

    let followService = new FollowService()
    await followService.followUser(FakeData.instance.authToken, event.user, event.usernameToToggle) //todo make this throw if something goes wrong
    return { success: true, message: null }
}
