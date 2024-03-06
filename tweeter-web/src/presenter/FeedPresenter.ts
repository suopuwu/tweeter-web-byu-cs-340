import { StatusListPresenter } from './StatusListPresenter'

export class FeedPresenter extends StatusListPresenter {
    get loadFunction() {
        return this.service.loadMoreFeed
    }
    loadOperationName = 'load feed'
}
