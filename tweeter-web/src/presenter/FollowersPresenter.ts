import { UserItemPresenter } from './UserItemPresenter'

export class FollowerPresenter extends UserItemPresenter {
    get loadFunction() {
        return this.service.loadMoreFollowers
    }
    loadOperationName = 'load followers'
}
