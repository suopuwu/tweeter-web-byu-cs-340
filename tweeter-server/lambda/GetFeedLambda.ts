import { GetStatusListRequest, GetStatusListResponse, FakeData } from 'tweeter-shared'
import { StatusService } from '../model/service/StatusService'
export const handler = async (event: GetStatusListRequest): Promise<GetStatusListResponse> => {
    let statusService = new StatusService()
    let [statuses, hasMore] = await statusService.loadMoreFeed(FakeData.instance.authToken, event.user, event.pageSize, event.lastItem)

    return { statuses: statuses, hasMore: hasMore, success: true, message: null }
}
