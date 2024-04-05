import { GetStatusListRequest, GetStatusListResponse, FakeData } from 'tweeter-shared'
import { StatusService } from '../model/service/StatusService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetStatusListRequest): Promise<GetStatusListResponse> => {
    verifyFields(['user', 'pageSize', 'lastItem'], event)

    let statusService = new StatusService()
    let [statuses, hasMore] = await statusService.loadMoreStory(FakeData.instance.authToken, event.user, event.pageSize, event.lastItem)

    return { statuses: statuses, hasMore: hasMore, success: true, message: null }
}
