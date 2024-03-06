import { AuthToken, Status, User } from 'tweeter-shared'
import { BasePresenter, BaseView } from './BasePresenter'
import { StatusService } from '../model/StatusService'
export const PAGE_SIZE = 10

export interface PagedListView<ItemType> extends BaseView {
    addItems: (items: ItemType[]) => void
}

export abstract class PagedListPresenter<ItemType, ServiceType> extends BasePresenter<PagedListView<ItemType>> {
    abstract get loadFunction(): (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: ItemType | null
    ) => Promise<[ItemType[], boolean]>
    abstract loadOperationName: string
    protected service: ServiceType

    private lastItem: ItemType | null = null
    private _hasMoreItems = true
    constructor(view: PagedListView<ItemType>) {
        super(view)
        this.service = this.createService()
    }

    abstract createService(): ServiceType

    async loadMoreItems(authToken: AuthToken, displayedUser: User) {
        this.tryWithReporting(this.loadOperationName, async () => {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.loadFunction(authToken, displayedUser, PAGE_SIZE, this.lastItem)

                this.hasMoreItems = hasMore
                this.lastItem = newItems[newItems.length - 1]
                this.view.addItems(newItems)
            }
        })
    }

    get hasMoreItems() {
        return this._hasMoreItems
    }

    private set hasMoreItems(val) {
        this._hasMoreItems = val
    }
}
