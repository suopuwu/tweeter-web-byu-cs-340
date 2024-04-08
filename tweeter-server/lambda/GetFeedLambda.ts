import { GetStatusListRequest, GetStatusListResponse, FakeData, requestParser } from 'tweeter-shared'
import { StatusService } from '../model/service/StatusService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetStatusListRequest): Promise<GetStatusListResponse> => {
    //todo eventually, you will put something in service that verifies the authToken.
    verifyFields(['user', 'pageSize', 'lastItem'], event)
    event = requestParser.getStatusList(event)

    let statusService = new StatusService()
    let [statuses, hasMore] = await statusService.loadMoreFeed(FakeData.instance.authToken, event.user, event.pageSize, event.lastItem)

    return { statuses: statuses, hasMore: hasMore, success: true, message: null }
}
