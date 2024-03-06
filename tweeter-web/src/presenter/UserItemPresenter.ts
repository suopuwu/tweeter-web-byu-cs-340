import { User } from 'tweeter-shared'
import { FollowService } from '../model/FollowService'
import { PagedListPresenter, PagedListView } from './PagedListPresenter'

export const PAGE_SIZE = 10

export abstract class UserItemPresenter extends PagedListPresenter<User, FollowService> {
    createService(): FollowService {
        return new FollowService()
    }
}
