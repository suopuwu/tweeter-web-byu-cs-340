import { AuthToken, FakeData, Status, User } from 'tweeter-shared'
import { BaseService } from './BaseService'

export class StatusService extends BaseService {
    async loadMoreFeed(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]> {
        let response = await this.serverFacade.getFeed({ user: user, pageSize: pageSize, lastItem: lastItem }, authToken)
        return [response.statuses, response.hasMore]
    }

    async loadMoreStory(authToken: AuthToken, user: User, pageSize: number, lastItem: Status | null): Promise<[Status[], boolean]> {
        let response = await this.serverFacade.getStory({ user: user, pageSize: pageSize, lastItem: lastItem }, authToken)
        return [response.statuses, response.hasMore]
    }

    async postStatus(authToken: AuthToken, newStatus: Status): Promise<void> {
        let response = await this.serverFacade.postStatus({ newStatus: newStatus }, authToken)
    }
}
