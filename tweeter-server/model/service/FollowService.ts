import { AuthToken, FakeData, User } from 'tweeter-shared'

export class FollowService {
    async loadMoreFollowers(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user)
    }

    async loadMoreFollowees(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user)
    }
    async followUser(authToken: AuthToken, user: User, usernameToFollow: string): Promise<boolean> {
        return true
    }

    async unfollowUser(authToken: AuthToken, user: User, usernameToUnfollow: string): Promise<boolean> {
        return true
    }
}
