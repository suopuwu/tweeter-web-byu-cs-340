import { UserItemPresenter } from './UserItemPresenter'

export class FollowingPresenter extends UserItemPresenter {
    get loadFunction() {
        return this.service.loadMoreFollowees
    }
    loadOperationName = 'load following'
}
