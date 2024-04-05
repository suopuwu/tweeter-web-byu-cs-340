import { AuthToken, FakeData, Status, User } from 'tweeter-shared'
import { BaseService } from './BaseService'
import { ServerFacade } from '../network/ServerFacade'

export class StatusService extends BaseService {
    async loadMoreFeed(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]> {
        let facade = new ServerFacade() //todo, for some reason the getter only works in userService. It says it is undefined in this file

        console.log(this.serverFacade)
        let response = await facade.getFeed({ user: user, pageSize: pageSize, lastItem: lastItem, authToken: authToken })
        return [response.statuses, response.hasMore]
    }

    async loadMoreStory(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]> {
        let facade = new ServerFacade() //todo, for some reason the getter only works in userService. It says it is undefined in this file

        let response = await facade.getStory({ user: user, pageSize: pageSize, lastItem: lastItem, authToken: authToken })
        return [response.statuses, response.hasMore]
    }

    async postStatus(authToken: AuthToken, newStatus: Status): Promise<void> {
        let facade = new ServerFacade() //todo, for some reason the getter only works in userService. It says it is undefined in this file

        let response = await facade.postStatus({ newStatus: newStatus, authToken: authToken })
    }
}
