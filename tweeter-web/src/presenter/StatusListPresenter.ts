import { Status } from 'tweeter-shared'
import { StatusService } from '../model/StatusService'
import { PagedListPresenter } from './PagedListPresenter'

export const PAGE_SIZE = 10

export abstract class StatusListPresenter extends PagedListPresenter<Status, StatusService> {
    createService(): StatusService {
        return new StatusService()
    }
}
