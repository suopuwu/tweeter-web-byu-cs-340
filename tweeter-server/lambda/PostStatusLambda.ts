import { FakeData, PostStatusRequest, PostStatusResponse, requestParser } from 'tweeter-shared'
import { StatusService } from '../model/service/StatusService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: PostStatusRequest): Promise<PostStatusResponse> => {
    verifyFields(['newStatus'], event)
    event = requestParser.postStatus(event)

    let statusService = new StatusService()
    await statusService.postStatus(FakeData.instance.authToken, event.newStatus)
    return { success: true, message: null }
}
