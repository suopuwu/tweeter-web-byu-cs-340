import { GetStatusListRequest, GetStatusListResponse, FakeData, requestParser } from 'tweeter-shared'
import { StatusService } from '../model/service/StatusService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetStatusListRequest): Promise<GetStatusListResponse> => {
    verifyFields(['user', 'pageSize', 'lastItem'], event)
    event = requestParser.getStatusList(event)

    let statusService = new StatusService()
    let [statuses, hasMore] = await statusService.loadMoreStory(FakeData.instance.authToken, event.user, event.pageSize, event.lastItem)

    return { statuses: statuses, hasMore: hasMore, success: true, message: null }
}
