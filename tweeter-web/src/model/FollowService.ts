import { AuthToken, FakeData, User } from 'tweeter-shared'
import { ServerFacade } from '../network/ServerFacade'
import { BaseService } from './BaseService'
//todo make following and unfollowing call the relevant service
export class FollowService extends BaseService {
    async loadMoreFollowers(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null): Promise<[User[], boolean]> {
        let response = await this.serverFacade.getFollowers({ user: user, pageSize: pageSize, lastItem: lastItem }, authToken)
        return [response.users, response.hasMore]
    }

    async loadMoreFollowees(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null): Promise<[User[], boolean]> {
        let response = await this.serverFacade.getFollowees({ user: user, pageSize: pageSize, lastItem: lastItem }, authToken)
        return [response.users, response.hasMore]
    }

    async followUser(authToken: AuthToken, user: User, usernameToFollow: string): Promise<void> {
        await this.serverFacade.follow({ user: user }, usernameToFollow, authToken)
    }

    async unfollowUser(authToken: AuthToken, user: User, usernameToUnfollow: string): Promise<void> {
        await this.serverFacade.unfollow({ user: user }, usernameToUnfollow, authToken)
    }
}
