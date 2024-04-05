import { FakeData, PostStatusRequest, PostStatusResponse } from 'tweeter-shared'
import { StatusService } from '../model/service/StatusService'
export const handler = async (event: PostStatusRequest): Promise<PostStatusResponse> => {
    let statusService = new StatusService()
    await statusService.postStatus(FakeData.instance.authToken, event.newStatus)
    return { success: true, message: null }
}
