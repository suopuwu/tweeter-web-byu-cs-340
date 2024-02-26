import { AuthToken, FakeData, Status, User } from 'tweeter-shared'

export class StatusService {
    async loadMoreFeed(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize)
    }

    async loadMoreStory(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize)
    }

    async postStatus(authToken: AuthToken, newStatus: Status): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000))

        // TODO: Call the server to post the status
    }
}
