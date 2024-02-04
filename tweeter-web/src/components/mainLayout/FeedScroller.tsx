import { AuthToken, FakeData, Status, User } from 'tweeter-shared'
import StatusItemScroller from './StatusItemScroller'

export const PAGE_SIZE = 10

const FeedScroller = () => {
    return (
        <StatusItemScroller
            loadFunction={async (
                authToken: AuthToken,
                user: User,
                pageSize: number,
                lastItem: Status | null
            ): Promise<[Status[], boolean]> => FakeData.instance.getPageOfStatuses(lastItem, pageSize)}
        ></StatusItemScroller>
    )
}

export default FeedScroller
