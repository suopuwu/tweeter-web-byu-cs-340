import StatusItemScroller from './StatusItemScroller'
import { StatusService } from '../../model/StatusService'

const FeedScroller = () => {
    let statusService = new StatusService()
    return <StatusItemScroller loadFunction={statusService.loadMoreFeed}></StatusItemScroller>
}

export default FeedScroller
