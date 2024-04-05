import { FakeData, GetUserListRequest, GetUserListResponse } from 'tweeter-shared'
import { FollowService } from '../model/service/FollowService'
import { verifyFields } from './FieldVerifier'
export const handler = async (event: GetUserListRequest): Promise<GetUserListResponse> => {
    verifyFields(['user', 'pageSize', 'lastItem'], event)

    let followService = new FollowService() //todo add support for auth tokens
    let [users, hasMore] = await followService.loadMoreFollowees(FakeData.instance.authToken, event.user, event.pageSize, event.lastItem)
    return { users: users, hasMore: hasMore, success: true, message: null }
}
