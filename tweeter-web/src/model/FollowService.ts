import { AuthToken, FakeData, requestParser, User } from 'tweeter-shared'
import { ServerFacade } from '../network/ServerFacade'
import { BaseService } from './BaseService'
export class FollowService extends BaseService {
    async loadMoreFollowers(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null): Promise<[User[], boolean]> {
        let facade = new ServerFacade() //todo, for some reason the getter only works in userService. It says it is undefined in this file

        let response = await facade.getFollowers({ user: user, pageSize: pageSize, lastItem: lastItem, authToken: authToken })
        return [response.users, response.hasMore]
    }

    async loadMoreFollowees(authToken: AuthToken, user: User, pageSize: number, lastItem: User | null): Promise<[User[], boolean]> {
        let facade = new ServerFacade() //todo, for some reason the getter only works in userService. It says it is undefined in this file

        let response = await facade.getFollowees({ user: user, pageSize: pageSize, lastItem: lastItem, authToken: authToken })
        return [response.users, response.hasMore]
    }
}
