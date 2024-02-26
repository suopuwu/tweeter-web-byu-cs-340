import StatusItemScroller from './StatusItemScroller'
import { StatusService } from '../../model/StatusService'

export const PAGE_SIZE = 10

const StoryScroller = () => {
    let statusService = new StatusService()
    return <StatusItemScroller loadFunction={statusService.loadMoreStory}></StatusItemScroller>
}

export default StoryScroller
